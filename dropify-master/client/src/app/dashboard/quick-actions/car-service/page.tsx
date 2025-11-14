"use client"
import React, { useState } from 'react';
import { Car, MapPin, Shield, Star, Settings, X } from 'lucide-react';
import { toast ,ToastContainer} from "react-toastify";

export default function CarServicePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBookClick = (service:any) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleModalSubmit = () => {
    setModalOpen(false);
    toast.success(`Thank you! Someone will contact you about ${selectedService} soon.`);
    setPhoneNumber('');
  };

  return (
    <div className="space-y-6">
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="dark"
      />
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Car className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Car Service</h2>
            <p className="text-zinc-400">Professional car services and valet parking</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            {
              title: 'Valet Parking',
              description: 'Let us park your car',
              price: '$25/day',
              icon: Car,
            },
            {
              title: 'Car Wash',
              description: 'Full service cleaning',
              price: '$35',
              icon: Settings,
            },
            {
              title: 'Security',
              description: '24/7 monitored parking',
              price: '$20/day',
              icon: Shield,
            },
          ].map((service) => (
            <div key={service.title} className="bg-zinc-800/50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <service.icon className="text-blue-400" size={20} />
                </div>
                <h3 className="font-bold">{service.title}</h3>
              </div>
              <p className="text-zinc-400 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-bold">{service.price}</span>
                <button
                  onClick={() => handleBookClick(service.title)}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md border border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{selectedService}</h3>
                <button onClick={() => setModalOpen(false)}>
                  <X className="text-zinc-400 hover:text-zinc-200 transition-colors" size={24} />
                </button>
              </div>
              <p className="text-zinc-400 mb-4">
                Please enter your phone number so we can contact you for the service.
              </p>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 bg-zinc-800 rounded-lg mb-4 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleModalSubmit}
                disabled={!phoneNumber}
                className={`w-full px-4 py-2 rounded-lg text-white ${
                  phoneNumber
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-zinc-700 cursor-not-allowed'
                } transition-colors`}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <h3 className="font-bold mb-4">Available Locations</h3>
            <div className="space-y-4">
              {[
                {
                  name: 'Downtown Garage',
                  address: '123 Main St',
                  spots: '15 spots left',
                  rating: 4.8,
                },
                {
                  name: 'Central Parking',
                  address: '456 Pine Ave',
                  spots: '8 spots left',
                  rating: 4.6,
                },
                {
                  name: 'Secure Parking',
                  address: '789 Oak St',
                  spots: '12 spots left',
                  rating: 4.9,
                },
              ].map((location) => (
                <div
                  key={location.name}
                  className="flex items-center justify-between p-3 hover:bg-zinc-700/50 rounded-lg transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{location.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-zinc-400">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {location.address}
                      </div>
                      <div className="flex items-center">
                        <Car size={16} className="mr-1" />
                        {location.spots}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={16} />
                    <span>{location.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
            <div className="aspect-video">
              <img
                src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80"
                alt="Parking Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
