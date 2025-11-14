"use client"
import React, { useState } from 'react';
import { AlertCircle, Phone, Car, Heart, Shield, MapPin, Navigation } from 'lucide-react';

interface Location {
  latitude: number;
  longitude: number;
}

interface Action {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  content: string;
}

interface Service {
  name: string;
  distance: string;
  type: string;
  icon: React.ComponentType<any>;
  color: string;
  content: string;
}

export default function EmergencyPage() {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          if (modalContent) {
            openModal(`Your location: Latitude: ${latitude}, Longitude: ${longitude}. ${modalContent}`);
          }
        },
        (error) => {
          alert('Unable to retrieve your location. Please allow location access.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const quickActions: Action[] = [
    {
      title: 'Medical',
      description: 'Request medical assistance',
      icon: Heart,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      content: 'Medical service is on its way to your location.',
    },
    {
      title: 'Police',
      description: 'Contact law enforcement',
      icon: Shield,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      content: 'Police are on their way to assist you.',
    },
    {
      title: 'Roadside',
      description: 'Get vehicle assistance',
      icon: Car,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      content: 'Roadside assistance is on its way.',
    },
    {
      title: 'Navigation',
      description: 'Find safe routes',
      icon: Navigation,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      content: 'Safe routes are being calculated for you.',
    },
  ];

  const nearbyServices: Service[] = [
    {
      name: 'City Hospital',
      distance: '0.8 miles',
      type: 'Hospital',
      icon: Heart,
      color: 'text-red-400',
      content: 'City Hospital is ready to provide medical care.',
    },
    {
      name: 'Central Police',
      distance: '1.2 miles',
      type: 'Police Station',
      icon: Shield,
      color: 'text-blue-400',
      content: 'Central Police is on their way.',
    },
    {
      name: 'Emergency Response',
      distance: '0.5 miles',
      type: 'Fire Station',
      icon: AlertCircle,
      color: 'text-yellow-400',
      content: 'Emergency Response team is on its way.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-500/20 rounded-lg">
            <AlertCircle className="text-red-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-red-400">Emergency Assistance</h2>
            <p className="text-zinc-400">Get immediate help when you need it most</p>
          </div>
          <button className="ml-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            <Phone className="inline-block mr-2" size={20} />
            Call 911
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.title}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                onClick={() => {
                  getLocation();
                  setModalContent(action.content);
                }}
              >
                <div className={`p-4 rounded-lg ${action.bgColor} mb-3`}>
                  <action.icon className={action.color} size={24} />
                </div>
                <h4 className="font-bold mb-1">{action.title}</h4>
                <p className="text-sm text-zinc-400">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Nearby Services</h3>
          <div className="aspect-video rounded-lg bg-zinc-800 overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=800&q=80"
              alt="Emergency Services Map"
              className="w-full h-full object-cover opacity-75"
            />
          </div>
          <div className="space-y-3">
            {nearbyServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-zinc-700/50">
                    <service.icon className={service.color} size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <div className="flex items-center text-sm text-zinc-400">
                      <MapPin size={16} className="mr-1" />
                      {service.distance}
                    </div>
                  </div>
                </div>
                <button
                  className="px-4 py-2 bg-zinc-700/50 rounded-lg hover:bg-zinc-700 transition-colors"
                  onClick={() => {
                    getLocation();
                    setModalContent(service.content);
                  }}
                >
                  Navigate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-lg p-6 max-w-sm w-full">
            <h4 className="text-xl font-bold text-red-400 mb-4">Service Update</h4>
            <p className="text-zinc-400">{modalContent}</p>
            <button
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
