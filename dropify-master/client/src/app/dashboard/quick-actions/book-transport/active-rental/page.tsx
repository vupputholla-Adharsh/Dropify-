import React from 'react';
import { Bike, Clock, Battery, MapPin, Lock, Phone } from 'lucide-react';

export default function ActiveRentalPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Active Rental</h1>
            <p className="text-zinc-400">Booking #TB12345</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">Time Remaining</p>
            <p className="font-bold text-green-400">45:32</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="bg-zinc-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Vehicle Details</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Type</span>
                  <span>Electric Bike</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Battery</span>
                  <div className="flex items-center text-green-400">
                    <Battery size={16} className="mr-1" />
                    95%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Lock Status</span>
                  <div className="flex items-center text-green-400">
                    <Lock size={16} className="mr-1" />
                    Unlocked
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Rental Period</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Start Time</span>
                  <span>2:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">End Time</span>
                  <span>3:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
            <div className="aspect-video">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="Live Location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
            <Lock size={20} />
            <span>Lock Vehicle</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
            <Phone size={20} />
            <span>Get Support</span>
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 className="text-xl font-bold mb-4">Trip Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-800/50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">2.5</p>
            <p className="text-sm text-zinc-400">Miles Traveled</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">15</p>
            <p className="text-sm text-zinc-400">Minutes Active</p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-400">0.5kg</p>
            <p className="text-sm text-zinc-400">CO₂ Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
}