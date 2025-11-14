"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet' 

import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

// Define the shape of the location data
interface LocationData {
  deliveryPersonnelId: string;
  latitude: number;
  longitude: number;
}

const TrackPage = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([12.9716, 77.5946]); // Initial center at Bangalore

  useEffect(() => {
    const socket = io('https://dropify-6tks.onrender.com'); // Connect to your server's Socket.io

    // Listen for location updates
    socket.on('locationUpdate', (data: LocationData) => {
      setLocations((prevLocations) => {
        const index = prevLocations.findIndex(
          (loc) => loc.deliveryPersonnelId === data.deliveryPersonnelId
        );
        if (index > -1) {
          prevLocations[index] = data; // Update existing delivery personnel's location
          return [...prevLocations];
        }
        return [...prevLocations, data]; // Add new delivery personnel
      });

      // Optionally update map center based on the nearest delivery personnel
      const newCenter: LatLngExpression = [data.latitude, data.longitude];
      setMapCenter(newCenter);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Delivery Personnel Location Tracker</h1>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker
            key={loc.deliveryPersonnelId}
            position={[loc.latitude, loc.longitude]}
          >
            <Popup>
              <strong>{loc.deliveryPersonnelId}</strong><br />
              Location: {loc.latitude}, {loc.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrackPage;
