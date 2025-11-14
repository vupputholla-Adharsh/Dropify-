"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, Bike, Clock, MapPin, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for useRouter in the app directory

export default function ConfirmationPage() {
  const router = useRouter(); // Initialize the router
  const [isMounted, setIsMounted] = useState(false); // State to track if component is mounted
  const [currentTime, setCurrentTime] = useState(""); // State to store current time

  useEffect(() => {
    setIsMounted(true); // Set mounted to true after the component is mounted

    // Update the current time when the component mounts
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCurrentTime(formattedTime);
  }, []);

  if (!isMounted) {
    return null; // Return nothing until mounted
  }

  // Destructure the query parameters safely
  const searchParams = new URLSearchParams(window.location.search);
  const vehicleName = searchParams.get("name") || "N/A";
  const vehiclePrice = searchParams.get("price") || "$0.00";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-green-500/20 rounded-full">
            <CheckCircle className="text-green-400" size={48} />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-zinc-400 mb-6">Your vehicle is ready for pickup</p>

        <div className="space-y-4 text-left mb-8">
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Bike className="text-green-400" size={20} />
              <h2 className="font-bold">Booking Details</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Booking Number</span>
                <span>#TB12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Vehicle Type</span>
                <span>{vehicleName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Price</span>
                <span>{vehiclePrice}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="text-green-400" size={20} />
              <h2 className="font-bold">Time Details</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Start Time</span>
                <span>{currentTime}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="text-green-400" size={20} />
              <h2 className="font-bold">Pickup Location</h2>
            </div>
            <p className="text-zinc-400">Current Location</p>
          </div>

          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <QrCode className="text-green-400" size={20} />
              <h2 className="font-bold">Unlock Code</h2>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg text-center">
              <p className="text-2xl font-mono font-bold tracking-wider">1234 5678</p>
              <p className="text-sm text-zinc-400 mt-2">Use this code to unlock your vehicle</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Link
            href="/dashboard/transport/"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Back to Transport Options
          </Link>
        </div>
      </div>
    </div>
  );
}
