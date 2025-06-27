'use client'

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define resume section types
export type PersonalInfoSection = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  imageUrl?: string;
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location?: string;
  description?: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  bullets: string[];
};

export type SkillItem = {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Master";
};

export type SkillsSection = {
  categories: {
    id: string;
    name: string;
    skills: SkillItem[];
  }[];
};

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
};

export type CertificationItem = {
  id: string;
  name: string;
  organization: string;
  date: string;
  url?: string;
  description?: string;
};

export type LanguageItem = {
  id: string;
  language: string;
  proficiency: "Elementary" | "Limited" | "Professional" | "Full Professional" | "Native";
};

export type SummarySection = {
  summary: string;
};

export type ResumeData = {
  id: string;
  name: string;
  personalInfo: PersonalInfoSection;
  summary?: SummarySection;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillsSection;
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  languages?: LanguageItem[];
  customSections: {
    id: string;
    title: string;
    content: string;
  }[];
  template: string;
  createdAt: string;
  updatedAt: string;
};

export type TemplateData = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
};

// Initial empty resume
const emptyResume: ResumeData = {
  id: crypto.randomUUID(),
  name: "Untitled Resume",
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
  },
  summary: {
    summary: "",
  },
  experience: [],
  education: [],
  skills: {
    categories: []
  },
  projects: [],
  certifications: [],
  languages: [],
  customSections: [],
  template: "minimalist",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Resume template data
export const resumeTemplates: TemplateData[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean, simple design with a focus on content",
    thumbnail: "/lovable-uploads/2e2c95f0-949b-4aac-bde5-cf54aba80448.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with creative layout and styling",
    thumbnail: "/lovable-uploads/2e2c95f0-949b-4aac-bde5-cf54aba80448.png",
  },
  {
    id: "teal-elegant",
    name: "Teal Elegant",
    description: "Elegant teal-accented style with modern document feel",
    thumbnail: "/lovable-uploads/teal-elegant-placeholder.png",
  },
];

// Create the context
type ResumeContextType = {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonalInfo: (data: Partial<PersonalInfoSection>) => void;
  updateSummary: (data: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addExperienceBullet: (id: string) => void;
  updateExperienceBullet: (experienceId: string, index: number, content: string) => void;
  removeExperienceBullet: (experienceId: string, index: number) => void;
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, name: string) => void;
  removeSkillCategory: (id: string) => void;
  addSkill: (categoryId: string) => void;
  updateSkill: (categoryId: string, skillId: string, data: Partial<SkillItem>) => void;
  removeSkill: (categoryId: string, skillId: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addProjectBullet: (id: string) => void;
  updateProjectBullet: (projectId: string, index: number, content: string) => void;
  removeProjectBullet: (projectId: string, index: number) => void;
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  addCustomSection: () => void;
  updateCustomSection: (id: string, data: { title?: string; content?: string }) => void;
  removeCustomSection: (id: string) => void;
  setTemplate: (templateId: string) => void;
  saveResume: () => void;
  createNewResume: (templateId?: string) => void;
  getStoredResumes: () => ResumeData[];
  loadResume: (id: string) => void;
  exportPDF: () => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<ResumeData>(emptyResume);

  // Load the most recent resume from local storage on initial load
  useEffect(() => {
    const storedResumes = localStorage.getItem("editopia-resumes");
    if (storedResumes) {
      const resumes: ResumeData[] = JSON.parse(storedResumes);
      // Sort by updatedAt date to get the most recent
      if (resumes.length > 0) {
        const sortedResumes = resumes.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setResume(sortedResumes[0]);
      }
    }
  }, []);

  const updatePersonalInfo = (data: Partial<PersonalInfoSection>) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateSummary = (summary: string) => {
    setResume((prev) => ({
      ...prev,
      summary: { summary },
      updatedAt: new Date().toISOString(),
    }));
  };

  // Education section methods
  const addEducation = () => {
    const newEducation: EducationItem = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };

    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateEducation = (id: string, data: Partial<EducationItem>) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Experience section methods
  const addExperience = () => {
    const newExperience: ExperienceItem = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      bullets: [""],
    };

    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateExperience = (id: string, data: Partial<ExperienceItem>) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  };

  const addExperienceBullet = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id
          ? { ...item, bullets: [...item.bullets, ""] }
          : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateExperienceBullet = (experienceId: string, index: number, content: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === experienceId
          ? {
              ...item,
              bullets: item.bullets.map((bullet, i) =>
                i === index ? content : bullet
              ),
            }
          : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeExperienceBullet = (experienceId: string, index: number) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === experienceId
          ? {
              ...item,
              bullets: item.bullets.filter((_, i) => i !== index),
            }
          : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Skills section methods
  const addSkillCategory = () => {
    const newCategory = {
      id: crypto.randomUUID(),
      name: "New Category",
      skills: [],
    };

    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: [...prev.skills.categories, newCategory],
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateSkillCategory = (id: string, name: string) => {
    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: prev.skills.categories.map((category) =>
          category.id === id ? { ...category, name } : category
        ),
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeSkillCategory = (id: string) => {
    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: prev.skills.categories.filter((category) => category.id !== id),
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const addSkill = (categoryId: string) => {
    const newSkill: SkillItem = {
      id: crypto.randomUUID(),
      name: "",
      level: "Intermediate",
    };

    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: prev.skills.categories.map((category) =>
          category.id === categoryId
            ? { ...category, skills: [...category.skills, newSkill] }
            : category
        ),
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateSkill = (categoryId: string, skillId: string, data: Partial<SkillItem>) => {
    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: prev.skills.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                skills: category.skills.map((skill) =>
                  skill.id === skillId ? { ...skill, ...data } : skill
                ),
              }
            : category
        ),
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeSkill = (categoryId: string, skillId: string) => {
    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: prev.skills.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                skills: category.skills.filter((skill) => skill.id !== skillId),
              }
            : category
        ),
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  // Project section methods
  const addProject = () => {
    const newProject: ProjectItem = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    };

    setResume((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProject],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateProject = (id: string, data: Partial<ProjectItem>) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects?.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeProject = (id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects?.filter((item) => item.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  };

  const addProjectBullet = (id: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects?.map((item) =>
        item.id === id
          ? { ...item, bullets: [...item.bullets, ""] }
          : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateProjectBullet = (projectId: string, index: number, content: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects?.map((item) =>
        item.id === projectId
          ? {
              ...item,
              bullets: item.bullets.map((bullet, i) =>
                i === index ? content : bullet
              ),
            }
          : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeProjectBullet = (projectId: string, index: number) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects?.map((item) =>
        item.id === projectId
          ? {
              ...item,
              bullets: item.bullets.filter((_, i) => i !== index),
            }
          : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Certification section methods
  const addCertification = () => {
    const newCertification: CertificationItem = {
      id: crypto.randomUUID(),
      name: "",
      organization: "",
      date: "",
      url: "",
      description: "",
    };

    setResume((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCertification],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateCertification = (id: string, data: Partial<CertificationItem>) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications?.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeCertification = (id: string) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications?.filter((item) => item.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Language section methods
  const addLanguage = () => {
    const newLanguage: LanguageItem = {
      id: crypto.randomUUID(),
      language: "",
      proficiency: "Professional",
    };

    setResume((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), newLanguage],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateLanguage = (id: string, data: Partial<LanguageItem>) => {
    setResume((prev) => ({
      ...prev,
      languages: prev.languages?.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeLanguage = (id: string) => {
    setResume((prev) => ({
      ...prev,
      languages: prev.languages?.filter((item) => item.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Custom section methods
  const addCustomSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      title: "Custom Section",
      content: "",
    };

    setResume((prev) => ({
      ...prev,
      customSections: [...prev.customSections, newSection],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateCustomSection = (id: string, data: { title?: string; content?: string }) => {
    setResume((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === id ? { ...section, ...data } : section
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const removeCustomSection = (id: string) => {
    setResume((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((section) => section.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Template methods
  const setTemplate = (templateId: string) => {
    setResume((prev) => ({
      ...prev,
      template: templateId,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Storage methods
  const saveResume = () => {
    const updatedResume = {
      ...resume,
      updatedAt: new Date().toISOString(),
    };

    // Get existing resumes or initialize empty array
    const storedResumes = localStorage.getItem("editopia-resumes");
    let resumes: ResumeData[] = storedResumes ? JSON.parse(storedResumes) : [];

    // Check if we're updating an existing resume or adding a new one
    const existingIndex = resumes.findIndex((r) => r.id === resume.id);
    if (existingIndex !== -1) {
      resumes[existingIndex] = updatedResume;
    } else {
      resumes.push(updatedResume);
    }

    // Save back to localStorage
    localStorage.setItem("editopia-resumes", JSON.stringify(resumes));
    setResume(updatedResume);
    
    toast.success("Resume saved successfully");
    return updatedResume;
  };

  const getStoredResumes = () => {
    const storedResumes = localStorage.getItem("editopia-resumes");
    return storedResumes ? JSON.parse(storedResumes) : [];
  };

  const loadResume = (id: string) => {
    const resumes = getStoredResumes();
    const foundResume = resumes.find((r: ResumeData) => r.id === id);
    
    if (foundResume) {
      setResume(foundResume);
      toast.success("Resume loaded successfully");
    } else {
      toast.error("Resume not found");
    }
  };

  const createNewResume = (templateId?: string) => {
    const newResume = {
      ...emptyResume,
      id: crypto.randomUUID(),
      template: templateId || "minimalist",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setResume(newResume);
    saveResume();
    
    toast.success("New resume created");
    return newResume;
  };

  const exportPDF = () => {
    // Here we would handle PDF export
    // For now, we'll just use print functionality
    window.print();
    toast.success("Preparing resume for download");
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        updatePersonalInfo,
        updateSummary,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addExperienceBullet,
        updateExperienceBullet,
        removeExperienceBullet,
        addSkillCategory,
        updateSkillCategory,
        removeSkillCategory,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addProjectBullet,
        updateProjectBullet,
        removeProjectBullet,
        addCertification,
        updateCertification,
        removeCertification,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addCustomSection,
        updateCustomSection,
        removeCustomSection,
        setTemplate,
        saveResume,
        getStoredResumes,
        loadResume,
        createNewResume,
        exportPDF,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
