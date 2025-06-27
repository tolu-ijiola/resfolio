'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDistanceToNow } from 'date-fns'
import { Eye, MoreHorizontal, Pencil, PlusIcon, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

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

function page() {

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
        <div>
            <div className=' flex justify-between items-center'>
                <div>
                    <h1 className=' text-2xl font-bold'>Resume</h1>
                    <p className=' text-sm text-muted-foreground'>Create a new resume for your website or to apply for jobs</p>
                </div>
                <Button >
                    <PlusIcon className=' h-4 w-4' />
                    New Resume
                </Button>
            </div>
            <div className=' mt-4 space-y-4'>
                <div className=' grid h-[240px] p-4 rounded-xl grid-cols-1 md:grid-cols-2 bg-neutral-100 lg:grid-cols-4 gap-4'>
                    <Card className=' bg-white cursor-pointer p-1 h-full flex justify-center items-center rounded-xl border-neutral-300'>
                        <div className=' text-center h-fit '>
                            <PlusIcon className=' p-2 bg-teal-50/50 rounded-full  h-8 w-8 mx-auto' />
                            <p className=' text-sm text-muted-foreground'>New Resume</p>
                        </div>
                    </Card>

                </div>
            </div>
            <div className="flex flex-col mt-8 sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">My Resume</h1>

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
                            All
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

                <div className="mt-4">
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
    )
}

export default page