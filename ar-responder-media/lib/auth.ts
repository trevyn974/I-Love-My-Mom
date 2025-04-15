import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import crypto from "crypto"

// In a real app, you would use a proper hashing library and store this securely
// This is a simplified example for demonstration purposes
const ADMIN_PASSWORD = "Rayne1029"
const SESSION_COOKIE_NAME = "ar_responder_admin_session"
const SESSION_SECRET = "this_would_be_a_secure_secret_in_production"

// Hash the password for comparison
function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update(password + SESSION_SECRET)
    .digest("hex")
}

// Verify the password
export async function verifyPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD
}

// Create a session
export async function createSession(): Promise<void> {
  const sessionId = crypto.randomUUID()
  const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
  })
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)
  return !!sessionCookie
}

// Require authentication
export async function requireAuth() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }
}

// Logout
export async function logout(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME)
}
