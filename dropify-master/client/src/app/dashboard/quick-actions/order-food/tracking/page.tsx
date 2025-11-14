import React from 'react';
import { Package, MapPin, Clock, User, CheckCircle } from 'lucide-react';

export default function TrackingPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Track Order</h1>
            <p className="text-zinc-400">Order #12345</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">Estimated Delivery</p>
            <p className="font-bold">12:45 PM</p>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="relative pb-12">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-800"></div>
          
          {[
            {
              status: 'Order Confirmed',
              time: '12:15 PM',
              description: 'Your order has been received',
              icon: Package,
              completed: true
            },
            {
              status: 'Preparing',
              time: '12:20 PM',
              description: 'Restaurant is preparing your food',
              icon: Clock,
              completed: true
            },
            {
              status: 'Out for Delivery',
              time: '12:35 PM',
              description: 'Your order is on the way',
              icon: MapPin,
              completed: false
            },
            {
              status: 'Delivered',
              time: '12:45 PM',
              description: 'Enjoy your meal!',
              icon: CheckCircle,
              completed: false
            }
          ].map((step, index) => (
            <div key={step.status} className="relative flex items-start mb-8 last:mb-0">
              <div className={`absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                step.completed ? 'bg-purple-400 border-purple-400' : 'bg-zinc-900 border-zinc-700'
              }`}></div>
              <div className="ml-16">
                <div className="flex items-center space-x-3 mb-1">
                  <step.icon className={step.completed ? 'text-purple-400' : 'text-zinc-600'} size={20} />
                  <h3 className="font-bold">{step.status}</h3>
                  <span className="text-sm text-zinc-400">{step.time}</span>
                </div>
                <p className="text-zinc-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Details */}
        <div className="bg-zinc-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <User className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold">Alex • Delivery Partner</h3>
              <p className="text-sm text-zinc-400">License Plate: ABC 123</p>
            </div>
            <button className="ml-auto px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <div className="aspect-video">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
            alt="Delivery Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}