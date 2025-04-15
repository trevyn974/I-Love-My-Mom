import Link from "next/link"
import HeroSection from "@/components/hero-section"
import TeamSection from "@/components/team-section"
import GallerySection from "@/components/gallery-section"
import SupportSection from "@/components/support-section"
import AdminCard from "@/components/admin-card"
import MainNav from "@/components/main-nav"
import { getAllImages } from "@/lib/image-storage"
import { getSupporters } from "./actions"

export default async function Home() {
  // Get all images for the gallery
  const images = await getAllImages()

  // Get all supporters
  const supporters = await getSupporters()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <TeamSection supporters={supporters} />
        <GallerySection images={images} />
        <SupportSection />
        <AdminCard />
      </main>

      <footer className="border-t py-8 md:py-12 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-6 w-6">
                  <div className="absolute inset-0 rounded-full bg-[#002D72]"></div>
                  <div className="absolute inset-1 rounded-full bg-[#E31837]"></div>
                  <div className="absolute inset-2 rounded-full bg-white"></div>
                  <div className="absolute inset-3 rounded-full bg-[#002D72]"></div>
                </div>
                <span className="font-bold">AR Responder Media</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Documenting Arkansas first responders since 2023. All images are taken from public property with respect
                for emergency operations.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#home" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#team" className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/#gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/#support" className="text-muted-foreground hover:text-foreground transition-colors">
                    Support Us
                  </Link>
                </li>
                <li>
                  <Link href="/faith" className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Faith
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/ethics" className="text-muted-foreground hover:text-foreground transition-colors">
                    Ethics Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Email: contact@arrespondermedia.com</li>
                <li className="text-muted-foreground">TikTok: @Code3Chasers</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Link
                href="/faith"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="relative w-4 h-4">
                  <div className="absolute inset-0 w-0.5 bg-[#002D72] left-1/2 -translate-x-1/2"></div>
                  <div className="absolute inset-0 h-0.5 bg-[#002D72] top-1/2 -translate-y-1/2"></div>
                </div>
                <span>Why We Do This: Service Through Our Lens</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AR Responder Media. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
