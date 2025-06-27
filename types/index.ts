import { type ClassValue } from "clsx";

export type DeviceType = "mobile" | "tablet" | "desktop";

export type SectionLayout = 
  | "standard" 
  | "side-by-side" 
  | "minimal" 
  | "timeline" 
  | "cards" 
  | "compact" 
  | "grid" 
  | "showcase" 
  | "carousel" 
  | "list" 
  | "progress" 
  | "tags";

export type PortfolioSection = 
  | "personal" 
  | "experience" 
  | "education" 
  | "skills" 
  | "projects" 
  | "testimonials" 
  | "customSections";

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  achievements?: string[];
  logo?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  logo?: string;
  location?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1-5
  category?: string;
  icon?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  featured: boolean;
  github?: string;
  details?: string;
}

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  position: string;
  company: string;
  rating: number; // 1-5
  avatar?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  content: string;
  type: "text" | "image" | "video" | "embed";
  order?: number;
}

export interface NavigationLink {
  label: string;
  url: string;
}

export interface Navigation {
  links: NavigationLink[];
  logo?: string;
  layout: "left" | "center" | "split";
  displayMode: "text" | "logo" | "text+logo";
  title?: string;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  bio: string;
  avatar: string;
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface ThemeSettings {
  colorScheme: "light" | "dark" | "auto";
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headerColor: string;
  linkColor: string;
  fontPrimary: string;
  fontSecondary: string;
  borderRadius: string;
  baseFontSize: string;
  sectionSpacing: string;
  contentPadding: string;
}

export interface EditorSettings {
  activeDevice: DeviceType;
  showGrid: boolean;
  zoom: number;
  activeSidebarTab: string;
  activeSection: string;
  sidebarOpen: boolean;
  activePageId: string;
}

export type PageType = "home" | "contact" | "custom";

export interface PageData {
  id: string;
  name: string;
  type: PageType;
  content: any; // Can be more specific later
  styleSettings?: Partial<ThemeSettings>;
  customType?: "gallery" | "richtext" | "embed";
  customConfig?: any;
  hidden?: boolean;
  layout?: "standard" | "form";
}

export interface FooterData {
  copyright?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  customSections?: CustomSectionItem[];
  themeSettings: ThemeSettings;
  navigation?: Navigation;
  pages?: PageData[];
  footer?: FooterData;
}

// Utility type to allow indexing by string
export interface PortfolioDataRecord extends Record<string, any> {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  customSections?: CustomSectionItem[];
  themeSettings: ThemeSettings;
  navigation?: Navigation;
}
