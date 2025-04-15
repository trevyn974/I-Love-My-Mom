"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight, Camera, ChevronDown, Shield, Flame } from "lucide-react"

export default function HeroSection() {
  const [badgeIndex, setBadgeIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const badges = [
    "100% Public Property Shots",
    "Non-Interference Pledge",
    "Respecting First Responders",
    "Documenting Arkansas Heroes",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % badges.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
          style={{ filter: "brightness(0.7)" }}
        >
          <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <motion.div className="container relative z-20 px-4 py-16 md:py-24 lg:py-32" style={{ opacity, scale }}>
        <div className="max-w-3xl mx-auto text-center text-white space-y-8">
          <motion.div
            className="inline-flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Camera className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider">AR Responder Media</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trevyn & Benji
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Documenting Arkansas Heroes
          </motion.p>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Supporting Arkansas First Responders Since 2023
          </motion.div>

          <motion.div
            className="h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="bg-[#002D72]/80 text-white px-6 py-2 rounded-full">{badges[badgeIndex]}</div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <Link href="#gallery">
              <Button size="lg" className="bg-[#E31837] hover:bg-[#E31837]/90 text-white w-full sm:w-auto">
                <Flame className="mr-2 h-4 w-4" />
                View Gallery
              </Button>
            </Link>
            <Link href="#team">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                <Shield className="mr-2 h-4 w-4" />
                Meet Our Team
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <Link
              href="https://tiktok.com/@Code3Chasers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-all"
            >
              <span className="animate-pulse">Follow @Code3Chasers</span>
              <span className="text-sm">(Coming Soon)</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>
    </section>
  )
}
