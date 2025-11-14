import React from 'react';
import { 
  Package, Clock, Wallet, Navigation2, Star, TrendingUp, 
  ThermometerSun, Wind, Droplets, MapPin, ChevronRight,
  Zap, Shield, Award, MessageSquare
} from 'lucide-react';

interface DeliveryDashboardProps {
  deliveryPersonName?: string;
}

export const DeliveryDashboard: React.FC<DeliveryDashboardProps> = ({
  deliveryPersonName = "Alex Chen"
}) => {
  const weatherData = {
    temp: "72°F",
    humidity: "65%",
    windSpeed: "8 mph"
  };

  const deliveryMetrics = {
    totalDeliveries: 12,
    completionRate: 98,
    avgRating: 4.9,
    earnings: 245.50
  };

  const activeDeliveries = [
    {
      id: "D1234",
      customer: "Sarah Wilson",
      location: "123 Pine Street",
      items: 2,
      eta: "10 mins",
      status: "In Progress",
      priority: "high"
    },
    {
      id: "D1235",
      customer: "Mike Johnson",
      location: "456 Oak Avenue",
      items: 1,
      eta: "25 mins",
      status: "Queued",
      priority: "normal"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {deliveryPersonName}</h2>
            <p className="text-zinc-400">Today's Performance Summary</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-purple-500/20 px-3 py-1 rounded-full">
              <Shield className="text-purple-400" size={16} />
              <span className="text-sm text-purple-200">Elite Courier</span>
            </div>
            <select className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/30">
              <option value="active">🟢 Active</option>
              <option value="offline">⚫ Offline</option>
              <option value="break">🟡 On Break</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Today's Deliveries</h3>
            <Package className="text-purple-400" size={24} />
          </div>
          <p className="text-3xl font-bold">{deliveryMetrics.totalDeliveries}</p>
          <div className="mt-2 flex items-center text-green-400 text-sm">
            <TrendingUp size={16} className="mr-1" />
            <span>+3 from yesterday</span>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Completion Rate</h3>
            <Clock className="text-purple-400" size={24} />
          </div>
          <p className="text-3xl font-bold">{deliveryMetrics.completionRate}%</p>
          <div className="mt-2">
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div 
                className="bg-purple-400 h-2 rounded-full" 
                style={{ width: `${deliveryMetrics.completionRate}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Today's Earnings</h3>
            <Wallet className="text-purple-400" size={24} />
          </div>
          <p className="text-3xl font-bold">${deliveryMetrics.earnings}</p>
          <div className="mt-2 flex items-center text-green-400 text-sm">
            <Award size={16} className="mr-1" />
            <span>Top 10% earner today</span>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400">Customer Rating</h3>
            <Star className="text-purple-400" size={24} />
          </div>
          <p className="text-3xl font-bold">{deliveryMetrics.avgRating}</p>
          <div className="mt-2 flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={star <= deliveryMetrics.avgRating ? "text-yellow-400" : "text-zinc-600"}
                fill={star <= deliveryMetrics.avgRating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Active Deliveries and Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Active Deliveries</h3>
          <div className="space-y-4">
            {activeDeliveries.map((delivery) => (
              <div 
                key={delivery.id}
                className={`p-4 rounded-lg ${
                  delivery.priority === 'high' 
                    ? 'bg-red-500/10 border border-red-500/20' 
                    : 'bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Order #{delivery.id}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    delivery.status === 'In Progress' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {delivery.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{delivery.customer}</h4>
                    <p className="text-sm text-zinc-400">{delivery.location}</p>
                    <div className="flex items-center mt-2 text-sm text-zinc-400">
                      <Package size={16} className="mr-1" />
                      <span>{delivery.items} items</span>
                      <span className="mx-2">•</span>
                      <Clock size={16} className="mr-1" />
                      <span>ETA: {delivery.eta}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Delivery Route</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <ThermometerSun size={16} className="text-orange-400" />
                <span>{weatherData.temp}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Wind size={16} className="text-blue-400" />
                <span>{weatherData.windSpeed}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Droplets size={16} className="text-cyan-400" />
                <span>{weatherData.humidity}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-lg bg-zinc-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="Delivery Route Map"
                className="w-full h-full object-cover opacity-75"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-purple-400" size={20} />
                  <div>
                    <p className="text-sm text-zinc-400">Next Stop</p>
                    <p className="font-medium">123 Pine Street</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Distance</p>
                  <p className="font-medium text-purple-400">0.8 miles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Zap className="text-green-400" size={24} />
            </div>
            <div>
              <h3 className="font-medium">Peak Hours Bonus</h3>
              <p className="text-sm text-zinc-400">Active for next 2 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Navigation2 className="text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="font-medium">Total Distance</h3>
              <p className="text-sm text-zinc-400">15.8 miles today</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <MessageSquare className="text-orange-400" size={24} />
            </div>
            <div>
              <h3 className="font-medium">Customer Messages</h3>
              <p className="text-sm text-zinc-400">2 unread messages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};