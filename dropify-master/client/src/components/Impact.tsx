"use client"
import React, { useEffect, useState } from "react"
import { Leaf } from "lucide-react"
import routes, { User } from "@/lib/api/routes"

export const Impact: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([])
  const [treesEquivalent, setTreesEquivalent] = useState<number>(0)
  const [carbonCrusherProgress, setCarbonCrusherProgress] = useState<number>(0)
  const [user, setUser] = useState<User | null>(null)
  const carbonSaved = user?.carbonFootprintReduction ?? 0
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await routes.users.getAll()
        setLeaderboard(response)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      }
    }

    fetchLeaderboard()
  }, [])

  // Calculate Trees Equivalent based on Carbon Saved
  useEffect(() => {
    const calculateTreesEquivalent = () => {
      const trees = user?.carbonFootprintReduction ?? 0 / 22 // Assuming 1 tree absorbs 22 kg of CO2 per year
      setTreesEquivalent(trees)
    }

    calculateTreesEquivalent()
  }, [carbonSaved])

  // Calculate Progress for Carbon Crusher achievement
  useEffect(() => {
    const calculateProgress = () => {
      const targetCarbonSaved = 100 // Target for "Carbon Crusher" achievement
      const progress = (carbonSaved / targetCarbonSaved) * 100
      setCarbonCrusherProgress(progress)
    }

    calculateProgress()
  }, [carbonSaved])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchUser = async () => {
        const userId = localStorage.getItem("userId")
        if (userId) {
          try {
            const userResponse = await routes.users.getById(userId)
            setUser(userResponse)
          } catch (error) {
            console.error("Error fetching user:", error)
          }
        }
      }

      fetchUser()
    }
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Leaf className="text-green-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Environmental Impact</h2>
            <p className="text-zinc-400">
              Your contribution to a greener future
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <h4 className="text-sm text-zinc-400">Carbon Saved</h4>
            <p className="text-2xl font-bold">
              {user.carbonFootprintReduction}kg
            </p>
            <p className="text-sm text-green-400">total progress</p>
          </div>
          {/* Static Green Trips Card */}
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <h4 className="text-sm text-zinc-400">Green Trips</h4>
            <p className="text-2xl font-bold">{user.greentip}</p>
            <p className="text-sm text-green-400">total progressk</p>
          </div>
          {/* Calculated Trees Equivalent Card */}
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <h4 className="text-sm text-zinc-400">Trees Equivalent</h4>
            <p className="text-2xl font-bold">{treesEquivalent.toFixed(2)}</p>
            <p className="text-sm text-green-400">Monthly impact</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Impact Leaderboard</h3>
          <div className="space-y-4">
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <div
                  key={user.name}
                  className="p-4 bg-zinc-800/50 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-zinc-400 font-bold">
                      {index + 1}.
                    </span>
                    <h4 className="font-medium">{user.name}</h4>
                  </div>
                  <span className="text-sm text-green-400 font-bold">
                    {user.carbonFootprintReduction}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-zinc-400">Loading leaderboard...</p>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold mb-4">Green Achievements</h3>
          <div className="space-y-4">
            {[
              // Static achievements data
              {
                title: "Eco Warrior",
                progress: 80,
                icon: Leaf,
              },
              {
                title: "Carbon Crusher",
                progress: carbonCrusherProgress,
                icon: Leaf,
              },
              {
                title: "Community Leader",
                progress: 40,
                icon: Leaf,
              },
            ].map((achievement) => (
              <div
                key={achievement.title}
                className="p-4 bg-zinc-800/50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <achievement.icon className="text-green-400" size={20} />
                    <h4 className="font-medium">{achievement.title}</h4>
                  </div>
                  <span className="text-sm text-zinc-400">
                    {achievement.progress}%
                  </span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
