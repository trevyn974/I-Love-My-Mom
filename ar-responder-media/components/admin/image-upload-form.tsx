"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { uploadImage } from "@/app/admin/actions"

export default function ImageUploadForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [type, setType] = useState<"police" | "fire" | "nwa">("police")
  const [isTop10, setIsTop10] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("isTop10", isTop10.toString())

      const result = await uploadImage(formData)

      if (result.success) {
        setSuccess("Image uploaded successfully!")
        e.currentTarget.reset()
        setType("police")
        setIsTop10(false)
        router.refresh()
      } else {
        setError(result.error || "Failed to upload image")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="file">Image File</Label>
          <Input id="file" name="file" type="file" accept="image/*" required className="w-full" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
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
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" type="text" required placeholder="e.g., Fayetteville, AR" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera">Camera</Label>
          <Input id="camera" name="camera" type="text" required placeholder="e.g., Canon R5" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="isTop10" checked={isTop10} onCheckedChange={(checked) => setIsTop10(checked === true)} />
          <Label htmlFor="isTop10">Featured in Top 10</Label>
        </div>
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

      {success && <div className="text-sm text-green-600 bg-green-50 p-2 rounded">{success}</div>}

      <Button type="submit" className="bg-[#002D72]" disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </Button>
    </form>
  )
}
