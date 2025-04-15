"use server"

import { createSession, verifyPassword, logout as logoutAction } from "@/lib/auth"
import {
  addImage as addImageAction,
  updateImage as updateImageAction,
  deleteImage as deleteImageAction,
} from "@/lib/image-storage"
import { revalidatePath } from "next/cache"

// Login action
export async function login(password: string) {
  try {
    const isValid = await verifyPassword(password)

    if (isValid) {
      await createSession()
      return { success: true }
    }

    return { success: false, error: "Invalid password" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An error occurred during login" }
  }
}

// Logout action
export async function logout() {
  await logoutAction()
  revalidatePath("/admin")
  return { success: true }
}

// Upload image action
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      return { success: false, error: "No file provided" }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const type = formData.get("type") as "police" | "fire" | "nwa"
    const location = formData.get("location") as string
    const date = formData.get("date") as string
    const camera = formData.get("camera") as string
    const isTop10 = formData.get("isTop10") === "true"

    const image = await addImageAction(buffer, file.name, {
      type,
      location,
      date,
      camera,
      isTop10,
    })

    revalidatePath("/admin/dashboard")
    revalidatePath("/")

    return { success: true, image }
  } catch (error) {
    console.error("Upload error:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

// Update image action
export async function updateImage(formData: FormData) {
  try {
    const id = formData.get("id") as string
    if (!id) {
      return { success: false, error: "No image ID provided" }
    }

    const type = formData.get("type") as "police" | "fire" | "nwa"
    const location = formData.get("location") as string
    const date = formData.get("date") as string
    const camera = formData.get("camera") as string
    const isTop10 = formData.get("isTop10") === "true"

    const image = await updateImageAction(id, {
      type,
      location,
      date,
      camera,
      isTop10,
    })

    if (!image) {
      return { success: false, error: "Image not found" }
    }

    revalidatePath("/admin/dashboard")
    revalidatePath("/")

    return { success: true, image }
  } catch (error) {
    console.error("Update error:", error)
    return { success: false, error: "Failed to update image" }
  }
}

// Delete image action
export async function deleteImage(id: string) {
  try {
    const success = await deleteImageAction(id)

    if (!success) {
      return { success: false, error: "Image not found" }
    }

    revalidatePath("/admin/dashboard")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Delete error:", error)
    return { success: false, error: "Failed to delete image" }
  }
}
