import { redirect } from "next/navigation"
import LoginForm from "@/components/admin/login-form"
import { isAuthenticated } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function LoginPage() {
  // If already authenticated, redirect to admin dashboard
  if (await isAuthenticated()) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to website
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#002D72] to-[#E31837] h-2"></div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">AR Responder Media</h1>
              <p className="text-muted-foreground mt-1">Admin Login</p>
            </div>

            <LoginForm />

            <div className="text-center text-xs text-muted-foreground pt-4">
              <p>Secure access for authorized personnel only.</p>
              <p className="mt-1">Need help? Contact the site administrator.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
