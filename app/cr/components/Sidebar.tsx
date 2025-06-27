"use client"

import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// This would be your section type
interface Section {
  id: string
  label: string
  icon: React.ReactNode
  form: React.ReactNode
}

interface ResumeSidebarProps {
  sectionOrder: Section[]
  moveSection: (index: number, direction: "up" | "down") => void
}

export function ResumeSidebar({ sectionOrder, moveSection }: ResumeSidebarProps) {
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>(null)

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex items-center justify-between border-b p-4">
          <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-semibold">Resume Editor</h2>
          </SidebarGroupContent>
          <CustomSidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          {/* Sections */}
          {sectionOrder.map((section, index) => (
            <SidebarGroup key={section.id}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SectionButton
                    section={section}
                    isActive={activeAccordion === section.id}
                    onClick={() => setActiveAccordion(activeAccordion === section.id ? null : section.id)}
                  />
                </SidebarMenuItem>
              </SidebarMenu>
              {activeAccordion === section.id && (
                <SidebarGroupContent className="px-4 py-2">{section.form}</SidebarGroupContent>
              )}
            </SidebarGroup>
          ))}

          {/* Settings */}
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SectionButton
                  section={{
                    id: "settings",
                    label: "Settings",
                    icon: <Settings className="h-4 w-4" />,
                    form: null,
                  }}
                  isActive={activeAccordion === "settings"}
                  onClick={() => setActiveAccordion(activeAccordion === "settings" ? null : "settings")}
                />
              </SidebarMenuItem>
            </SidebarMenu>
            {activeAccordion === "settings" && (
              <SidebarGroupContent className="px-4 py-2">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Section Order</h3>
                  <div className="space-y-2">
                    {sectionOrder.map((section, index) => (
                      <div key={section.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center">
                          {section.icon}
                          <span className="ml-2 text-sm">{section.label}</span>
                        </div>
                        {index > 0 && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSection(index, "up")}
                              disabled={index === 1}
                              className="h-7 w-7 p-0"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSection(index, "down")}
                              disabled={index === sectionOrder.length - 1}
                              className="h-7 w-7 p-0"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}

// Section button component with proper context usage
function SectionButton({
  section,
  isActive,
  onClick,
}: {
  section: Section | { id: string; label: string; icon: React.ReactNode; form: React.ReactNode | null }
  isActive: boolean
  onClick: () => void
}) {
  const { state, setOpen } = useSidebar()
  const isCollapsed = state === "collapsed"

  const handleClick = () => {
    if (isCollapsed) {
      // If sidebar is collapsed, expand it first
      setOpen(true)
      // Then trigger the onClick callback
      setTimeout(onClick, 100)
    } else {
      // If sidebar is already expanded, just toggle
      onClick()
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton isActive={isActive} onClick={handleClick} className="group" tooltip={section.label}>
            {section.icon}
            <span>{section.label}</span>
            {!isCollapsed && (
              <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", isActive ? "rotate-180" : "")} />
            )}
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent side="right">{section.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Custom sidebar trigger that protrudes from the sidebar
function CustomSidebarTrigger() {
  const { state, toggleSidebar } = useSidebar()
  const isExpanded = state === "expanded"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleSidebar}
      className="absolute -right-3 top-4 z-20 h-6 w-6 rounded-full border shadow-sm"
    >
      {isExpanded ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      <span className="sr-only">{isExpanded ? "Collapse sidebar" : "Expand sidebar"}</span>
    </Button>
  )
}
