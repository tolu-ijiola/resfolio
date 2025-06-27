import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Check, Plus, Minus, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePortfolio } from "@/lib/portfolio-context";
import NavigationEditor from "./NavigationEditor";
import ColorPicker from "./ColorPicker";
import { DeviceType, ExperienceItem, EducationItem, SkillItem, ProjectItem, TestimonialItem } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import the form components
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillForm from "./forms/SkillForm";
import ProjectForm from "./forms/ProjectForm";
import TestimonialForm from "./forms/TestimonialForm";

const Sidebar: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const { portfolioData, editorSettings } = state;

  // Form visibility state
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);

  const handleSidebarTabChange = (value: string) => {
    dispatch({ type: "SET_ACTIVE_SIDEBAR_TAB", payload: value });
  };

  const handleSectionChange = (value: string) => {
    dispatch({ type: "SET_ACTIVE_SECTION", payload: value });
  };

  const handleThemeChange = (field: keyof ThemeSettings, value: string) => {
    dispatch({
      type: "UPDATE_THEME_SETTINGS",
      payload: { [field]: value }
    });
  };

  const handleNavigationChange = (field: keyof Navigation, value: any) => {
    dispatch({
      type: "UPDATE_NAVIGATION",
      payload: {
        ...portfolioData.navigation,
        [field]: value,
        links: portfolioData.navigation?.links || []
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("personalInfo.")) {
      const field = name.replace("personalInfo.", "");
      dispatch({
        type: "UPDATE_PERSONAL_INFO",
        payload: { [field]: value }
      });
    } else if (name.startsWith("contactInfo.")) {
      const field = name.replace("contactInfo.", "");
      dispatch({
        type: "UPDATE_PERSONAL_INFO",
        payload: { 
          contactInfo: { 
            ...portfolioData.personalInfo.contactInfo, 
            [field]: value 
          } 
        }
      });
    } else if (name.startsWith("themeSettings.")) {
      const field = name.replace("themeSettings.", "");
      dispatch({
        type: "UPDATE_THEME_SETTINGS",
        payload: { [field]: value }
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "avatar") {
          dispatch({
            type: "UPDATE_PERSONAL_INFO",
            payload: { avatar: reader.result as string }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpacingChange = (name: string, value: number | number[]) => {
    const numValue = Array.isArray(value) ? value[0] : value;
    dispatch({
      type: "UPDATE_THEME_SETTINGS",
      payload: { [name]: `${numValue}px` }
    });
  };

  const handleFontSizeChange = (value: number | number[]) => {
    const numValue = Array.isArray(value) ? value[0] : value;
    dispatch({
      type: "UPDATE_THEME_SETTINGS",
      payload: { baseFontSize: `${numValue}px` }
    });
  };

  const handlePageChange = (pageId: string) => {
    dispatch({ type: "SET_ACTIVE_PAGE", payload: pageId });
  };

  return (
    <div className="h-screen w-72 border-r text-sm bg-white overflow-y-auto flex flex-col">
      
      <Tabs 
        defaultValue="global" 
        value={editorSettings.activeSidebarTab}
        onValueChange={handleSidebarTabChange}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-3 m-4">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="global" className="flex-1 p-4 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Header Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Layout</Label>
                <Select
                  value={portfolioData.navigation?.layout || "left"}
                  onValueChange={(value) => handleNavigationChange("layout", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="split">Split</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Display Mode</Label>
                <Select
                  value={portfolioData.navigation?.displayMode || "text+logo"}
                  onValueChange={(value) => handleNavigationChange("displayMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select display mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text Only</SelectItem>
                    <SelectItem value="logo">Logo Only</SelectItem>
                    <SelectItem value="text+logo">Text + Logo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={portfolioData.navigation?.title || portfolioData.personalInfo.fullName}
                  onChange={(e) => handleNavigationChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Visible Pages</Label>
                <div className="space-y-2">
                  {portfolioData.pages?.map((page) => (
                    <div key={page.id} className="flex items-center space-x-2">
                      <Switch
                        checked={!page.hidden}
                        onCheckedChange={(checked) => {
                          dispatch({
                            type: "UPDATE_PAGE",
                            payload: {
                              id: page.id,
                              data: { hidden: !checked }
                            }
                          });
                        }}
                      />
                      <Label>{page.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Footer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Copyright Text</Label>
                <Input
                  value={portfolioData.footer?.copyright || `© ${new Date().getFullYear()} ${portfolioData.personalInfo.fullName}. All rights reserved.`}
                  onChange={(e) => dispatch({
                    type: "UPDATE_FOOTER",
                    payload: { copyright: e.target.value }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="theme" className="flex-1 p-4 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <Select
                  value={portfolioData.themeSettings.colorScheme}
                  onValueChange={(value) => handleThemeChange("colorScheme", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={portfolioData.themeSettings.primaryColor}
                    onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    type="text"
                    value={portfolioData.themeSettings.primaryColor}
                    onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={portfolioData.themeSettings.accentColor}
                    onChange={(e) => handleThemeChange("accentColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    type="text"
                    value={portfolioData.themeSettings.accentColor}
                    onChange={(e) => handleThemeChange("accentColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={portfolioData.themeSettings.backgroundColor}
                    onChange={(e) => handleThemeChange("backgroundColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    type="text"
                    value={portfolioData.themeSettings.backgroundColor}
                    onChange={(e) => handleThemeChange("backgroundColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={portfolioData.themeSettings.textColor}
                    onChange={(e) => handleThemeChange("textColor", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    type="text"
                    value={portfolioData.themeSettings.textColor}
                    onChange={(e) => handleThemeChange("textColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Font</Label>
                <Select
                  value={portfolioData.themeSettings.fontPrimary}
                  onValueChange={(value) => handleThemeChange("fontPrimary", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Border Radius</Label>
                <Input
                  value={portfolioData.themeSettings.borderRadius}
                  onChange={(e) => handleThemeChange("borderRadius", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="flex-1 p-4 space-y-4 overflow-y-auto">
          <Accordion 
            type="single" 
            collapsible 
            defaultValue="personal"
            value={editorSettings.activeSection}
            onValueChange={handleSectionChange}
          >
            <AccordionItem value="personal">
              <AccordionTrigger className="text-md font-medium">Personal Information</AccordionTrigger>
              <AccordionContent className="space-y-3 border-t py-6">
                <div>
                  <Label htmlFor="personalInfo.fullName">Full Name</Label>
                  <Input
                    id="personalInfo.fullName"
                    name="personalInfo.fullName"
                    value={portfolioData.personalInfo.fullName}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="personalInfo.title">Professional Title</Label>
                  <Input
                    id="personalInfo.title"
                    name="personalInfo.title"
                    value={portfolioData.personalInfo.title}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="personalInfo.bio">Bio</Label>
                  <Textarea
                    id="personalInfo.bio"
                    name="personalInfo.bio"
                    value={portfolioData.personalInfo.bio}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center mt-1 space-x-2">
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "avatar")}
                      className="flex-1"
                    />
                    {portfolioData.personalInfo.avatar && (
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={portfolioData.personalInfo.avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="my-2" />
                
                <div>
                  <Label htmlFor="contactInfo.email">Email</Label>
                  <Input
                    id="contactInfo.email"
                    name="contactInfo.email"
                    value={portfolioData.personalInfo.contactInfo.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactInfo.phone">Phone</Label>
                  <Input
                    id="contactInfo.phone"
                    name="contactInfo.phone"
                    value={portfolioData.personalInfo.contactInfo.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactInfo.location">Location</Label>
                  <Input
                    id="contactInfo.location"
                    name="contactInfo.location"
                    value={portfolioData.personalInfo.contactInfo.location}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactInfo.linkedin">LinkedIn</Label>
                  <Input
                    id="contactInfo.linkedin"
                    name="contactInfo.linkedin"
                    value={portfolioData.personalInfo.contactInfo.linkedin}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactInfo.github">GitHub</Label>
                  <Input
                    id="contactInfo.github"
                    name="contactInfo.github"
                    value={portfolioData.personalInfo.contactInfo.github}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactInfo.website">Website</Label>
                  <Input
                    id="contactInfo.website"
                    name="contactInfo.website"
                    value={portfolioData.personalInfo.contactInfo.website}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="navigation">
              <AccordionTrigger className="text-md font-medium">Navigation</AccordionTrigger>
              <AccordionContent className="space-y-3 border-t py-6">
                <NavigationEditor />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="experience">
              <AccordionTrigger className="text-md font-medium">Experience</AccordionTrigger>
              <AccordionContent className="border-t py-6">
                {portfolioData.experience.map((exp) => (
                  <div key={exp.id} className="mb-4 pb-4 border-b border-border/50 last:border-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{exp.position} at {exp.company}</h4>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => dispatch({ type: "REMOVE_EXPERIENCE", payload: exp.id })}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                ))}
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="w-full" onClick={() => setShowExperienceForm(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Experience
                  </Button>
                </div>
                
                <ExperienceForm open={showExperienceForm} onClose={() => setShowExperienceForm(false)} />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="education">
              <AccordionTrigger className="text-md font-medium">Education</AccordionTrigger>
              <AccordionContent>
                {portfolioData.education.map((edu) => (
                  <div key={edu.id} className="mb-4 pb-4 border-b border-border/50 last:border-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => dispatch({ type: "REMOVE_EDUCATION", payload: edu.id })}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="w-full" onClick={() => setShowEducationForm(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Education
                  </Button>
                </div>
                
                <EducationForm open={showEducationForm} onClose={() => setShowEducationForm(false)} />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="skills">
              <AccordionTrigger className="text-md font-medium">Skills</AccordionTrigger>
              <AccordionContent>
                {portfolioData.skills.map((skill) => (
                  <div key={skill.id} className="mb-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-xs text-muted-foreground">{skill.category} • Level {skill.level}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => dispatch({ type: "REMOVE_SKILL", payload: skill.id })}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="w-full" onClick={() => setShowSkillForm(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Skill
                  </Button>
                </div>
                
                <SkillForm open={showSkillForm} onClose={() => setShowSkillForm(false)} />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="projects">
              <AccordionTrigger className="text-md font-medium">Projects</AccordionTrigger>
              <AccordionContent>
                {portfolioData.projects.map((project) => (
                  <div key={project.id} className="mb-4 pb-4 border-b border-border/50 last:border-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{project.title}</h4>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => dispatch({ type: "REMOVE_PROJECT", payload: project.id })}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-accent rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="w-full" onClick={() => setShowProjectForm(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Project
                  </Button>
                </div>
                
                <ProjectForm open={showProjectForm} onClose={() => setShowProjectForm(false)} />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="testimonials">
              <AccordionTrigger className="text-md font-medium">Testimonials</AccordionTrigger>
              <AccordionContent>
                {portfolioData.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="mb-4 pb-4 border-b border-border/50 last:border-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{testimonial.author}</h4>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => dispatch({ type: "REMOVE_TESTIMONIAL", payload: testimonial.id })}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs">{testimonial.position} at {testimonial.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">"{testimonial.text}"</p>
                    <div className="flex mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className={`text-xs ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="w-full" onClick={() => setShowTestimonialForm(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Testimonial
                  </Button>
                </div>
                
                <TestimonialForm open={showTestimonialForm} onClose={() => setShowTestimonialForm(false)} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 border-t mt-auto">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">Preview</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
