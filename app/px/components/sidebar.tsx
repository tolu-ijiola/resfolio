// app/dashboard/components/Sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" // shadcn/ui utility for conditional classNames
import { Home, ImageIcon, VideoIcon, FileTextIcon, Plus, BarChart, File, Settings, CreditCard } from "lucide-react" // Example icons
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Sidebar() {
    const pathname = usePathname()

    const navItems = [
        { name: "Home", href: "/px/dashboard", icon: Home },
        { name: "Analytics", href: "/px/analytics", icon: BarChart },
        { name: "Resume", href: "/px/resume", icon: File },
        { name: "Billing", href: "/px/billing", icon: CreditCard },
    ]

    return (
        <div className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-neutral-200">
            {/* Logo / Branding */}
            <div className="flex h-18 items-center px-8 p-4 font-bold border-b border-slate-100">
            <Link href="/" className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="Resfolio Logo"
              width={120}
              height={32}
              priority
            />
          </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
                <nav className="space-y-2 p-4">
                    <Button asChild className="mb-4 bg-teal-800 text-white">
                        <Link href={'/new'}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create New
                        </Link>
                    </Button>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                        
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:shadow-inner font-medium transition-all duration-200",
                                    isActive 
                                        ? "bg-neutral-200 text-teal-800 border-b border-neutral-300 shadow-inner" 
                                        : "text-neutral-500 hover:bg-neutral-200 hover:text-teal-800"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 p-4">
                <Button variant={'destructive'} className=" w-full">
                    Logout
                </Button>
            </div>
        </div>
    )
}
