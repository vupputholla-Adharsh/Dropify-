"use client";
import { useEffect, useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import routes from "@/lib/api/routes";
import { useSocket } from "@/lib/socketcontext";

interface WeatherData {
  temp: string;
  condition: string;
  humidity: string;
  windSpeed: string;
}

interface UserData {
  carbonSaved: number;
  estimatedReliefTime: string;
  currentLocation: string;
  weather: WeatherData;
}

interface Location {
  latitude: number;
  longitude: number;
}

export default function HomePage() {
  const socket = useSocket();
  const [userData, setUserData] = useState<UserData>({
    carbonSaved: 0,
    estimatedReliefTime: "25 minutes",
    currentLocation: "📍 Fetching location...",
    weather: {
      temp: "Loading...",
      condition: "Loading...",
      humidity: "Loading...",
      windSpeed: "Loading...",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);

  const fetchWeather = async (latitude: number, longitude: number) => {
    const apiKey = "db846005aa5b9c7b76be318ef826ccd5"; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.main) {
        setUserData((prev) => ({
          ...prev,
          weather: {
            temp: `${data.main.temp}°C`,
            condition: data.weather[0].description,
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed} m/s`,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const id = localStorage.getItem("userId") ?? "";
      if (id) {
        try {
          const user = await routes.users.getById(id);
          setUserData((prev) => ({
            ...prev,
            carbonSaved: user.carbonFootprintReduction,
          }));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    const updateLocation = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      // Only emit if the coordinates have changed
      if (!lastLocation || lastLocation.latitude !== latitude || lastLocation.longitude !== longitude) {
        setUserData((prev) => ({
          ...prev,
          currentLocation: `📍 Lat: ${latitude.toFixed(10)}, Lon: ${longitude.toFixed(10)}`,
        }));

        setLastLocation({ latitude, longitude });

        // Fetch weather data based on the new location
        fetchWeather(latitude, longitude);

        // Log the new location
        console.log(`New Location: Lat: ${latitude.toFixed(10)}, Lon: ${longitude.toFixed(10)}`);

        const userId = localStorage.getItem("userId");
        socket?.emit("location-update", { userId, latitude, longitude });
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error);
      setUserData((prev) => ({
        ...prev,
        currentLocation: "📍 Unable to fetch location",
      }));
    };

    // Start real-time location tracking
    let watchId: number | null = null;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(updateLocation, handleError, {
        enableHighAccuracy: true,
        maximumAge: 0, // No cached positions
        timeout: 5000, // Timeout for getting position
      });
    } else {
      console.log("Geolocation not supported by browser");
      setUserData((prev) => ({
        ...prev,
        currentLocation: "📍 Geolocation not supported",
      }));
    }

    // Fetch user data
    fetchUserData();
    setIsLoading(false);

    return () => {
      // Stop tracking when component unmounts
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [socket, lastLocation]); // Depend on lastLocation to track changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Dashboard 
      estimatedReliefTime={userData.estimatedReliefTime}
      currentLocation={userData.currentLocation}
      carbonSaved={userData.carbonSaved}
      weatherData={userData.weather}
    />
  );
}
