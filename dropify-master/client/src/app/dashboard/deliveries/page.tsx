"use client"
import React, { useState, useEffect } from "react"
import { Clock, Package, X } from "lucide-react"
import mapboxgl from "mapbox-gl"
import Map, { Marker, Source, Layer } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { PulsingDot, FadeInSection } from "@/components/ui/custom-components"
import { motion, AnimatePresence } from "framer-motion"
import routes from "@/lib/api/routes"

mapboxgl.accessToken = "pk.eyJ1Ijoia3Jpc2huYWRldnIiLCJhIjoiY202Y2lzNGN5MDh6eTJ4cjJ4OGEwN2E1eCJ9.3Hqu6D2BE59rzEAQf_h0Ew"
export default function Deliveries() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [activeOrders, setActiveOrders] = useState<any[]>([])
  const [pastOrders, setPastOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [deliveryPersonLocation, setDeliveryPersonLocation] = useState<[number, number] | null>(null)
  const [routeCoordinates, setRouteCoordinates] = useState<any[]>([])

  // Fetch user's live location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([longitude, latitude])
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true, maximumAge: 1000 }
      )
      return () => navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  // Fetch active and past orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeOrdersData = await routes.orders.getAll()
        const activeOrders = activeOrdersData.filter((order) => order.orderStatus === "pending")
        setActiveOrders(activeOrders)

        const pastOrdersData = activeOrdersData.filter((order) => order.orderStatus === "delivered")
        setPastOrders(pastOrdersData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  // Fetch the delivery person's location when an order is selected
  useEffect(() => {
    if (selectedOrder && selectedOrder.deliveryPersonId) {
      const fetchDeliveryPersonLocation = async () => {
        try {
          const deliveryPerson = await selectedOrder.deliveryPersonId
          setDeliveryPersonLocation([deliveryPerson.currentLocation.lng, deliveryPerson.currentLocation.lat])
        } catch (error) {
          console.error("Error fetching delivery person location:", error)
        }
      }
      fetchDeliveryPersonLocation()
    }
  }, [selectedOrder])

  const handleOrderClick = (orderId: string) => {
    const order = activeOrders.find((order) => order._id === orderId)
    setSelectedOrder(order)
  }

  // Fetch route between user and delivery person using Mapbox Directions API
  useEffect(() => {
    const fetchRoute = async () => {
      if (!userLocation || !deliveryPersonLocation) return

      const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${deliveryPersonLocation[0]},${deliveryPersonLocation[1]}?access_token=${mapboxgl.accessToken}&geometries=geojson`
      const response = await fetch(routeUrl)
      const data = await response.json()

      if (data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates
        setRouteCoordinates(route)
      }
    }

    fetchRoute()
  }, [userLocation, deliveryPersonLocation])

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-6">
          {/* Active Orders Section */}
          <FadeInSection>
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-purple-300">Active Orders</h2>
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-4 bg-zinc-700/50 rounded-lg cursor-pointer transition-all duration-300 hover:bg-zinc-600/50"
                    onClick={() => handleOrderClick(order._id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Package className="text-purple-400" size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">#{order._id.substring(0, 8)}</h3>
                        <p className="text-sm text-zinc-400">{order.items.join(", ")}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-2">
                      <p className="font-medium text-purple-300">
                        {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
                      </p>
                      <PulsingDot />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Past Orders */}
            <FadeInSection>
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Past Orders</h3>
                <div className="space-y-3">
                  {pastOrders.map((order) => (
                    <motion.div
                      key={order._id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                    >
                      <div>
                        <h4 className="font-medium text-lg">#{order._id.substring(0, 8)}</h4>
                        <p className="text-sm text-zinc-400">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-zinc-400">{order.items.join(", ")}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="text-purple-400" size={20} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Order Details Modal with Map */}
          <AnimatePresence>
            {selectedOrder && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-zinc-800/90 p-4 sm:p-6 rounded-2xl max-w-full sm:max-w-2xl w-[90%] sm:w-full shadow-2xl border border-zinc-600"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-3xl font-bold text-purple-300">Order Details</h2>
                    <button onClick={() => setSelectedOrder(null)} className="text-zinc-400 hover:text-white transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <p className="font-medium text-base sm:text-lg">Order ID: <span className="text-purple-300">#{selectedOrder._id}</span></p>
                    <p className="font-medium text-base sm:text-lg">Items: <span className="text-zinc-300">{selectedOrder.items.join(", ")}</span></p>
                    <p className="font-medium text-base sm:text-lg">Status: <span className="text-green-400">{selectedOrder.orderStatus}</span></p>
                    <p className="font-medium text-base sm:text-lg">Estimated Delivery: <span className="text-purple-300">{new Date(selectedOrder.estimatedDeliveryTime).toLocaleTimeString()}</span></p>
                  </div>

                  {/* Mapbox Map */}
                  <div className="h-64 sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden mt-4 sm:mt-6 border border-zinc-600 shadow-lg">
                    <Map
                      initialViewState={{
                        longitude: userLocation?.[0] || 0,
                        latitude: userLocation?.[1] || 0,
                        zoom: 13,
                      }}
                      style={{ height: "100%", width: "100%" }}
                      mapStyle="mapbox://styles/mapbox/streets-v11"
                      mapboxAccessToken={mapboxgl.accessToken || ""}
                    >
                      {/* User Location Marker */}
                      {userLocation && (
                        <Marker longitude={userLocation[0]} latitude={userLocation[1]}>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-pulse"></div>
                        </Marker>
                      )}

                      {/* Delivery Person Marker */}
                      {deliveryPersonLocation && (
                        <Marker longitude={deliveryPersonLocation[0]} latitude={deliveryPersonLocation[1]}>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-bounce"></div>
                        </Marker>
                      )}

                      {/* Route Layer */}
                      {routeCoordinates.length > 0 && (
                        <Source type="geojson" data={{ type: "Feature", geometry: { type: "LineString", coordinates: routeCoordinates } }}>
                          <Layer
                            id="route"
                            type="line"
                            paint={{
                              "line-color": "#ff0000",
                              "line-width": 4,
                              "line-opacity": 0.75
                            }}
                          />
                        </Source>
                      )}
                    </Map>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
