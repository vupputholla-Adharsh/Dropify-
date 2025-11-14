'use client'

import DeliverySignup from '@/components/DeliverySignup';
import UserSignup from '@/components/UserSignup';
import React, { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [isUserSignup, setIsUserSignup] = useState(true);


  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-lg sm:max-w-md flex flex-col">
        {/* Toggle Buttons */}
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => setIsUserSignup(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isUserSignup
                ? 'bg-purple-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            User Signup
          </button>
          <button
            onClick={() => setIsUserSignup(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !isUserSignup
                ? 'bg-purple-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Partner Signup
          </button>
        </div>

        {/* Signup Forms */}
        {isUserSignup ? <UserSignup /> : <DeliverySignup />}

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-purple-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
