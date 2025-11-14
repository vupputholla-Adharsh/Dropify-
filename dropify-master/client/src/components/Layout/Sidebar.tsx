"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Navigation, Package, Bike, Brain, AlertCircle, Leaf, X, UserIcon, LogOut } from "lucide-react";
import routes, { User } from "@/lib/api/routes";

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean; toggleSidebar: () => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const route = [
    { icon: Navigation, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Deliveries", href: "/dashboard/deliveries" },
    { icon: Bike, label: "Transport", href: "/dashboard/transport" },
    { icon: Brain, label: "AI Assistant", href: "/dashboard/ai" },
    { icon: AlertCircle, label: "Emergency", href: "/dashboard/emergency" },
    { icon: Leaf, label: "Impact", href: "/dashboard/impact" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId") ?? "";
      if (userId) {
        const userData = await routes.users.getById(userId);
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  };

  return (
    <div>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bg-zinc-900 h-screen w-64 p-6 transition-transform duration-300 z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:left-0
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            TrafficRelief
          </Link>

          {/* Close button only for mobile */}
          <button onClick={toggleSidebar} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-4 flex-1">
          {route.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                  ${pathname === href ? "bg-purple-500/20 text-purple-400" : "hover:bg-white/5"}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-zinc-800">
          <div className="flex items-center space-x-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center">
              <UserIcon size={20} />
            </div>
            <div>
              <p className="font-medium">{user?.name || "Guest"}</p>
              <p className="text-sm text-zinc-400">{user ? user.email : "Not logged in"}</p>
            </div>
          </div>

          {/* Logout Button */}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all hover:bg-white/5 mt-6"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
