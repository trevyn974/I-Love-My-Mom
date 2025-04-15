import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { isAuthenticated } from "@/lib/auth"

export async function POST(request: Request) {
  // Check if user is authenticated
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()

    const { name, username, is_featured } = body

    if (!name || !username) {
      return NextResponse.json({ error: "Name and username are required" }, { status: 400 })
    }

    const { data, error } = await supabase.from("supporters").insert([{ name, username, is_featured }]).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error("Error adding supporter:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
