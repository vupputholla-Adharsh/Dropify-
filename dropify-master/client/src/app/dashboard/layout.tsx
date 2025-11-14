"use client";

import React, { useEffect, useState } from "react";
import "../../styles/globals.css";
import { Sidebar } from "@/components/Layout/Sidebar";
import { TopBar } from "@/components/Layout/TopBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<string>("📍 Loading...");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=8791c4954cb347f1a59c5a7f1f880979`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              setLocation(`📍 ${data.results[0].formatted}`);
            } else {
              setLocation("📍 Location not found");
            }
          } catch (error) {
            setLocation("📍 Error fetching location");
          }
        },
        () => {
          setLocation("📍 Location access denied");
        }
      );
    } else {
      setLocation("📍 Geolocation not supported");
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-black text-white flex">
          {/* Sidebar: Fixed on Desktop, Toggleable on Mobile */}
          <div className="lg:w-64">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>

          <div className="flex-1 min-h-screen">
            <TopBar currentLocation={location} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="p-6 max-w-7xl mx-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
