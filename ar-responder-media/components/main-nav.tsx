"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Menu, X, LogIn } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Handle scroll events for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ["home", "team", "gallery", "support"]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div
        className={`flex items-center justify-between w-full transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 transition-transform duration-300 group-hover:rotate-12">
            <div className="absolute inset-0 rounded-full bg-[#002D72]"></div>
            <div className="absolute inset-1 rounded-full bg-[#E31837]"></div>
            <div className="absolute inset-2 rounded-full bg-white"></div>
            <div className="absolute inset-3 rounded-full bg-[#002D72]"></div>
          </div>
          <span className="font-bold text-xl">AR Responder Media</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/#home"
            className={`text-sm font-medium transition-colors hover:text-primary relative ${
              activeSection === "home" ? "text-primary" : "text-foreground"
            }`}
          >
            Home
            {activeSection === "home" && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
          <Link
            href="/#team"
            className={`text-sm font-medium transition-colors hover:text-primary relative ${
              activeSection === "team" ? "text-primary" : "text-foreground"
            }`}
          >
            Our Team
            {activeSection === "team" && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
          <Link
            href="/#gallery"
            className={`text-sm font-medium transition-colors hover:text-primary relative ${
              activeSection === "gallery" ? "text-primary" : "text-foreground"
            }`}
          >
            Gallery
            {activeSection === "gallery" && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
          <Link
            href="/#support"
            className={`text-sm font-medium transition-colors hover:text-primary relative ${
              activeSection === "support" ? "text-primary" : "text-foreground"
            }`}
          >
            Support Us
            {activeSection === "support" && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="https://tiktok.com/@Code3Chasers"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <span className="animate-pulse">@Code3Chasers</span>
            <ChevronRight className="h-4 w-4" />
          </Link>

          <Link href="/admin/login" className="hidden md:flex">
            <Button variant="outline" size="sm" className="gap-1.5">
              <LogIn className="h-4 w-4" />
              Admin
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px] pr-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <div className="relative h-7 w-7">
                      <div className="absolute inset-0 rounded-full bg-[#002D72]"></div>
                      <div className="absolute inset-1 rounded-full bg-[#E31837]"></div>
                      <div className="absolute inset-2 rounded-full bg-white"></div>
                      <div className="absolute inset-3 rounded-full bg-[#002D72]"></div>
                    </div>
                    <span className="font-bold">AR Responder Media</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/#home"
                    className="flex items-center gap-3 text-lg font-medium py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`w-1 h-6 rounded-full ${activeSection === "home" ? "bg-primary" : "bg-transparent"}`}
                    ></div>
                    Home
                  </Link>
                  <Link
                    href="/#team"
                    className="flex items-center gap-3 text-lg font-medium py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`w-1 h-6 rounded-full ${activeSection === "team" ? "bg-primary" : "bg-transparent"}`}
                    ></div>
                    Our Team
                  </Link>
                  <Link
                    href="/#gallery"
                    className="flex items-center gap-3 text-lg font-medium py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`w-1 h-6 rounded-full ${activeSection === "gallery" ? "bg-primary" : "bg-transparent"}`}
                    ></div>
                    Gallery
                  </Link>
                  <Link
                    href="/#support"
                    className="flex items-center gap-3 text-lg font-medium py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`w-1 h-6 rounded-full ${activeSection === "support" ? "bg-primary" : "bg-transparent"}`}
                    ></div>
                    Support Us
                  </Link>
                  <Link
                    href="/faith"
                    className="flex items-center gap-3 text-lg font-medium py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`w-1 h-6 rounded-full ${activeSection === "faith" ? "bg-primary" : "bg-transparent"}`}
                    ></div>
                    Our Faith
                  </Link>
                  <Link
                    href="/admin/login"
                    className="flex items-center gap-3 text-lg font-medium py-3 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-1 h-6 rounded-full bg-transparent"></div>
                    Admin Login
                  </Link>
                </nav>
                <div className="mt-auto pt-6">
                  <Link
                    href="https://tiktok.com/@Code3Chasers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-black text-white p-3 rounded-lg w-full"
                  >
                    <span>Follow @Code3Chasers</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}
