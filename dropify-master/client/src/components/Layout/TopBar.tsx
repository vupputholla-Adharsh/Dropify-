"use client";

import React from "react";
import { Bell, Menu } from "lucide-react";

interface TopBarProps {
  currentLocation: string;
  toggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentLocation, toggleSidebar }) => {
  return (
    <header className="bg-zinc-900/50 backdrop-blur-lg border-b border-zinc-800 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Mobile Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu size={24} />
        </button>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/5 rounded-lg">
            <Bell size={20} />
          </button>
          <div className="h-8 w-px bg-zinc-800"></div>
          <div className="text-sm">
            <p className="text-zinc-400">Current Location</p>
            <p className="font-medium">{currentLocation}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
