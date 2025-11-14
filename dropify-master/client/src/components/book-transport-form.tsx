"use client"

import React, { useState } from 'react';
import { Bike, MapPin, Clock, Zap, Shield } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from '@/hooks/use-toast';

export default function BookTransportForm() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedOption) {
      toast({
        title: "Booking Confirmed",
        description: `You've selected: ${selectedOption}`,
      })
    } else {
      toast({
        title: "Selection Required",
        description: "Please select a transport option",
        variant: "destructive",
      })
    }
  };

  const transportOptions = [
    { type: 'Electric Bike', distance: '0.2 mi', time: '2 mins away', price: '$4.99', impact: '4kg', icon: Bike },
    { type: 'Electric Scooter', distance: '0.3 mi', time: '3 mins away', price: '$3.99', impact: '5kg', icon: Zap },
    { type: 'Premium Bike', distance: '0.4 mi', time: '4 mins away', price: '$5.99', impact: '0kg', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Bike className="text-green-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Book Transport</h2>
            <p className="text-zinc-400">Find and book available transport options</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="aspect-video rounded-lg bg-zinc-800 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556122071-e404eaedb7f8?auto=format&fit=crop&w=800&q=80"
              alt="Transport Map"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="bg-zinc-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Current Location</h3>
              <div className="flex items-center space-x-2 text-zinc-400">
                <MapPin size={20} />
                <span>Downtown Seattle, 5th Avenue</span>
              </div>
            </div>
            <div className="bg-zinc-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Available Options</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Bikes</span>
                  <span className="text-green-400">8 nearby</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Scooters</span>
                  <span className="text-green-400">12 nearby</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
            <div className="space-y-4">
              {transportOptions.map((option) => (
                <div key={option.type} className="relative">
                  <RadioGroupItem
                    value={option.type}
                    id={option.type}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.type}
                    className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300 peer-data-[state=checked]:bg-green-500/20 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-green-500"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <option.icon className="text-green-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold">{option.type}</h3>
                        <div className="flex items-center space-x-4 text-sm text-zinc-400">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {option.distance}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {option.time}
                          </div>
                          <div className="flex items-center">
                            <Zap size={16} className="mr-1" />
                            {option.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                      {option.price}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-6">
            <Button type="submit" className="w-full">
              Book Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

