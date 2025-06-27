'use client'


import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useResume } from "./ResumeContext";
import { User, Mail, Phone, MapPin, Globe, Upload, Trash } from "lucide-react";

const PersonalInfoForm = () => {
  const { resume, updatePersonalInfo } = useResume();
  const { personalInfo } = resume;
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    personalInfo.imageUrl
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    // Create a URL for the image
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      setPreviewImage(imageUrl);
      updatePersonalInfo({ imageUrl });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage(undefined);
    updatePersonalInfo({ imageUrl: undefined });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">Personal Information</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Add your personal details to help employers contact you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image */}
        <div className="col-span-1 md:col-span-2 md:flex-row md:items-start gap-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} className="text-muted-foreground" />
              )}
            </div>
            
            {previewImage && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                onClick={removeImage}
              >
                <Trash size={16} />
              </Button>
            )}
          </div>
          
          <div className="space-y-2 mt-4">
            <p className="text-sm">
              Adding a professional photo.
            </p>
            
            <Button variant="outline" className="w-full" asChild>
              <label>
                <Upload className="mr-2 h-4 w-4" />
                {previewImage ? "Change Photo" : "Upload Photo"}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </Button>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <Input
              id="fullName"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="pl-10"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Job Title */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleInputChange}
            placeholder="Software Developer"
          />
        </div>

        {/* Email */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
              className="pl-10"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Input
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleInputChange}
              placeholder="+1 (123) 456-7890"
              className="pl-10"
            />
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <Input
              id="location"
              name="location"
              value={personalInfo.location}
              onChange={handleInputChange}
              placeholder="New York, NY"
              className="pl-10"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Website */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <div className="relative">
            <Input
              id="website"
              name="website"
              value={personalInfo.website || ""}
              onChange={handleInputChange}
              placeholder="www.johndoe.com"
              className="pl-10"
            />
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
