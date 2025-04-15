import fs from "fs"
import path from "path"
import { writeFile } from "fs/promises"
import crypto from "crypto"

// Define the image storage directory
const IMAGE_DIR = path.join(process.cwd(), "public", "images")
const IMAGE_PUBLIC_PATH = "/images"

// Ensure the directory exists
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true })
}

export type ImageMetadata = {
  id: string
  filename: string
  originalName: string
  path: string
  type: "police" | "fire" | "nwa"
  location: string
  date: string
  camera: string
  isTop10: boolean
  createdAt: number
  updatedAt: number
}

// Get all images
export async function getAllImages(): Promise<ImageMetadata[]> {
  try {
    const metadataPath = path.join(IMAGE_DIR, "metadata.json")

    if (!fs.existsSync(metadataPath)) {
      return []
    }

    const data = fs.readFileSync(metadataPath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading images:", error)
    return []
  }
}

// Save image metadata
async function saveImageMetadata(images: ImageMetadata[]): Promise<void> {
  const metadataPath = path.join(IMAGE_DIR, "metadata.json")
  await writeFile(metadataPath, JSON.stringify(images, null, 2))
}

// Add a new image
export async function addImage(
  file: Buffer,
  originalName: string,
  metadata: Omit<ImageMetadata, "id" | "filename" | "path" | "createdAt" | "updatedAt">,
): Promise<ImageMetadata> {
  const id = crypto.randomUUID()
  const extension = path.extname(originalName)
  const filename = `${id}${extension}`
  const filePath = path.join(IMAGE_DIR, filename)

  // Save the file
  await writeFile(filePath, file)

  // Create metadata
  const imageMetadata: ImageMetadata = {
    id,
    filename,
    originalName,
    path: `${IMAGE_PUBLIC_PATH}/${filename}`,
    ...metadata,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  // Get existing images and add the new one
  const images = await getAllImages()
  images.push(imageMetadata)

  // Save updated metadata
  await saveImageMetadata(images)

  return imageMetadata
}

// Update image metadata
export async function updateImage(
  id: string,
  metadata: Partial<Omit<ImageMetadata, "id" | "filename" | "path">>,
): Promise<ImageMetadata | null> {
  const images = await getAllImages()
  const index = images.findIndex((img) => img.id === id)

  if (index === -1) {
    return null
  }

  // Update the image metadata
  images[index] = {
    ...images[index],
    ...metadata,
    updatedAt: Date.now(),
  }

  // Save updated metadata
  await saveImageMetadata(images)

  return images[index]
}

// Delete an image
export async function deleteImage(id: string): Promise<boolean> {
  const images = await getAllImages()
  const index = images.findIndex((img) => img.id === id)

  if (index === -1) {
    return false
  }

  const image = images[index]
  const filePath = path.join(IMAGE_DIR, image.filename)

  // Delete the file if it exists
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

  // Remove from metadata
  images.splice(index, 1)

  // Save updated metadata
  await saveImageMetadata(images)

  return true
}

// Get an image by ID
export async function getImageById(id: string): Promise<ImageMetadata | null> {
  const images = await getAllImages()
  return images.find((img) => img.id === id) || null
}
