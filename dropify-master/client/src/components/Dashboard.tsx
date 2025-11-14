  "use client"
  import React, { useEffect, useState } from "react"
  import "leaflet/dist/leaflet.css"
  import {
    Timer,
    MapPin,
    Leaf,
    Package,
    Bike,
    Car,
    AlertCircle,
    TrendingUp,
    Wind,
    Thermometer,
    Cloud,
    Droplets,
  } from "lucide-react"
  import { useRouter } from "next/navigation"
  import dynamic from "next/dynamic"

  


  const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
  )
  const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
  )
  const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
  )
  const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
  })


  interface DashboardProps {
    estimatedReliefTime: string
    currentLocation: string
    weatherData: {
      temp: string
      condition: string
      humidity: string
      windSpeed: string
    }
    carbonSaved: number
  }

  export const Dashboard: React.FC<DashboardProps> = ({
    estimatedReliefTime,
    weatherData,
    currentLocation,
    carbonSaved,
  }) => {

    const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0])

    const router = useRouter()
    const actions = [
      {
        icon: Package,
        label: "Order Food",
        color: "text-orange-400",
        info: "15-20 min delivery",
        route: "/dashboard/quick-actions/order-food",
      },
      {
        icon: Bike,
        label: "Book Transport",
        color: "text-green-400",
        info: "3 bikes nearby",
        route: "/dashboard/quick-actions/book-transport",
      },
      {
        icon: Car,
        label: "Car Service",
        color: "text-blue-400",
        info: "Valet available",
        route: "/dashboard/quick-actions/car-service",
      },
      {
        icon: AlertCircle,
        label: "Emergency",
        color: "text-red-400",
        info: "SOS ready",
        route: "/dashboard/quick-actions/emergency",
      },
    ]

    const trafficTrends = [
      { time: "15m", level: 80 },
      { time: "30m", level: 60 },
      { time: "45m", level: 40 },
      { time: "60m", level: 30 },
    ]
    const [userLocation, setUserLocation] = useState<string>("Fetching location...")

    useEffect(() => {
      // Fetch user location using Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setMapCenter([latitude, longitude])
            setUserLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`)
          },
          (error) => {
            console.error("Error fetching location:", error)
            setUserLocation("Unable to fetch location")
          }
        )
      } else {
        setUserLocation("Geolocation not supported")
      }
    }, [])

    return (
      <>
        {/* Real-time Alert */}
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-purple-400" size={24} />
            <p className="text-purple-200">
              Traffic is expected to improve by 40% in the next 30 minutes
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Estimated Relief Time */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-400">Estimated Relief Time</h3>
              <Timer className="text-purple-400" size={24} />
            </div>
            <p className="text-3xl font-bold">{estimatedReliefTime}</p>
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex justify-between items-center">
                {trafficTrends.map((trend) => (
                  <div key={trend.time} className="flex flex-col items-center">
                    <div className="h-20 w-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-400 w-full transition-all duration-500"
                        style={{ height: `${trend.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500 mt-2">
                      {trend.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Available Services */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-400">Available Services</h3>
              <MapPin className="text-purple-400" size={24} />
            </div>
            <p className="text-3xl font-bold">3</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Food Delivery</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Transport</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Emergency Services</span>
              </div>
            </div>
          </div>

          {/* Carbon Impact */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-400">Carbon Impact</h3>
              <Leaf className="text-purple-400" size={24} />
            </div>
            <p className="text-3xl font-bold">{carbonSaved} Kg</p>
            <div className="mt-4">
              <div className="w-full bg-zinc-800 rounded-full h-2 mb-2">
                <div
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: "35%" }}
                />
              </div>
              <p className="text-sm text-green-400">Keep the good work up</p>
            </div>
          </div>

          {/* Weather Impact */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-400">Weather Impact</h3>
              <Cloud className="text-purple-400" size={24} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Thermometer size={16} className="text-orange-400" />
                <span>{weatherData.temp}</span>
              </div>
              <div className="flex items-center justify-between">
                <Wind size={16} className="text-blue-400" />
                <span>{weatherData.windSpeed}</span>
              </div>
              <div className="flex items-center justify-between">
                <Droplets size={16} className="text-cyan-400" />
                <span>{weatherData.humidity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {actions.map(({ icon: Icon, label, color, info, route }) => (
                <button
                  key={label}
                  onClick={() => router.push(route)}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group relative"
                >
                  <Icon
                    className={`${color} group-hover:scale-110 transition-transform`}
                    size={24}
                  />
                  <span className="mt-2 text-sm">{label}</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-zinc-800 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {info}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Traffic Map */}
          <div className="bg-zinc-900 z-40 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Live Traffic Map</h3>
        <div className="aspect-video rounded-lg overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={mapCenter}>
              <Popup>{userLocation}</Popup>
            </Marker>
          </MapContainer>
        </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg bg-zinc-800/50"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    index === 0
                      ? "bg-blue-400"
                      : index === 1
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                />
                <span className="text-sm text-zinc-400">1h ago</span>
                <span className="text-sm">Completed eco-friendly trip</span>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  export default Dashboard
