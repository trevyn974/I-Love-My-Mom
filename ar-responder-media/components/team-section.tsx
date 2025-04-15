"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Camera, DrillIcon as Drone, Shield, Flame, Award, Users } from "lucide-react"
import type { Supporter } from "@/types/supporters"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface TeamSectionProps {
  supporters: Supporter[]
}

export default function TeamSection({ supporters = [] }: TeamSectionProps) {
  const [flippedTrevyn, setFlippedTrevyn] = useState(false)
  const [flippedBenji, setFlippedBenji] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="team" ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
      <div className="container px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 px-3 py-1 bg-[#002D72] text-white hover:bg-[#002D72]/90">
            <Users className="mr-1 h-3 w-3" />
            Our Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated individuals behind AR Responder Media who work tirelessly to document the heroic efforts
            of Arkansas first responders.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Trevyn Card */}
          <motion.div variants={item}>
            <div
              className="relative h-[400px] perspective-1000 cursor-pointer"
              onMouseEnter={() => setFlippedTrevyn(true)}
              onMouseLeave={() => setFlippedTrevyn(false)}
              onClick={() => setFlippedTrevyn(!flippedTrevyn)}
            >
              <motion.div
                className="absolute inset-0 rounded-xl shadow-lg"
                animate={{ rotateY: flippedTrevyn ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 rounded-xl z-10"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/71e1190a131b8972d00487ee7d3a2f0a~tplv-tiktokx-cropcenter_1080_1080-chMtPWs72dZhdpzhDWgGRukSs7sL9G.jpeg"
                  alt="Trevyn"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  <h3 className="text-2xl font-bold">Trevyn</h3>
                  <p className="text-white/80">Lead Photographer & Founder</p>
                  <div className="mt-2 inline-block bg-[#002D72] text-white text-sm px-3 py-1 rounded-full">
                    <Shield className="inline-block mr-1 h-3 w-3" />
                    Always on the Move
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-xl bg-[#002D72] text-white p-6 flex flex-col"
                animate={{ rotateY: flippedTrevyn ? 0 : -180 }}
                initial={{ rotateY: -180 }}
                transition={{ duration: 0.6 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="h-6 w-6" />
                  <h3 className="text-2xl font-bold">Trevyn</h3>
                </div>
                <p className="text-lg font-medium mb-2">Owner & Lead Photographer</p>
                <p className="text-white/80 flex-1">
                  Documenting NWA emergencies since 2023. Canon R5 specialist with a passion for capturing the critical
                  moments that showcase the bravery of our first responders.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="inline-block bg-white text-[#002D72] text-sm px-3 py-1 rounded-full font-medium">
                    <Shield className="inline-block mr-1 h-3 w-3" />
                    Always on the Move
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4" />
                    <span>Featured in NWA Democrat-Gazette</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Benji Card */}
          <motion.div variants={item}>
            <div
              className="relative h-[400px] perspective-1000 cursor-pointer"
              onMouseEnter={() => setFlippedBenji(true)}
              onMouseLeave={() => setFlippedBenji(false)}
              onClick={() => setFlippedBenji(!flippedBenji)}
            >
              <motion.div
                className="absolute inset-0 rounded-xl shadow-lg"
                animate={{ rotateY: flippedBenji ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 rounded-xl z-10"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/71e1190a131b8972d00487ee7d3a2f0a~tplv-tiktokx-cropcenter_1080_1080-chMtPWs72dZhdpzhDWgGRukSs7sL9G.jpeg"
                  alt="Benji"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  <h3 className="text-2xl font-bold">Benji</h3>
                  <p className="text-white/80">Video Director & Tech Ops</p>
                  <div className="mt-2 inline-block bg-[#E31837] text-white text-sm px-3 py-1 rounded-full">
                    <Flame className="inline-block mr-1 h-3 w-3" />
                    Master of the 10-Second Clip
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-xl bg-[#E31837] text-white p-6 flex flex-col"
                animate={{ rotateY: flippedBenji ? 0 : -180 }}
                initial={{ rotateY: -180 }}
                transition={{ duration: 0.6 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Drone className="h-6 w-6" />
                  <h3 className="text-2xl font-bold">Benji</h3>
                </div>
                <p className="text-lg font-medium mb-2">Co-Owner & Video Director</p>
                <p className="text-white/80 flex-1">
                  Drone and dashcam expert. Captures the angles others miss. Specializes in creating compelling
                  short-form video content that highlights the dedication of Arkansas first responders.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="inline-block bg-white text-[#E31837] text-sm px-3 py-1 rounded-full font-medium">
                    <Flame className="inline-block mr-1 h-3 w-3" />
                    Master of the 10-Second Clip
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4" />
                    <span>FAA Licensed Drone Pilot</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Supporter Wall */}
        <motion.div
          className="mt-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col items-center mb-8">
            <Badge className="mb-2 px-3 py-1">Our Supporters</Badge>
            <h3 className="text-xl font-medium text-center">Special Thanks To Our Supporters:</h3>
          </div>

          {supporters.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {supporters.map((supporter) => (
                <Card
                  key={supporter.id}
                  className={`transition-all hover:shadow-md ${
                    supporter.is_featured ? "bg-gradient-to-br from-[#002D72]/5 to-[#E31837]/5 border-[#002D72]/20" : ""
                  }`}
                >
                  <CardContent className="p-3 text-center">
                    <p className="font-medium truncate">{supporter.name}</p>
                    <p className="text-sm text-muted-foreground truncate">@{supporter.username}</p>
                    {supporter.is_featured && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-[#002D72] text-white rounded-full">
                        Featured
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">Loading supporters...</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
