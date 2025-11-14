'use client'

import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function UserSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [preferences, setPreferences] = useState({
    food: [],
    transport: [],
    entertainment: []
  });
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      phoneNumber,
      password,
      role: 'user', // User role
      currentLocation,
      preferences
    };

    try {
      const response = await axios.post('https://dropify-6tks.onrender.com/api/auth/register', userData);
      alert('User registered successfully!');
      router.push('/auth/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl backdrop-blur-sm flex-grow">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Create your account</h2>
        <p className="text-zinc-400">Start your journey with Dropify</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="user-name" className="block text-sm font-medium text-zinc-400 mb-1.5">
            Full name
          </label>
          <div className="relative">
            <input
              id="user-name"
              type="text"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <User className="absolute left-4 top-3.5 text-zinc-500" size={18} />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="user-email" className="block text-sm font-medium text-zinc-400 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <input
              id="user-email"
              type="email"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute left-4 top-3.5 text-zinc-500" size={18} />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="user-password" className="block text-sm font-medium text-zinc-400 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="user-password"
              type="password"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute left-4 top-3.5 text-zinc-500" size={18} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-purple-600 transition-colors flex items-center justify-center group"
        >
          Create account
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </form>
    </div>
  );
}
