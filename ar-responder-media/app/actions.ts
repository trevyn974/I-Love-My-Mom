"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import type { Supporter } from "@/types/supporters"

export async function getSupporters(): Promise<Supporter[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("supporters")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("name")

  if (error) {
    console.error("Error fetching supporters:", error)
    return []
  }

  return data || []
}
