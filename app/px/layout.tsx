// app/dashboard/layout.tsx
import { ReactNode } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Sidebar from "./components/sidebar"
import AuthHeader from "./components/authheader"

// Dark mode styling – adjust to your preference
export const metadata = {
  title: "Resfolio",
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        <AuthHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
