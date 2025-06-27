"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2 } from "lucide-react";

/**
 * Define a default form object to compare against
 * and to initialize state.
 */
const DEFAULT_FORM = {
    name: "Olivia Rhye",
    email: "olivia@untitled.com",
    role: "Product Designer",
    country: "United States",
    timeZone: "PST",
    bio: "I'm a Product Designer, passionate about creating intuitive and impactful user experiences in the digital space.",
};

export default function UserDetailsPage() {
    // Form state
    const [form, setForm] = useState({ ...DEFAULT_FORM });
    // Keep track of the last "saved" version to compare changes
    const [savedForm, setSavedForm] = useState({ ...DEFAULT_FORM });

    // A helper to update a single field
    function handleChange<T extends keyof typeof form>(field: T, value: typeof form[T]) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    // Check if anything in the form differs from the saved version
    const isDirty = JSON.stringify(form) !== JSON.stringify(savedForm);

    // Handle Save
    function handleSave() {
        console.log("Saving changes:", form);
        // In a real app, you'd call an API to persist changes here
        // Then update the savedForm to the new values
        setSavedForm({ ...form });
    }

    // Handle Cancel (revert to last saved)
    function handleCancel() {
        setForm({ ...savedForm });
    }

    return (
        <main className="w-full relative">
            <h1 className="text-2xl font-semibold leading-7">Personal info</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                Update your photo and personal details here.
            </p>
            <Separator className="my-3" />

            {/* Card for the form */}
            <Card className=" border-none relative shadow-none p-0">
                <CardHeader className="p-0">
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                        Some info may be visible to other people.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 p-0">
                    {/* Profile Photo */}
                    <div>
                        <Label className="mb-2 block text-sm font-medium">
                            Your photo
                        </Label>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-neutral-200 border-2 shadow-2xl">
                                <AvatarImage
                                    src="https://github.com/placeholder.png"
                                    alt="User Avatar"
                                />
                                <AvatarFallback>OR</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" className="relative">
                                <Edit2 className="mr-2 h-4 w-4" />
                                Change
                                <input
                                    type="file"
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                    onChange={(e) =>
                                        console.log("Selected file:", e.target.files?.[0])
                                    }
                                />
                            </Button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="you@example.com"
                        />
                        <p className="text-xs text-muted-foreground">
                            This will be displayed on your profile.
                        </p>
                    </div>

                    {/* Role */}
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="role" className="text-sm font-medium">
                            Role
                        </Label>
                        <Input
                            id="role"
                            value={form.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            placeholder="e.g. Product Designer"
                        />
                    </div>

                    {/* Country */}
                    <div className="flex flex-col space-y-1">
                        <Label className="text-sm font-medium">Country</Label>

                        <Input
                            id="country"
                            value={form.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                            placeholder="e.g. Nigeria"
                        />
                    </div>

                    {/* Time Zone */}


                    {/* Bio / Introduction */}
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="bio" className="text-sm font-medium">
                            Bio
                        </Label>
                        <Textarea
                            id="bio"
                            value={form.bio}
                            onChange={(e) => handleChange("bio", e.target.value)}
                            placeholder="Write a short introduction..."
                        />
                        <p className="text-xs text-muted-foreground">
                            You can add a brief bio to introduce yourself.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Label className="text-sm font-medium">Delete account</Label>
                        <p className="text-xs text-muted-foreground">Permanently delete your account and all your portfolios and resume.</p>
                        <Button variant="destructive" className="w-fit mt-4 bg-red-600 text-white text-xs">
                            Delete account
                        </Button>
                    </div>
                </CardContent>

                {isDirty && <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-[250px] w-full mx-auto">
                    <div className="flex gap-4 justify-center items-center p-4  border border-neutral-200 rounded-xl shadow-lg backdrop-blur-sm bg-white/90">
                        <Button 
                            variant="ghost" 
                            onClick={handleCancel}
                            className=" hover:bg-neutral-100 transition-all duration-200 min-w-[100px]"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSave} 
                            disabled={!isDirty}
                            className="bg-teal-800 hover:bg-teal-700 text-white transition-all duration-200 min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Changes
                        </Button>
                    </div>
                    
                    {/* Optional: Add a subtle animation when changes are detected */}
                    {isDirty && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-neutral-200 text-gray-700 text-xs font-medium rounded-full animate-pulse">
                            Unsaved changes
                        </div>
                    )}
                </div>}
            </Card>
        </main>
    );
}
