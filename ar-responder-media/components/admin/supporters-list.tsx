"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import type { Supporter } from "@/types/supporters"

interface SupportersListProps {
  supporters: Supporter[]
}

export default function SupportersList({ supporters }: SupportersListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const router = useRouter()

  const handleAddSupporter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const name = formData.get("name") as string
    const username = formData.get("username") as string
    const isFeatured = formData.get("is_featured") === "on"

    try {
      const response = await fetch("/api/supporters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, is_featured: isFeatured }),
      })

      if (response.ok) {
        setIsAddDialogOpen(false)
        router.refresh()
      } else {
        console.error("Failed to add supporter")
      }
    } catch (error) {
      console.error("Error adding supporter:", error)
    }
  }

  const handleToggleFeatured = async (id: number, isFeatured: boolean) => {
    try {
      const response = await fetch(`/api/supporters/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_featured: !isFeatured }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        console.error("Failed to update supporter")
      }
    } catch (error) {
      console.error("Error updating supporter:", error)
    }
  }

  const handleDeleteSupporter = async (id: number) => {
    if (!confirm("Are you sure you want to delete this supporter?")) {
      return
    }

    try {
      const response = await fetch(`/api/supporters/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.refresh()
      } else {
        console.error("Failed to delete supporter")
      }
    } catch (error) {
      console.error("Error deleting supporter:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-muted-foreground">Total supporters: {supporters.length}</p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Supporter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Supporter</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSupporter} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="is_featured" name="is_featured" />
                <Label htmlFor="is_featured">Featured Supporter</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Supporter</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium bg-muted">
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Username</div>
          <div className="col-span-2">Featured</div>
          <div className="col-span-3">Actions</div>
        </div>

        <div className="divide-y">
          {supporters.map((supporter) => (
            <div key={supporter.id} className="grid grid-cols-12 gap-4 p-4 items-center">
              <div className="col-span-4">{supporter.name}</div>
              <div className="col-span-3">@{supporter.username}</div>
              <div className="col-span-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleFeatured(supporter.id, supporter.is_featured)}
                >
                  {supporter.is_featured ? "✓ Featured" : "Not Featured"}
                </Button>
              </div>
              <div className="col-span-3 flex space-x-2">
                <Button variant="destructive" size="sm" onClick={() => handleDeleteSupporter(supporter.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
