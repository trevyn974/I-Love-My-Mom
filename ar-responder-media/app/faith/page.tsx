import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function FaithPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 max-w-3xl">
            <div className="flex justify-center mb-8">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 w-1 bg-[#002D72] left-1/2 -translate-x-1/2"></div>
                <div className="absolute inset-0 h-1 bg-[#002D72] top-1/2 -translate-y-1/2"></div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Why We Do This: Service Through Our Lens
            </h1>

            <div className="prose prose-lg mx-auto">
              <p>
                Our mission at AR Responder Media goes beyond just capturing compelling images. It's rooted in a deep
                sense of service and faith that guides everything we do.
              </p>

              <p>
                As Arkansas natives, we've grown up witnessing the selfless dedication of our first responders. These
                men and women put their lives on the line daily, often without recognition or fanfare. Through our
                photography and videography, we aim to shine a light on their heroism and sacrifice.
              </p>

              <p>
                Our faith teaches us the importance of serving others and using our talents to uplift our community. We
                believe that by documenting the work of first responders, we're not only preserving important moments in
                time but also inspiring others to appreciate and support these everyday heroes.
              </p>

              <p>
                We approach our work with reverence and respect. We never interfere with emergency operations, never
                trespass on private property, and always prioritize the dignity of both first responders and those
                they're helping. Our presence is meant to be unobtrusive yet meaningful.
              </p>

              <p>
                Through AR Responder Media, we hope to create a visual testament to the courage, compassion, and
                commitment that defines Arkansas' first responders. It's our way of saying "thank you" while encouraging
                others to recognize and honor their service as well.
              </p>

              <p className="text-center font-medium">— Trevyn & Benji</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AR Responder Media. All rights reserved.
          </p>
          <Link href="/" className="text-sm text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}
