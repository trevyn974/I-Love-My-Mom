"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Flame, MapPin, Calendar, CameraIcon, Search, Filter } from "lucide-react"
import type { ImageMetadata } from "@/lib/image-storage"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type FilterType = "all" | "police" | "fire" | "nwa" | "top10"

interface GallerySectionProps {
  images: ImageMetadata[]
}

export default function GallerySection({ images = [] }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const filteredItems = images.filter((item) => {
    // First apply search filter
    const matchesSearch =
      searchTerm === "" ||
      item.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false

    // Then apply category filter
    if (activeFilter === "all") return true
    if (activeFilter === "top10") return item.isTop10
    return item.type === activeFilter
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  }

  return (
    <section id="gallery" ref={sectionRef} className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 px-3 py-1 bg-[#E31837] text-white hover:bg-[#E31837]/90">
            <CameraIcon className="mr-1 h-3 w-3" />
            Our Gallery
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Image Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of images capturing Arkansas first responders in action. All photos are taken from
            public property with respect for emergency operations.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-primary" : ""}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={activeFilter === "police" ? "default" : "outline"}
              onClick={() => setActiveFilter("police")}
              className={activeFilter === "police" ? "bg-[#002D72]" : ""}
              size="sm"
            >
              <Shield className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Police</span>
              <span className="sm:hidden">Police</span>
            </Button>
            <Button
              variant={activeFilter === "fire" ? "default" : "outline"}
              onClick={() => setActiveFilter("fire")}
              className={activeFilter === "fire" ? "bg-[#E31837]" : ""}
              size="sm"
            >
              <Flame className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Fire</span>
              <span className="sm:hidden">Fire</span>
            </Button>
            <Button
              variant={activeFilter === "nwa" ? "default" : "outline"}
              onClick={() => setActiveFilter("nwa")}
              size="sm"
            >
              NWA
            </Button>
            <Button
              variant={activeFilter === "top10" ? "default" : "outline"}
              onClick={() => setActiveFilter("top10")}
              size="sm"
            >
              Top 10
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">More Filters</span>
                  <span className="sm:hidden">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
                <DropdownMenuItem>Most Popular</DropdownMenuItem>
                <DropdownMenuItem>Fayetteville</DropdownMenuItem>
                <DropdownMenuItem>Springdale</DropdownMenuItem>
                <DropdownMenuItem>Rogers</DropdownMenuItem>
                <DropdownMenuItem>Bentonville</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={item}
                className="relative rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.path || "/placeholder.svg"}
                    alt={item.originalName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay with info */}
                  <div
                    className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                      hoveredItem === item.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="text-white space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CameraIcon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm truncate">{item.camera}</span>
                      </div>
                    </div>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-full text-white ${
                        item.type === "police" ? "bg-[#002D72]" : item.type === "fire" ? "bg-[#E31837]" : "bg-black/70"
                      }`}
                    >
                      {item.type === "police" ? "Police" : item.type === "fire" ? "Fire" : "NWA"}
                    </div>
                  </div>

                  {/* Top 10 badge */}
                  {item.isTop10 && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">Top 10</div>
                    </div>
                  )}
                </div>

                <div className="p-3 text-center text-sm text-muted-foreground">
                  Right-click to save (web resolution) or{" "}
                  <a href="mailto:contact@arrespondermedia.com" className="text-primary hover:underline">
                    email for print-quality
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">No images found for the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  )
}
