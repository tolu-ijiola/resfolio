'use client'

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Save,     
  Download,
  EyeIcon,
  Settings,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  BarChart3,
  Award,
  Globe,
  Plus,
  ChevronRight,
  ChevronLeft,
  Layers,
  X,
  ChevronUp,
  ChevronDown,
  Code,
  FolderGit2,
} from "lucide-react";
import EditorNavbar from "./components/EditorNavBar";
import { useResume, ResumeData } from "./components/ResumeContext";
import PersonalInfoForm from "./components/PersonalInfoForm";
import SummaryForm from "./components/SummaryForm";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import SkillsForm from "./components/SkillForm";
import ProjectsForm from "./components/ProjectsForm";
import CertificationsForm from "./components/CertificationsForm";
import LanguagesForm from "./components/LanguagesForm";
import CustomSectionForm from "./components/CustomForm";
import MinimalistTemplate from "./template/MinimalistTemplate";
import ModernTemplate from "./template/ModernTemplate";
import ElegantTemplate from "./template/ElegantTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResumeSidebar } from "./components/ResumeSidebar"
import ExecutiveTemplate from "./template/ExecutiveTemplate";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
  form: React.ReactNode;
}

type StyleSettings = {
  fontFamily: string;
  headerSize: string;
  imageShape: 'circle' | 'rounded' | 'square';
  imagePlacement: 'right' | 'left' | 'top';
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  lineHeight: 'normal' | 'relaxed' | 'loose' | 'tight';
  sectionSpacing: 'normal' | 'compact' | 'spacious';
  headerColor: string;
  accentColor: string;
  textColor: string;
};

const Editor = () => {
  const { templateId } = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  
  const {
    resume,
    saveResume,
    exportPDF,
    createNewResume,
    getStoredResumes,
    loadResume,
    setTemplate,
    setResume,
  } = useResume();

  const [activeAccordion, setActiveAccordion] = useState<string>("personal");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [previewMode, setPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  // Load template from URL parameter if provided
  useEffect(() => {
    if (templateId && typeof templateId === 'string') {
      setTemplate(templateId);
    }
  }, [templateId, setTemplate]);

  // Handle responsive sidebar
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const [styleSettings, setStyleSettings] = useState<StyleSettings>({
    fontFamily: 'Poppins',
    headerSize: '2xl',
    imageShape: 'circle',
    imagePlacement: 'right',
    fontSize: 'base',
    fontWeight: 'normal',
    lineHeight: 'normal',
    sectionSpacing: 'normal',
    headerColor: '#2563eb',
    accentColor: '#3b82f6',
    textColor: '#1f2937',
  });

  useEffect(() => {
    // Load the selected font family
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${styleSettings.fontFamily}:wght@400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [styleSettings.fontFamily]);

  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const renderTemplate = () => {
    switch (resume.template) {
      case "modern":
        return <ModernTemplate resume={resume} styleSettings={styleSettings} />;
      case "elegant":
        return <ElegantTemplate resume={resume} styleSettings={styleSettings} />;
      case "executive":
        return <ExecutiveTemplate resume={resume} styleSettings={styleSettings} />;
      case "minimalist":
      default:
        return <MinimalistTemplate resume={resume} styleSettings={styleSettings} />;
    }
  };

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      await saveResume();
      setSaveStatus('saved');
      toast.success("Resume saved successfully");
      
      // Reset status after 2 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      setSaveStatus('error');
      toast.error("Failed to save resume");
      
      // Reset error status after 2 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }
  };

  // Add effect to handle auto-save status
  useEffect(() => {
    if (saveStatus === 'saving') {
      const timer = setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => {
          setSaveStatus('idle');
        }, 2000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const handleExport = () => {
    setPreviewMode(true);
    toast.success("Preview mode enabled");
  };

  const [sectionOrder, setSectionOrder] = useState<Section[]>([
    {
      id: 'personal',
      label: 'Personal Info',
      icon: <User className="w-4 h-4" />,
      form: <PersonalInfoForm />
    },
    {
      id: 'summary',
      label: 'Summary',
      icon: <FileText className="w-4 h-4" />,
      form: <SummaryForm />
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: <Briefcase className="w-4 h-4" />,
      form: <ExperienceForm />
    },
    {
      id: 'education',
      label: 'Education',
      icon: <GraduationCap className="w-4 h-4" />,
      form: <EducationForm />
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <BarChart3 className="w-4 h-4" />,
      form: <SkillsForm />
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FolderGit2 className="w-4 h-4" />,
      form: <ProjectsForm />
    },
    {
      id: 'certifications',
      label: 'Certifications',
      icon: <Award className="w-4 h-4" />,
      form: <CertificationsForm />
    },
    {
      id: 'languages',
      label: 'Languages',
      icon: <Globe className="w-4 h-4" />,
      form: <LanguagesForm />
    }
  ]);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (index === 0) return; // Don't move personal info
    const newOrder = [...sectionOrder];
    if (direction === 'up' && index > 1) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    setSectionOrder(newOrder);
    
    // Update the resume sections order in the context
    const updatedResume = { ...resume };
    const sectionIds = newOrder.map(section => section.id);
    updatedResume.sections = sectionIds;
    setResume(updatedResume);
    
    // Save to localStorage
    localStorage.setItem('resumeSectionOrder', JSON.stringify(sectionIds));
    
    // Save the updated resume
    saveResume();
  };

  const [customSectionType, setCustomSectionType] = useState<'text' | 'list' | 'timeline' | 'grid'>('text');
  const [customSectionContent, setCustomSectionContent] = useState('');
  const [customSectionList, setCustomSectionList] = useState<string[]>([]);
  const [customSectionTimeline, setCustomSectionTimeline] = useState<Array<{ title: string; description: string; date: string }>>([]);
  const [customSectionGrid, setCustomSectionGrid] = useState<Array<{ title: string; description: string }>>([]);

  const addCustomSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      title: 'New Section',
      content: customSectionType === 'text' ? '' : JSON.stringify([]),
    };

    const updatedResume = { ...resume };
    updatedResume.customSections = [...(resume.customSections || []), newSection];
    setResume(updatedResume);
  };

  const templates = [
    {
      id: "minimalist",
      name: "Minimalist",
      preview: "/templates/minimalist-preview.png",
      description: "Clean and simple design"
    },
    {
      id: "modern",
      name: "Modern",
      preview: "/templates/modern-preview.png",
      description: "Contemporary style with emphasis on typography"
    },
    {
      id: "elegant",
      name: "Elegant",
      preview: "/templates/elegant-preview.png",
      description: "Professional with a touch of color"
    }
  ];

  const handleThemeChange = (theme: string) => {
    setTemplate(theme);
  };

  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0 flex-col h-screen bg-[#f6f8fb]">
      <EditorNavbar>
        {saveStatus === 'saving' && (
          <div className="flex items-center text-sm text-gray-600">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full"></div>
            Saving...
          </div>
        )}
        {saveStatus === 'saved' && (
          <div className="text-sm text-green-600">
            Saved
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="text-sm text-red-600">
            Save failed
          </div>
        )}
      </EditorNavbar>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ResumeSidebar 
          sectionOrder={sectionOrder} 
          moveSection={moveSection}
          currentTheme={resume.template}
          onThemeChange={handleThemeChange}
        />

        {/* Main Content + Right Sidebar */}
        <div className="flex-1 flex flex-row justify-center items-stretch overflow-hidden">
          {/* Resume Preview */}
          <div className="flex-1 flex justify-center items-center overflow-auto min-h-0">
            {showTemplateSelector ? (
              <div className="p-8 w-full max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
                <div className="grid grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        resume.template === template.id ? 'border-primary' : 'border-transparent hover:border-gray-200'
                      }`}
                      onClick={() => {
                        setTemplate(template.id);
                        setShowTemplateSelector(false);
                        setActiveAccordion("personal");
                      }}
                    >
                      <div className="aspect-[1/1.414] bg-white shadow-sm">
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : previewMode ? (
              <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-2xl p-4 max-w-4xl w-full mx-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Resume Preview</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewMode(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="overflow-auto max-h-[80vh]">
                    {renderTemplate()}
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gray-900/50 rounded-xl p-8 overflow-auto"
                style={{
                  width: '794px', // A4 width in px at 96dpi
                  height: '1123px', // A4 height in px at 96dpi
                  transform: 'scale(0.8)',
                  transformOrigin: 'top center',
                  maxHeight: 'calc(100vh - 200px)',
                }}
              >
                <div 
                  className="absolute inset-0 bg-white shadow-xl rounded-xl border border-gray-200 overflow-auto"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {renderTemplate()}
                </div>
              </motion.div>
            )}
          </div>
          {/* Right Sidebar for Style Controls */}
          <aside className="w-[320px] min-w-[320px] max-w-[320px] border-l border-gray-300 bg-white p-6 overflow-y-auto no-print flex flex-col">
            <div className="font-semibold text-base mb-4">Style & Layout</div>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-xs font-medium mb-1">Font Family</label>
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={styleSettings.fontFamily}
                  onChange={e => setStyleSettings(s => ({ ...s, fontFamily: e.target.value }))}
                >
                  <option value="Poppins">Poppins</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Lato">Lato</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Arial">Arial</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label className="block text-xs font-medium mb-1">Header Size</label>
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={styleSettings.headerSize}
                  onChange={e => setStyleSettings(s => ({ ...s, headerSize: e.target.value }))}
                >
                  <option value="xl">XL</option>
                  <option value="2xl">2XL</option>
                  <option value="3xl">3XL</option>
                  <option value="4xl">4XL</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="block text-xs font-medium mb-1">Image Shape</label>
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={styleSettings.imageShape}
                  onChange={e => setStyleSettings(s => ({ ...s, imageShape: e.target.value as "circle" | "rounded" | "square" }))}
                >
                  <option value="circle">Circle</option>
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label className="block text-xs font-medium mb-1">Image Placement</label>
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={styleSettings.imagePlacement}
                  onChange={e => setStyleSettings(s => ({ ...s, imagePlacement: e.target.value as "right" | "left" | "top" }))}
                >
                  <option value="right">Right</option>
                  <option value="left">Left</option>
                  <option value="top">Top</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label className="block text-xs font-medium mb-1">Font Size</label>
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={styleSettings.fontSize}
                  onChange={e => setStyleSettings(s => ({ ...s, fontSize: e.target.value as "sm" | "base" | "lg" | "xl" }))}
                >
                  <option value="sm">Small</option>
                  <option value="base">Base</option>
                  <option value="lg">Large</option>
                  <option value="xl">XL</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <label className="block text-xs font-medium mb-1">Font Weight</label>
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={styleSettings.fontWeight}
                  onChange={e => setStyleSettings(s => ({ ...s, fontWeight: e.target.value as "normal" | "medium" | "semibold" | "bold" }))}
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="semibold">Semi-bold</option>
                  <option value="bold">Bold</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <label className="block text-xs font-medium mb-1">Line Height</label>
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={styleSettings.lineHeight}
                  onChange={e => setStyleSettings(s => ({ ...s, lineHeight: e.target.value as "normal" | "relaxed" | "loose" | "tight" }))}
                >
                  <option value="normal">Normal</option>
                  <option value="relaxed">Relaxed</option>
                  <option value="loose">Loose</option>
                  <option value="tight">Tight</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <label className="block text-xs font-medium mb-1">Section Spacing</label>
                <select
                  className="w-full p-2 border rounded-md text-sm"
                  value={styleSettings.sectionSpacing}
                  onChange={e => setStyleSettings(s => ({ ...s, sectionSpacing: e.target.value as "normal" | "compact" | "spacious" }))}
                >
                  <option value="normal">Normal</option>
                  <option value="compact">Compact</option>
                  <option value="spacious">Spacious</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <label className="block text-xs font-medium mb-1">Header Color</label>
                <input
                  type="color"
                  value={styleSettings.headerColor}
                  onChange={e => setStyleSettings(s => ({ ...s, headerColor: e.target.value }))}
                  className="w-full h-8 rounded-md border border-gray-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                <label className="block text-xs font-medium mb-1">Accent Color</label>
                <input
                  type="color"
                  value={styleSettings.accentColor}
                  onChange={e => setStyleSettings(s => ({ ...s, accentColor: e.target.value }))}
                  className="w-full h-8 rounded-md border border-gray-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.0 }}
              >
                <label className="block text-xs font-medium mb-1">Text Color</label>
                <input
                  type="color"
                  value={styleSettings.textColor}
                  onChange={e => setStyleSettings(s => ({ ...s, textColor: e.target.value }))}
                  className="w-full h-8 rounded-md border border-gray-300"
                />
              </motion.div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="border-t border-gray-300 p-4 flex justify-between items-center bg-white no-print">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <EyeIcon className="mr-2 h-4 w-4" />
            {previewMode ? "Exit Preview" : "Preview"}
          </Button>
        </div>
        
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={handleSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          
          <Button size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
