'use client'
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
    currentLocation: { lat: 0, lng: 0 }, // Default location
  });

  const [loading, setLoading] = useState(false); // For button loading state
  const router = useRouter();

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    console.log("Form Data Submitted:", formData);
    try {
      const response = await fetch("https://dropify-6tks.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Decode the token to get the user ID
        const decodedToken = jwtDecode(data.token);
        // Store the token and userId in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        
        toast.success("Login successful!"); // Success toast
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        const error = await response.json();
        toast.error(error.message || "Login failed"); // Error toast
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again."); // Error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 shadow-xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-zinc-400">Sign in to continue to Dropify</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="name@example.com"
                  required
                />
                <Mail className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-zinc-400">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              >
                <option value="user">User</option>
                <option value="delivery" disabled>
                  Partner (Coming Soon)
                </option>
              </select>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-purple-600 transition-colors flex items-center justify-center group"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && (
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-purple-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
