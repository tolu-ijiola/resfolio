'use client'

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

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
  sections: string[];
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
  sections: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
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
];

const defaultResumeData: ResumeData = {
  id: crypto.randomUUID(),
  name: "Professional Resume",
  personalInfo: {
    fullName: "John Doe",
    jobTitle: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "johndoe.dev",
    imageUrl: undefined
  },
  summary: {
    summary: "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and mentoring junior developers."
  },
  experience: [
    {
      id: "1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2021-01",
      endDate: "Present",
      description: "Led development of microservices architecture serving 1M+ users. Mentored 5 junior developers and improved team velocity by 40%.",
      bullets: [
        "Architected and implemented scalable backend services using Node.js and AWS",
        "Reduced API response time by 60% through optimization and caching",
        "Implemented CI/CD pipelines reducing deployment time by 70%"
      ]
    },
    {
      id: "2",
      company: "Startup Inc",
      position: "Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2019-03",
      endDate: "2020-12",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with design team to implement responsive UIs.",
      bullets: [
        "Built real-time collaboration features using WebSocket and Redis",
        "Improved application performance by 50% through code optimization",
        "Implemented automated testing increasing coverage to 85%"
      ]
    }
  ],
  education: [
    {
      id: "1",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      fieldOfStudy: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2015-09",
      endDate: "2019-05",
      description: "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems."
    }
  ],
  skills: {
    categories: [
      {
        id: "1",
        name: "Programming Languages",
        skills: [
          { id: "1", name: "JavaScript", level: "Expert" },
          { id: "2", name: "TypeScript", level: "Expert" },
          { id: "3", name: "Python", level: "Advanced" },
          { id: "4", name: "Java", level: "Advanced" },
          { id: "5", name: "SQL", level: "Advanced" }
        ]
      },
      {
        id: "2",
        name: "Frontend",
        skills: [
          { id: "6", name: "React", level: "Expert" },
          { id: "7", name: "Next.js", level: "Expert" },
          { id: "8", name: "Vue.js", level: "Advanced" },
          { id: "9", name: "HTML5", level: "Expert" },
          { id: "10", name: "CSS3", level: "Expert" },
          { id: "11", name: "Tailwind CSS", level: "Expert" }
        ]
      },
      {
        id: "3",
        name: "Backend",
        skills: [
          { id: "12", name: "Node.js", level: "Expert" },
          { id: "13", name: "Express", level: "Expert" },
          { id: "14", name: "Django", level: "Advanced" },
          { id: "15", name: "GraphQL", level: "Advanced" },
          { id: "16", name: "REST APIs", level: "Expert" }
        ]
      },
      {
        id: "4",
        name: "DevOps & Tools",
        skills: [
          { id: "17", name: "Docker", level: "Advanced" },
          { id: "18", name: "Kubernetes", level: "Advanced" },
          { id: "19", name: "AWS", level: "Advanced" },
          { id: "20", name: "Git", level: "Expert" },
          { id: "21", name: "CI/CD", level: "Advanced" },
          { id: "22", name: "Jest", level: "Advanced" }
        ]
      }
    ]
  },
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with real-time inventory management",
      url: "github.com/johndoe/ecommerce",
      bullets: [
        "Implemented real-time inventory tracking system",
        "Integrated payment processing with Stripe",
        "Achieved 99.9% uptime through robust error handling"
      ]
    },
    {
      id: "2",
      name: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates",
      url: "github.com/johndoe/taskmanager",
      bullets: [
        "Built real-time collaboration features",
        "Implemented drag-and-drop interface",
        "Added offline support with service workers"
      ]
    }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      organization: "Amazon Web Services",
      date: "2022-06",
      url: "aws.amazon.com/certification"
    },
    {
      id: "2",
      name: "Professional Scrum Master I",
      organization: "Scrum.org",
      date: "2021-03",
      url: "scrum.org"
    }
  ],
  languages: [
    {
      id: "1",
      language: "English",
      proficiency: "Native"
    },
    {
      id: "2",
      language: "Spanish",
      proficiency: "Professional"
    }
  ],
  customSections: [],
  template: "modern",
  sections: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

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
  const { user } = useAuth();

  // Load the most recent resume from Supabase on initial load
  useEffect(() => {
    const loadResumeFromSupabase = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("resumes")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        if (data) {
          setResume(data.content as ResumeData);
        }
      } catch (error) {
        console.error("Error loading resume:", error);
        toast.error("Failed to load resume");
      }
    };

    loadResumeFromSupabase();
  }, [user]);

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
    setResume(prev => ({
      ...prev,
      template: templateId,
      updatedAt: new Date().toISOString()
    }));
  };

  // Storage methods
  const saveResume = async () => {
    if (!user) {
      toast.error("Please sign in to save your resume");
      return;
    }

    const updatedResume = {
      ...resume,
      updatedAt: new Date().toISOString(),
    };

    try {
      // If no path exists, create a new resume
      if (!resume.id) {
        const { data, error } = await supabase
          .from("resumes")
          .insert({
            user_id: user.id,
            title: resume.name || "Untitled Resume",
            template: resume.template,
            content: updatedResume,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) throw error;

        // Update the resume with the new ID and path
        setResume(prev => ({
          ...prev,
          id: data.id,
          updatedAt: data.updated_at
        }));

        // Update the URL with the new path
        window.history.replaceState({}, '', `/cr/${data.id}`);
      } else {
        // Update existing resume
        const { error } = await supabase
          .from("resumes")
          .update({
            title: resume.name || "Untitled Resume",
            template: resume.template,
            content: updatedResume,
            updated_at: new Date().toISOString(),
          })
          .eq("id", resume.id)
          .eq("user_id", user.id);

        if (error) throw error;
      }

      setResume(updatedResume);
      return updatedResume;
    } catch (error: any) {
      throw error;
    }
  };

  // Add auto-save functionality
  useEffect(() => {
    if (!user || !resume.id) return;

    // Only auto-save if there are actual changes
    const hasChanges = resume.updatedAt !== new Date().toISOString();
    if (!hasChanges) return;

    const autoSaveTimeout = setTimeout(() => {
      saveResume().catch(error => {
        console.error("Auto-save failed:", error);
      });
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(autoSaveTimeout);
  }, [resume, user]);

  const getStoredResumes = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data.map(item => item.content as ResumeData);
    } catch (error) {
      console.error("Error loading resumes:", error);
      toast.error("Failed to load resumes");
      return [];
    }
  };

  const loadResume = async (id: string) => {
    if (!user) {
      toast.error("Please sign in to load resumes");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      if (data) {
        setResume(data.content as ResumeData);
        toast.success("Resume loaded successfully");
      } else {
        toast.error("Resume not found");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load resume");
    }
  };

  const createNewResume = async (templateId?: string) => {
    if (!user) {
      toast.error("Please sign in to create a resume");
      return;
    }

    const newResume = {
      ...emptyResume,
      id: crypto.randomUUID(),
      template: templateId || "minimalist",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from("resumes")
        .insert({
          id: newResume.id,
          user_id: user.id,
          title: "Untitled Resume",
          template: newResume.template,
          content: newResume,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setResume(newResume);
      toast.success("New resume created");
      return newResume;
    } catch (error: any) {
      toast.error(error.message || "Failed to create resume");
      throw error;
    }
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
