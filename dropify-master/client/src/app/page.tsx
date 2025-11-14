'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { 
  ArrowRight, Clock, MapPin, Leaf, Shield, Zap, Users, Menu, X,
  ArrowUpRight, ChevronRight, Globe, Sparkles, Timer, Package, Car
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Dropify
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
              <Link href="#about" className="text-zinc-400 hover:text-white transition-colors">About</Link>
              <Link href="/auth/login" className="text-zinc-400 hover:text-white transition-colors">Sign In</Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all hover:scale-105 transform duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-b border-zinc-800">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="#features"
                className="block text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#about"
                className="block text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/auth/login"
                className="block text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 inline-flex items-center px-6 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur-sm">
              <Sparkles className="text-purple-400 mr-2" size={16} />
              <span className="text-purple-200">Revolutionizing urban mobility</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Smart Traffic Relief for Modern Cities
            </h1>
            
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience seamless urban mobility with real-time traffic management, smart routing, and sustainable transportation solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/auth/signup"
                className="w-full sm:w-auto px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all hover:scale-105 transform duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              
              <Link
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm flex items-center justify-center group"
              >
                Explore Features
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              {[ 
                { icon: Users, label: 'Active Users', value: '500K+', color: 'purple' },
                { icon: Timer, label: 'Time Saved', value: '45%', color: 'pink' },
                { icon: Globe, label: 'Cities', value: '28', color: 'blue' },
                { icon: Leaf, label: 'CO₂ Saved', value: '12K', color: 'green' },
              ].map((stat) => (
                <div key={stat.label} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                  <div className={`p-3 bg-${stat.color}-500/20 rounded-lg w-fit mb-4`}>
                    <stat.icon className={`text-${stat.color}-400`} size={24} />
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-zinc-400 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll" />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="relative py-32 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Smart Features for Smart Cities</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you navigate urban traffic efficiently while promoting sustainable transportation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { icon: Clock, title: "Real-time Updates", description: "Get instant updates on traffic conditions and estimated relief times.", color: "purple" },
              { icon: MapPin, title: "Smart Routing", description: "AI-powered route optimization for the fastest path to your destination.", color: "pink" },
              { icon: Package, title: "Quick Deliveries", description: "Order food and essentials from nearby locations with smart routing.", color: "orange" },
              { icon: Car, title: "Transport Options", description: "Access various transport modes from bikes to car services.", color: "blue" },
              { icon: Shield, title: "Emergency Services", description: "Quick access to emergency assistance when you need it most.", color: "red" },
              { icon: Leaf, title: "Eco Impact", description: "Track and reduce your carbon footprint with green transport options.", color: "green" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 transform"
              >
                <div className={`p-4 bg-${feature.color}-500/20 rounded-lg w-fit mb-6 group-hover:scale-110 transform transition-transform`}>
                  <feature.icon className={`text-${feature.color}-400`} size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-20 bg-black border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Dropify
              </Link>
              <p className="text-zinc-400 mt-4">
                Making urban mobility smarter and more sustainable.
              </p>
            </div>
            {[ 
              { title: "Product", links: ["Features", "API", "Documentation"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-bold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link 
                        href="#" 
                        className="text-zinc-400 hover:text-white transition-colors inline-flex items-center group"
                      >
                        {link}
                        <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-zinc-800 pt-8 text-center text-zinc-400">
            <p>© 2024 Dropify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}