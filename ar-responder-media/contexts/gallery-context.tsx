"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

interface GalleryContextProps {
  activeFilter: "all" | "police" | "fire" | "nwa" | "top10"
  setActiveFilter: (filter: "all" | "police" | "fire" | "nwa" | "top10") => void
}

const GalleryContext = createContext<GalleryContextProps>({
  activeFilter: "all",
  setActiveFilter: () => {},
})

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "police" | "fire" | "nwa" | "top10">("all")

  return <GalleryContext.Provider value={{ activeFilter, setActiveFilter }}>{children}</GalleryContext.Provider>
}

export const useGallery = () => useContext(GalleryContext)
