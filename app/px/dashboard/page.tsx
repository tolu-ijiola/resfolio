// app/dashboard/page.tsx
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Sparkles, PlusCircle } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"
import { TemplateChooserModal } from "./components/templateResume"

// Sample project data
const projects = [
  {
    id: "PRJ001",
    name: "Portfolio Website",
    description: "Personal portfolio website with React and Next.js",
    createdAt: new Date("2023-10-15"),
    status: "published"
  },
  {
    id: "PRJ002",
    name: "E-commerce Dashboard",
    description: "Admin dashboard for managing online store",
    createdAt: new Date("2023-11-02"),
    status: "draft"
  },
  {
    id: "PRJ003",
    name: "Mobile App UI",
    description: "UI design for fitness tracking application",
    createdAt: new Date("2023-11-20"),
    status: "published"
  },
  {
    id: "PRJ004",
    name: "Blog Redesign",
    description: "Redesigning personal blog with modern aesthetics",
    createdAt: new Date("2023-12-05"),
    status: "draft"
  }
]

export default function DashboardPage() {

  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [currentTab, setCurrentTab] = useState("all")

  useEffect(() => {
    if (currentTab === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.status === currentTab))
    }
  }, [currentTab])

  const handleTabChange = (value: string) => {
    setCurrentTab(value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hey, what would you create today?👋</h1>
        <p className="text-sm text-neutral-500 mb-4">Get started by choosing what you want to create.</p>
      </div>
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="bg-neutral-200 shadow-inner border h-12 border-neutral-300 rounded-lg">
          <TabsTrigger
            value="portfolio"
            className="data-[state=active]:bg-teal-800 cursor-pointer data-[state=active]:text-white px-8 h-10"
          >
            Portfolio Website
          </TabsTrigger>
          <TabsTrigger
            value="resume"
            className="data-[state=active]:bg-teal-800 cursor-pointer data-[state=active]:text-white px-8 h-10"
          >
            Resume
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="mt-6">
          <div className="grid gap-4  md:grid-cols-2">
            <div className="rounded-lg border bg-white border-neutral-200 p-6 shadow-inner">
              <h3 className="text-lg font-medium mb-2">Create Portfolio Website</h3>
              <p className="text-sm text-neutral-500 mb-4">
                Build your professional portfolio website from your resume or start from scratch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TemplateChooserModal/>
                <Button variant="outline" className="text-xs border-neutral-300">
                  Start from scratch
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-white border-neutral-200 p-6 shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">AI Portfolio Generator</h3>
                <span className="text-xs bg-teal-800/20 text-teal-800 px-2 py-1 rounded-full font-medium">
                  BETA
                </span>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Let AI generate a professional portfolio website based on your experience and preferences.
              </p>
              <Button className="bg-gradient-to-r px-4 text-white text-xs from-teal-800 to-green-600 hover:opacity-90">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate with AI
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resume" className="mt-6">
          <div className="grid gap-4  md:grid-cols-2">
            <div className="rounded-lg border bg-white border-neutral-200 p-6 shadow-inner">
              <h3 className="text-lg font-medium mb-2">Create Resume</h3>
              <p className="text-sm text-neutral-500 mb-4">
                Build your professional resume by uploading your existing resume or creating a new one from scratch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-teal-800 text-xs text-white hover:bg-teal-700">
                  Upload Resume
                </Button>
                <Button variant="outline" className="text-xs border-neutral-300">
                  Start from scratch
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-white border-neutral-200 p-6 shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">AI Resume Generator</h3>
                <span className="text-xs bg-teal-800/20 text-teal-800 px-2 py-1 rounded-full font-medium">
                  BETA
                </span>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Let AI generate a professional resume based on your skills and experience.
              </p>
              <Button className="bg-gradient-to-r px-4 text-white text-xs from-teal-800 to-green-600 hover:opacity-90">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate with AI
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button className="bg-teal-800 text-white hover:bg-teal-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="border-b border-neutral-300">
          <TabsList className="h-10 cursor-pointer bg-transparent w-[400px] justify-start gap-4">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-teal-800 data-[state=active]:border-b-2 data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-teal-800 rounded-none px-2 py-0 h-10"
            >
              All Projects
            </TabsTrigger>
            <TabsTrigger 
              value="draft" 
              className="data-[state=active]:bg-transparent cursor-pointer data-[state=active]:text-teal-800 data-[state=active]:border-b-2 data-[state=active]:border-teal-800 data-[state=active]:border-x-0 data-[state=active]:border-t-0 rounded-none px-2 py-0 h-10"
            >
              Drafts
            </TabsTrigger>
            <TabsTrigger 
              value="published" 
              className="data-[state=active]:bg-transparent cursor-pointer data-[state=active]:text-teal-800 data-[state=active]:border-b-2 data-[state=active]:border-teal-800 rounded-none px-2 data-[state=active]:border-x-0 data-[state=active]:border-t-0 py-0 h-10"
            >
              Published
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="mt-6">
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableCaption className="mt-4">
                {currentTab === "all" ? "All projects" : 
                 currentTab === "draft" ? "Draft projects" : "Published projects"} 
                ({filteredProjects.length})
              </TableCaption>
              <TableHeader className="bg-neutral-200 ">
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="hidden sm:table-cell w-[150px]">Created</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[60px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-neutral-500">
                      No projects found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="max-w-xs truncate">{project.description}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {formatDistanceToNow(project.createdAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={project.status === "published" ? "default" : "secondary"}
                          className={project.status === "published" ? "bg-slate-200 hover:bg-slate-300" : ""}
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className=" bg-white border-neutral-200">
                            <DropdownMenuItem className="flex items-center cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center cursor-pointer">
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-red-600 cursor-pointer">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Tabs>
    </div>
    </div>
  )
}
