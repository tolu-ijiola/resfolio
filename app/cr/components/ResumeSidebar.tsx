"use client"

import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Settings, Trash, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Section {
  id: string
  label: string
  icon: React.ReactNode
  form: React.ReactNode
}

interface ResumeSidebarProps {
  sectionOrder: Section[]
  moveSection: (index: number, direction: "up" | "down") => void
  currentTheme?: string
  onThemeChange?: (theme: string) => void
}

const themes = [
  { id: "modern", name: "Modern" },
  { id: "minimalist", name: "Minimalist" },
  { id: "elegant", name: "Elegant" },
  { id: "executive", name: "Executive" }
]

export function ResumeSidebar({ 
  sectionOrder, 
  moveSection,
  currentTheme = "modern",
  onThemeChange = () => {}
}: ResumeSidebarProps) {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const [activeSection, setActiveSection] = React.useState<string | null>(null)
  const [localSectionOrder, setLocalSectionOrder] = React.useState(sectionOrder)

  React.useEffect(() => {
    setLocalSectionOrder(sectionOrder)
  }, [sectionOrder])

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const newOrder = [...localSectionOrder]
    if (direction === "up" && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
    } else if (direction === "down" && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    }
    setLocalSectionOrder(newOrder)
    console.log(newOrder);
    
    moveSection(index, direction)
  }

  return (
    <div className={cn(
      "relative flex h-full flex-col border-r bg-white transition-all duration-200",
      isExpanded ? "w-72" : "w-16"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-b-gray-300 px-4 bg-white">
        {isExpanded && <h2 className="text-lg font-semibold">Resume Editor</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-6 bg-white top-2 z-20 h-12 w-12 rounded-full border shadow-sm"
        >
          {isExpanded ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Sections */}
        {localSectionOrder.map((section) => (
          <div key={section.id} className="border-b p-1.5 border-b-gray-300">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      if (!isExpanded) {
                        setIsExpanded(true)
                        setTimeout(() => setActiveSection(section.id), 100)
                      } else {
                        setActiveSection(activeSection === section.id ? null : section.id)
                      }
                    }}
                    className={cn(
                      "flex w-full items-center gap-4 px-4 py-3 text-sm transition-colors",
                      activeSection === section.id ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 hover:text-gray-900",
                      !isExpanded && "justify-center px-3"
                    )}
                  >
                    <div className="w-5 h-5">{section.icon}</div>
                    {isExpanded && (
                      <>
                        <span className="font-medium">{section.label}</span>
                        <ChevronDown className={cn("ml-auto h-5 w-5 transition-transform", activeSection === section.id ? "rotate-180" : "")} />
                      </>
                    )}
                  </button>
                </TooltipTrigger>
                {!isExpanded && <TooltipContent side="right">{section.label}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>

            {/* Section Content */}
            {isExpanded && activeSection === section.id && (
              <div className="px-4 py-3 bg-white">
                {section.form}
              </div>
            )}
          </div>
        ))}

        {/* Settings */}
        <div className="border-b p-1.5 border-b-gray-300">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    if (!isExpanded) {
                      setIsExpanded(true)
                      setTimeout(() => setActiveSection("settings"), 100)
                    } else {
                      setActiveSection(activeSection === "settings" ? null : "settings")
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-4 px-4 py-3 text-sm transition-colors",
                    activeSection === "settings" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 hover:text-gray-900",
                    !isExpanded && "justify-center px-3"
                  )}
                >
                  <Settings className="h-5 w-5" />
                  {isExpanded && (
                    <>
                      <span className="font-medium">Settings</span>
                      <ChevronDown className={cn("ml-auto h-5 w-5 transition-transform", activeSection === "settings" ? "rotate-180" : "")} />
                    </>
                  )}
                </button>
              </TooltipTrigger>
              {!isExpanded && <TooltipContent side="right">Settings</TooltipContent>}
            </Tooltip>
          </TooltipProvider>

          {/* Settings Content */}
          {isExpanded && activeSection === "settings" && (
            <div className="px-4 py-3 bg-white">
              <div className="space-y-6">
                {/* Theme Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <h3 className="font-medium text-sm">Theme</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Select Theme</Label>
                      <Select
                        value={currentTheme}
                        onValueChange={onThemeChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme.id} value={theme.id}>
                              {theme.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Section Order */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Section Order</h3>
                  <div className="space-y-2">
                    {localSectionOrder.map((section, index) => (
                      <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5">{section.icon}</div>
                          <span className="text-sm font-medium">{section.label}</span>
                        </div>
                        {index > 0 && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoveSection(index, "up")}
                              disabled={index === 1}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoveSection(index, "down")}
                              disabled={index === localSectionOrder.length - 1}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 