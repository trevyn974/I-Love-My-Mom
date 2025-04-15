"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, Heart, Camera, Upload, Send, CheckCircle, BadgeHelp } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useInView } from "framer-motion"

export default function SupportSection() {
  const [nominationName, setNominationName] = useState("")
  const [nominationDepartment, setNominationDepartment] = useState("")
  const [nominationReason, setNominationReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleNominationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSuccess(true)
      setIsSubmitting(false)
      setNominationName("")
      setNominationDepartment("")
      setNominationReason("")

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1000)
  }

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
    <section id="support" ref={sectionRef} className="py-20 md:py-28 bg-muted">
      <div className="container px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 px-3 py-1 bg-[#002D72] text-white hover:bg-[#002D72]/90">
            <Heart className="mr-1 h-3 w-3" />
            Support Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Mission</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us continue our mission of documenting Arkansas first responders. Your support allows us to capture and
            share their heroic work.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Buy Us a Coffee */}
          <motion.div variants={item}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="bg-amber-50 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-amber-600" />
                  Buy Us a Coffee
                </CardTitle>
                <CardDescription>Support our daily operations</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Support our work with a small donation. Every contribution helps us stay on the move and capture more
                  moments.
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <Button className="bg-amber-600 hover:bg-amber-700 w-full">
                    <Coffee className="mr-2 h-4 w-4" />
                    $5 Coffee
                  </Button>
                  <Button variant="outline" className="w-full">
                    Custom Amount
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
                Powered by Ko-fi
              </CardFooter>
            </Card>
          </motion.div>

          {/* Nominate a First Responder */}
          <motion.div variants={item}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="bg-blue-50 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  Nominate a Hero
                </CardTitle>
                <CardDescription>Suggest a first responder to feature</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isSuccess ? (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Thank you for your nomination!</p>
                    <p className="text-sm mt-1">We'll review it soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNominationSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Name of First Responder"
                        value={nominationName}
                        onChange={(e) => setNominationName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Department"
                        value={nominationDepartment}
                        onChange={(e) => setNominationDepartment(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Why should we feature them?"
                        value={nominationReason}
                        onChange={(e) => setNominationReason(e.target.value)}
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Submitting..." : "Submit Nomination"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Your Photos */}
          <motion.div variants={item}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="bg-green-50 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  Submit Your Photos
                </CardTitle>
                <CardDescription>Share your first responder images</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Have photos of first responders in action? Share them with us and we may feature them in our gallery.
                </p>
                <div className="w-full">
                  <Button variant="outline" className="w-full border-dashed border-2 h-24 flex flex-col gap-2">
                    <Upload className="h-6 w-6" />
                    <span>Click to upload or drag and drop</span>
                    <span className="text-xs text-muted-foreground">Coming Soon</span>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Link href="#" className="text-xs text-primary flex items-center gap-1">
                  <BadgeHelp className="h-3 w-3" />
                  Learn about our submission guidelines
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
