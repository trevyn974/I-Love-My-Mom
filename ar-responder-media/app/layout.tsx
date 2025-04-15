import type React from "react"
import { GalleryProvider } from "@/contexts/gallery-context"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AR Responder Media - Documenting Arkansas Heroes",
  description: "Trevyn & Benji – Documenting Arkansas Heroes since 2023",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        <GalleryProvider>{children}</GalleryProvider>
      </body>
    </html>
  )
}


import './globals.css'