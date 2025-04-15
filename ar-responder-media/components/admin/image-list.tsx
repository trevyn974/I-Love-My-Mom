"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { deleteImage, updateImage } from "@/app/admin/actions"
import type { ImageMetadata } from "@/lib/image-storage"

interface ImageListProps {
  images: ImageMetadata[]
}

export default function ImageList({ images }: ImageListProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return
    }

    setLoading(id)
    setError(null)

    try {
      const result = await deleteImage(id)

      if (!result.success) {
        setError(result.error || "Failed to delete image")
      } else {
        router.refresh()
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  if (images.length === 0) {
    return <p className="text-gray-500 text-center py-8">No images found. Upload some images to get started.</p>
  }

  return (
    <div className="space-y-6">
      {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-gray-50 rounded-lg overflow-hidden shadow">
            <div className="relative aspect-[4/3]">
              <Image src={image.path || "/placeholder.svg"} alt={image.originalName} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <div
                  className={`text-xs font-medium px-2 py-1 rounded-full text-white ${
                    image.type === "police" ? "bg-[#002D72]" : image.type === "fire" ? "bg-[#E31837]" : "bg-black/70"
                  }`}
                >
                  {image.type === "police" ? "Police" : image.type === "fire" ? "Fire" : "NWA"}
                </div>
              </div>
              {image.isTop10 && (
                <div className="absolute top-2 left-2">
                  <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">Top 10</div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="text-sm text-gray-500 mb-2">
                <p>
                  <strong>Location:</strong> {image.location}
                </p>
                <p>
                  <strong>Date:</strong> {image.date}
                </p>
                <p>
                  <strong>Camera:</strong> {image.camera}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <EditImageDialog image={image} />

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image.id)}
                  disabled={loading === image.id}
                >
                  {loading === image.id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface EditImageDialogProps {
  image: ImageMetadata
}

function EditImageDialog({ image }: EditImageDialogProps) {
  const [type, setType] = useState<"police" | "fire" | "nwa">(image.type)
  const [isTop10, setIsTop10] = useState(image.isTop10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("id", image.id)
      formData.set("isTop10", isTop10.toString())

      const result = await updateImage(formData)

      if (result.success) {
        router.refresh()
        document.getElementById("close-dialog")?.click()
      } else {
        setError(result.error || "Failed to update image")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-type">Type</Label>
              <Select name="type" value={type} onValueChange={(value: "police" | "fire" | "nwa") => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="police">Police</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="nwa">NWA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input id="edit-location" name="location" type="text" required defaultValue={image.location} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-date">Date</Label>
              <Input id="edit-date" name="date" type="date" required defaultValue={image.date} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-camera">Camera</Label>
              <Input id="edit-camera" name="camera" type="text" required defaultValue={image.camera} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-isTop10"
                checked={isTop10}
                onCheckedChange={(checked) => setIsTop10(checked === true)}
              />
              <Label htmlFor="edit-isTop10">Featured in Top 10</Label>
            </div>
          </div>

          {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" id="close-dialog">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-[#002D72]" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
