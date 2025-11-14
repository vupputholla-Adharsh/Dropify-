"use client"

import React, { useState, useEffect } from "react"
import { Bike, MapPin, Clock, Shield, Leaf, Zap } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import routes from "@/lib/api/routes"
import { useMapEvents } from "react-leaflet"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)

export default function BookTransportForm() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [dropLocation, setDropLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error fetching location:", error)
          toast.error("Error fetching location. Defaulting to Seattle.")
          setCurrentLocation({ lat: 47.6062, lng: -122.3321 }) // Default to Seattle
        }
      )
    } else {
      toast.error("Geolocation is not supported by this browser.")
      setCurrentLocation({ lat: 47.6062, lng: -122.3321 }) // Default to Seattle
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!dropLocation) {
      console.log("ho", dropLocation)
      toast.error("Please select a drop-off location.")
      return
    }

    if (selectedOption) {
      const selectedVehicle = transportOptions.find(
        (option) => option.type === selectedOption
      )
      if (selectedVehicle) {
        const { type, price } = selectedVehicle
        let res
        try {
          res = await routes.transportRequests.create({
            vehicleType: type,
            dropOffLocation: dropLocation, // Pass as { lat, lng }
          })
          console.log("vehiclee", res)
          toast.success("Transport request created successfully!")
          router.push(`book-transport/confirmation?name=${type}&price=${price}`)
        } catch (error) {
          console.log("Error creating transport request:", error)
          toast.error(`You already have an active rental`)
        }
      }
    } else {
      toast.error("Please select a transport option.")
    }
  }

  const transportOptions = [
    {
      type: "Electric Bike",
      distance: "0.2 mi",
      time: "2 mins away",
      price: "$4.99",
      impact: "3kg",
      icon: Bike,
    },
    {
      type: "Electric Scooter",
      distance: "0.3 mi",
      time: "3 mins away",
      price: "$3.99",
      impact: "5kg",
      icon: Zap,
    },
    {
      type: "Premium Bike",
      distance: "0.4 mi",
      time: "4 mins away",
      price: "$5.99",
      impact: "1kg",
      icon: Shield,
    },
  ]

  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        setDropLocation({ lat: e.latlng.lat, lng: e.latlng.lng })
      },
    })
    return dropLocation ? (
      <Marker position={[dropLocation.lat, dropLocation.lng]}></Marker>
    ) : null
  }

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Bike className="text-green-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Book Transport</h2>
            <p className="text-zinc-400">
              Find and book available transport options
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="aspect-video rounded-lg bg-zinc-800 overflow-hidden">
            {currentLocation && (
              <MapContainer
                center={[currentLocation.lat, currentLocation.lng]} // Center on user's location
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationSelector />
                <Marker position={[currentLocation.lat, currentLocation.lng]} />
              </MapContainer>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-zinc-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Current Location</h3>
              <div className="flex items-center space-x-2 text-zinc-400">
                <MapPin size={20} />
                <span>
                  {currentLocation
                    ? `Lat: ${currentLocation.lat}, Lng: ${currentLocation.lng}`
                    : "Fetching location..."}
                </span>
              </div>
            </div>
            <div className="bg-zinc-800/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Available Options</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Bikes</span>
                  <span className="text-green-400">8 nearby</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Scooters</span>
                  <span className="text-green-400">12 nearby</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
          >
            <div className="space-y-4">
              {transportOptions.map((option) => (
                <div key={option.type} className="relative">
                  <RadioGroupItem
                    value={option.type}
                    id={option.type}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.type}
                    className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300 peer-data-[state=checked]:bg-green-500/20 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-green-500"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <option.icon className="text-green-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold">{option.type}</h3>
                        <div className="flex items-center space-x-4 text-sm text-zinc-400">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {option.distance}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {option.time}
                          </div>
                          <div className="flex items-center">
                            <Leaf size={16} className="mr-1" />
                            {option.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                      {option.price}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-6">
            <Button type="submit" className="w-full bg-green-700">
              Book Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
