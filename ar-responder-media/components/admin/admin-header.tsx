"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/admin/actions"
import { LogOut, Home, Bell, Settings, User, Search, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

export default function AdminHeader() {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <header className="bg-[#002D72] text-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard" className="text-xl font-bold flex items-center gap-2">
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded-full bg-[#002D72]"></div>
              <div className="absolute inset-1 rounded-full bg-[#E31837]"></div>
              <div className="absolute inset-2 rounded-full bg-white"></div>
              <div className="absolute inset-3 rounded-full bg-[#002D72]"></div>
            </div>
            <span className="hidden sm:inline">AR Responder Media</span>
            <span className="sm:hidden">Admin</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div
          className={`absolute left-0 right-0 top-0 bottom-0 bg-[#002D72] flex items-center px-4 transition-all duration-300 ${
            searchOpen ? "opacity-100 z-20" : "opacity-0 -z-10"
          }`}
        >
          <Input
            placeholder="Search..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
            autoFocus={searchOpen}
          />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 text-white hover:bg-white/10"
            onClick={() => setSearchOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <Link href="/" target="_blank">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Home className="h-5 w-5" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#E31837] text-white">A</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
