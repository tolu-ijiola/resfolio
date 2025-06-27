// app/dashboard/components/Header.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Greeting from "./greeting"

export default function AuthHeader() {

  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
      toast.success("Signed out successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out")
    }
  }
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
  
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
      {/* Search Bar or Title */}
      <div className="flex items-center gap-2">
        {<Greeting/>}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications, Settings, etc. can go here */}
        <DropdownMenu>
      <DropdownMenuTrigger className=" cursor-pointer focus-visible:ring-0 border-neutral-200 ring r" asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || "User"} />
                    <AvatarFallback>
                      {user?.user_metadata?.full_name
                        ? getInitials(user.user_metadata.full_name)
                        : user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50 bg-white border-neutral-200" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email?.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/px/profile">Profile</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/px/billing">Billing</Link>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/help">Help</Link>
            <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        
      </div>
    </header>
  )
}
