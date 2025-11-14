'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, Navigation, Clock, MessageSquare, 
  Settings, HelpCircle, LogOut, User, X 
} from 'lucide-react';

export const PartnerSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const pathname = usePathname();

  const routes = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/partner-dashboard' },
    { icon: Package, label: 'Active Deliveries', href: '/partner-dashboard/deliveries' },
    { icon: Navigation, label: 'Route Planning', href: '/partner-dashboard/routes' },
    { icon: Clock, label: 'Schedule', href: '/partner-dashboard/schedule' },
    { icon: MessageSquare, label: 'Messages', href: '/partner-dashboard/messages' },
    { icon: Settings, label: 'Settings', href: '/partner-dashboard/settings' },
    { icon: HelpCircle, label: 'Support', href: '/partner-dashboard/support' },
  ];

  return (
    <div className={`fixed lg:static lg:flex transition-all duration-300 z-50 h-full
      ${isSidebarOpen ? 'left-0' : '-left-64'}`}>
      <div className="w-64 bg-zinc-900 h-full p-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <Link href="/partner-dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Partner Portal
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium">Alex Chen</p>
              <p className="text-sm text-zinc-400">Elite Courier</p>
            </div>
          </div>
          <select className="w-full bg-black/20 text-green-400 px-3 py-2 rounded-lg border border-green-500/30 text-sm">
            <option value="active">🟢 Active</option>
            <option value="offline">⚫ Offline</option>
            <option value="break">🟡 On Break</option>
          </select>
        </div>

        <nav className="space-y-1 flex-1">
          {routes.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                ${pathname === href ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-white/5'}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-zinc-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}