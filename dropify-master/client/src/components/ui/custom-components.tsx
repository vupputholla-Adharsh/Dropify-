import React from 'react'
import { motion } from 'framer-motion'

export const PulsingDot = () => (
  <motion.div
    className="w-3 h-3 bg-green-500 rounded-full"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
)

export const FadeInSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

