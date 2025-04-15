"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, ChevronRight, Shield, Camera, Users } from "lucide-react"

export default function AdminCard() {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        <motion.div
          ref={cardRef}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            className={`overflow-hidden transition-all duration-300 ${
              isHovered ? "shadow-lg transform -translate-y-1" : "shadow-md"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#002D72] to-[#E31837]"></div>

            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-[#002D72]">
                  <Lock className="mr-1 h-3 w-3" />
                  Admin Access
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  Secure Area
                </div>
              </div>
              <CardTitle className="text-xl md:text-2xl mt-2">AR Responder Media Administration</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                  <Camera className="h-8 w-8 text-[#002D72] mb-2" />
                  <h3 className="font-medium text-center">Manage Gallery</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">Upload and organize images</p>
                </div>

                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                  <Users className="h-8 w-8 text-[#E31837] mb-2" />
                  <h3 className="font-medium text-center">Supporter Management</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">Update supporter information</p>
                </div>

                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                  <Shield className="h-8 w-8 text-gray-700 mb-2" />
                  <h3 className="font-medium text-center">Site Settings</h3>
                  <p className="text-xs text-center text-muted-foreground mt-1">Configure website options</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center border-t pt-4">
              <p className="text-sm text-muted-foreground">Authorized personnel only</p>
              <Link href="/admin/login">
                <Button className={`transition-all duration-300 ${isHovered ? "bg-[#002D72]" : "bg-gray-700"}`}>
                  Admin Login
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
