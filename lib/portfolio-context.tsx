import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { PortfolioData, EditorSettings, DeviceType, SectionLayout, PortfolioSection, CustomSectionItem, Navigation, PageData, PageType, FooterData } from "@/types";

interface PortfolioState {
  portfolioData: PortfolioData;
  editorSettings: EditorSettings;
  isEditing: boolean;
  isDirty: boolean;
  undoStack: PortfolioData[];
  redoStack: PortfolioData[];
  layoutSettings: {
    [key in PortfolioSection]?: {
      layout: SectionLayout;
      colors: {
        background: string;
        text: string;
        accent: string;
      };
      spacing: {
        padding: string;
        margin: string;
        gap: string;
      };
      animation: string;
    };
  } & {
    [key: string]: any;
  };
}

type PortfolioAction =
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<PortfolioData["personalInfo"]> }
  | { type: "UPDATE_EDUCATION"; payload: { id: string; data: Partial<PortfolioData["education"][0]> } }
  | { type: "ADD_EDUCATION"; payload: PortfolioData["education"][0] }
  | { type: "REMOVE_EDUCATION"; payload: string }
  | { type: "UPDATE_EXPERIENCE"; payload: { id: string; data: Partial<PortfolioData["experience"][0]> } }
  | { type: "ADD_EXPERIENCE"; payload: PortfolioData["experience"][0] }
  | { type: "REMOVE_EXPERIENCE"; payload: string }
  | { type: "UPDATE_SKILL"; payload: { id: string; data: Partial<PortfolioData["skills"][0]> } }
  | { type: "ADD_SKILL"; payload: PortfolioData["skills"][0] }
  | { type: "REMOVE_SKILL"; payload: string }
  | { type: "UPDATE_PROJECT"; payload: { id: string; data: Partial<PortfolioData["projects"][0]> } }
  | { type: "ADD_PROJECT"; payload: PortfolioData["projects"][0] }
  | { type: "REMOVE_PROJECT"; payload: string }
  | { type: "UPDATE_TESTIMONIAL"; payload: { id: string; data: Partial<PortfolioData["testimonials"][0]> } }
  | { type: "ADD_TESTIMONIAL"; payload: PortfolioData["testimonials"][0] }
  | { type: "REMOVE_TESTIMONIAL"; payload: string }
  | { type: "ADD_CUSTOM_SECTION"; payload: CustomSectionItem }
  | { type: "UPDATE_CUSTOM_SECTION"; payload: { id: string; data: Partial<CustomSectionItem> } }
  | { type: "REMOVE_CUSTOM_SECTION"; payload: string }
  | { type: "UPDATE_CUSTOM_SECTIONS"; payload: CustomSectionItem[] }
  | { type: "UPDATE_NAVIGATION"; payload: Navigation }
  | { type: "UPDATE_THEME_SETTINGS"; payload: Partial<PortfolioData["themeSettings"]> }
  | { type: "UPDATE_SECTION_LAYOUT"; payload: { section: PortfolioSection | string; sectionId?: string; property: string; value: any } }
  | { type: "UPDATE_SECTION_COLORS"; payload: { section: PortfolioSection; colors: { background?: string; text?: string; accent?: string } } }
  | { type: "UPDATE_SECTION_SPACING"; payload: { section: PortfolioSection; spacing: { padding?: string; margin?: string; gap?: string } } }
  | { type: "UPDATE_SECTION_ANIMATION"; payload: { section: PortfolioSection; animation: string } }
  | { type: "SET_ACTIVE_DEVICE"; payload: DeviceType }
  | { type: "SET_ACTIVE_SIDEBAR_TAB"; payload: string }
  | { type: "SET_ACTIVE_SECTION"; payload: string }
  | { type: "TOGGLE_GRID"; payload?: boolean }
  | { type: "TOGGLE_SIDEBAR"; payload?: boolean }
  | { type: "SET_ZOOM"; payload: number }
  | { type: "SET_EDITING"; payload: boolean }
  | { type: "IMPORT_PORTFOLIO"; payload: PortfolioData }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET" }
  | { type: "SET_ACTIVE_PAGE"; payload: string }
  | { type: "ADD_PAGE"; payload: PageData }
  | { type: "UPDATE_PAGE"; payload: { id: string; data: Partial<PageData> } }
  | { type: "REMOVE_PAGE"; payload: string }
  | { type: "UPDATE_FOOTER"; payload: FooterData };

const initialPortfolioData: PortfolioData = {
  personalInfo: {
    fullName: "Jane Smith",
    title: "Product Designer & Developer",
    bio: "I'm a passionate designer and developer with over 5 years of experience creating beautiful, functional digital experiences.",
    avatar: "",
    contactInfo: {
      email: "hello@example.com",
      phone: "+1 234 567 890",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/janesmith",
      github: "github.com/janesmith",
      website: "janesmith.com"
    }
  },
  education: [
    {
      id: "edu-1",
      institution: "University of Design",
      degree: "Bachelor of Arts",
      field: "Interactive Design",
      startDate: "2015-09",
      endDate: "2019-06",
      description: "Focused on user experience design, interaction design, and front-end development."
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "Design Studio Inc.",
      position: "Senior Product Designer",
      startDate: "2019-07",
      endDate: "",
      current: true,
      description: "Leading the design of digital products and services for various clients.",
      achievements: [
        "Redesigned the company's flagship product increasing user engagement by 40%",
        "Led a team of 5 designers on multiple client projects",
        "Implemented design system that reduced design inconsistencies by 60%"
      ]
    },
    {
      id: "exp-2",
      company: "Tech Solutions Ltd.",
      position: "UI/UX Designer",
      startDate: "2017-03",
      endDate: "2019-06",
      current: false,
      description: "Designed user interfaces for web and mobile applications.",
      achievements: [
        "Created user interfaces for 10+ client projects",
        "Conducted user research and usability testing",
        "Collaborated with developers to ensure pixel-perfect implementation"
      ]
    }
  ],
  skills: [
    { id: "skill-1", name: "UI Design", level: 5, category: "Design" },
    { id: "skill-2", name: "UX Design", level: 4, category: "Design" },
    { id: "skill-3", name: "Figma", level: 5, category: "Tools" },
    { id: "skill-4", name: "React", level: 4, category: "Development" },
    { id: "skill-5", name: "TypeScript", level: 3, category: "Development" },
    { id: "skill-6", name: "CSS/SCSS", level: 4, category: "Development" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "E-Commerce Redesign",
      description: "Complete redesign of an e-commerce platform focusing on improving the user experience and conversion rates.",
      technologies: ["Figma", "React", "Node.js"],
      link: "https://example.com/project1",
      image: "",
      featured: true
    },
    {
      id: "proj-2",
      title: "Finance Dashboard",
      description: "A comprehensive dashboard for tracking financial metrics and analytics.",
      technologies: ["React", "D3.js", "Firebase"],
      link: "https://example.com/project2",
      image: "",
      featured: true
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "John Doe",
      position: "Product Manager",
      company: "Tech Innovations",
      text: "Jane is an exceptional designer who brings both creativity and technical expertise to every project. Her attention to detail and user-centered approach consistently delivers outstanding results.",
      rating: 5,
      avatar: ""
    }
  ],
  customSections: [],
  navigation: {
    links: [
      { label: "Portfolio", url: "/builder" },
      { label: "Contact", url: "/contact" }
    ]
  },
  themeSettings: {
    colorScheme: "light",
    primaryColor: "#0F172A",
    accentColor: "#3B82F6",
    fontPrimary: "Inter",
    fontSecondary: "Playfair Display",
    borderRadius: "0.5rem"
  },
  pages: [
    {
      id: "home",
      name: "Home",
      type: "home",
      content: {},
      styleSettings: {},
    },
    {
      id: "contact",
      name: "Contact",
      type: "contact",
      content: {},
      styleSettings: {},
    },
    {
      id: "custom-1",
      name: "Gallery",
      type: "custom",
      content: {},
      styleSettings: {},
      customType: "gallery",
      customConfig: {},
    }
  ],
  footer: {
    copyright: undefined
  }
};

const initialEditorSettings: EditorSettings = {
  activeDevice: "desktop",
  showGrid: false,
  zoom: 100,
  activeSidebarTab: "content",
  activeSection: "personal",
  sidebarOpen: false,
  activePageId: "home"
};

const initialLayoutSettings = {
  personal: {
    layout: "standard" as SectionLayout,
    colors: {
      background: "transparent",
      text: "inherit",
      accent: "inherit"
    },
    spacing: {
      padding: "2rem",
      margin: "0",
      gap: "1.5rem"
    },
    animation: "fade-in"
  },
  experience: {
    layout: "timeline" as SectionLayout,
    colors: {
      background: "transparent",
      text: "inherit",
      accent: "inherit"
    },
    spacing: {
      padding: "2rem",
      margin: "2rem 0",
      gap: "2rem"
    },
    animation: "slide-in-left"
  },
  education: {
    layout: "cards" as SectionLayout,
    colors: {
      background: "transparent",
      text: "inherit",
      accent: "inherit"
    },
    spacing: {
      padding: "2rem",
      margin: "2rem 0",
      gap: "1.5rem"
    },
    animation: "fade-in"
  },
  skills: {
    layout: "progress" as SectionLayout,
    colors: {
      background: "transparent",
      text: "inherit",
      accent: "inherit"
    },
    spacing: {
      padding: "2rem",
      margin: "2rem 0",
      gap: "1rem"
    },
    animation: "fade-in"
  },
  projects: {
    layout: "grid" as SectionLayout,
    colors: {
      background: "transparent",
      text: "inherit",
      accent: "inherit"
    },
    spacing: {
      padding: "2rem",
      margin: "2rem 0",
      gap: "2rem"
    },
    animation: "scale-in"
  },
  testimonials: {
    layout: "carousel" as SectionLayout,
    colors: {
      background: "transparent",
      text: "inherit",
      accent: "inherit"
    },
    spacing: {
      padding: "2rem",
      margin: "2rem 0",
      gap: "1rem"
    },
    animation: "fade-in"
  },
  customSections: {
    layout: "standard" as SectionLayout,
    colors: {
      background: "transparent",
      text: "inherit",
      accent: "inherit"
    },
    spacing: {
      padding: "2rem",
      margin: "2rem 0",
      gap: "1.5rem"
    },
    animation: "fade-in"
  }
};

const initialState: PortfolioState = {
  portfolioData: initialPortfolioData,
  editorSettings: initialEditorSettings,
  isEditing: false,
  isDirty: false,
  undoStack: [],
  redoStack: [],
  layoutSettings: initialLayoutSettings
};

const portfolioReducer = (state: PortfolioState, action: PortfolioAction): PortfolioState => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          personalInfo: {
            ...state.portfolioData.personalInfo,
            ...action.payload
          }
        }
      };
    
    case "UPDATE_EDUCATION":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          education: state.portfolioData.education.map(item => 
            item.id === action.payload.id ? { ...item, ...action.payload.data } : item
          )
        }
      };
    
    case "ADD_EDUCATION":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          education: [...state.portfolioData.education, action.payload]
        }
      };
    
    case "REMOVE_EDUCATION":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          education: state.portfolioData.education.filter(item => item.id !== action.payload)
        }
      };
    
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          experience: state.portfolioData.experience.map(item => 
            item.id === action.payload.id ? { ...item, ...action.payload.data } : item
          )
        }
      };
    
    case "ADD_EXPERIENCE":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          experience: [...state.portfolioData.experience, action.payload]
        }
      };
    
    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          experience: state.portfolioData.experience.filter(item => item.id !== action.payload)
        }
      };
    
    case "UPDATE_SKILL":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          skills: state.portfolioData.skills.map(item => 
            item.id === action.payload.id ? { ...item, ...action.payload.data } : item
          )
        }
      };
    
    case "ADD_SKILL":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          skills: [...state.portfolioData.skills, action.payload]
        }
      };
    
    case "REMOVE_SKILL":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          skills: state.portfolioData.skills.filter(item => item.id !== action.payload)
        }
      };
    
    case "UPDATE_PROJECT":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          projects: state.portfolioData.projects.map(item => 
            item.id === action.payload.id ? { ...item, ...action.payload.data } : item
          )
        }
      };
    
    case "ADD_PROJECT":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          projects: [...state.portfolioData.projects, action.payload]
        }
      };
    
    case "REMOVE_PROJECT":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          projects: state.portfolioData.projects.filter(item => item.id !== action.payload)
        }
      };
    
    case "UPDATE_TESTIMONIAL":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          testimonials: state.portfolioData.testimonials.map(item => 
            item.id === action.payload.id ? { ...item, ...action.payload.data } : item
          )
        }
      };
    
    case "ADD_TESTIMONIAL":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          testimonials: [...state.portfolioData.testimonials, action.payload]
        }
      };
    
    case "REMOVE_TESTIMONIAL":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          testimonials: state.portfolioData.testimonials.filter(item => item.id !== action.payload)
        }
      };
    
    case "ADD_CUSTOM_SECTION":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          customSections: [
            ...(state.portfolioData.customSections || []),
            {
              id: action.payload.id,
              title: action.payload.title,
              content: action.payload.content,
              type: action.payload.type
            }
          ]
        }
      };
    
    case "UPDATE_CUSTOM_SECTION":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          customSections: state.portfolioData.customSections?.map(section => 
            section.id === action.payload.id ? { ...section, ...action.payload.data } : section
          ) || []
        }
      };
    
    case "REMOVE_CUSTOM_SECTION":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          customSections: state.portfolioData.customSections?.filter(section => 
            section.id !== action.payload
          ) || []
        }
      };
    
    case "UPDATE_CUSTOM_SECTIONS":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          customSections: action.payload
        }
      };
      
    case "UPDATE_NAVIGATION":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          navigation: action.payload
        }
      };
      
    case "UPDATE_THEME_SETTINGS":
      return {
        ...state,
        isDirty: true,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: [],
        portfolioData: {
          ...state.portfolioData,
          themeSettings: {
            ...state.portfolioData.themeSettings,
            ...action.payload
          }
        }
      };
      
    case "UPDATE_SECTION_LAYOUT":
      const { section, sectionId, property, value } = action.payload;
      
      if (sectionId) {
        return {
          ...state,
          layoutSettings: {
            ...state.layoutSettings,
            [section]: {
              ...state.layoutSettings[section],
              [sectionId]: {
                ...state.layoutSettings[section]?.[sectionId],
                [property]: value
              }
            }
          }
        };
      } else {
        return {
          ...state,
          layoutSettings: {
            ...state.layoutSettings,
            [section]: {
              ...state.layoutSettings[section],
              [property]: value
            }
          }
        };
      }
      
    case "UPDATE_SECTION_COLORS":
      return {
        ...state,
        layoutSettings: {
          ...state.layoutSettings,
          [action.payload.section as string]: {
            ...state.layoutSettings[action.payload.section as string],
            colors: {
              ...state.layoutSettings[action.payload.section as string]?.colors,
              ...action.payload.colors
            }
          }
        }
      };
      
    case "UPDATE_SECTION_SPACING":
      return {
        ...state,
        layoutSettings: {
          ...state.layoutSettings,
          [action.payload.section as string]: {
            ...state.layoutSettings[action.payload.section as string],
            spacing: {
              ...state.layoutSettings[action.payload.section as string]?.spacing,
              ...action.payload.spacing
            }
          }
        }
      };
      
    case "UPDATE_SECTION_ANIMATION":
      return {
        ...state,
        layoutSettings: {
          ...state.layoutSettings,
          [action.payload.section as string]: {
            ...state.layoutSettings[action.payload.section as string],
            animation: action.payload.animation
          }
        }
      };
    
    case "SET_ACTIVE_DEVICE":
      return {
        ...state,
        editorSettings: {
          ...state.editorSettings,
          activeDevice: action.payload
        }
      };
    
    case "SET_ACTIVE_SIDEBAR_TAB":
      return {
        ...state,
        editorSettings: {
          ...state.editorSettings,
          activeSidebarTab: action.payload
        }
      };
    
    case "SET_ACTIVE_SECTION":
      return {
        ...state,
        editorSettings: {
          ...state.editorSettings,
          activeSection: action.payload
        }
      };
    
    case "TOGGLE_GRID":
      return {
        ...state,
        editorSettings: {
          ...state.editorSettings,
          showGrid: action.payload !== undefined 
            ? action.payload 
            : !state.editorSettings.showGrid
        }
      };
    
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        editorSettings: {
          ...state.editorSettings,
          sidebarOpen: action.payload !== undefined 
            ? action.payload 
            : !state.editorSettings.sidebarOpen
        }
      };
    
    case "SET_ZOOM":
      return {
        ...state,
        editorSettings: {
          ...state.editorSettings,
          zoom: action.payload
        }
      };
    
    case "SET_EDITING":
      return {
        ...state,
        isEditing: action.payload
      };
    
    case "UNDO":
      if (state.undoStack.length === 0) return state;
      
      const previousState = state.undoStack[state.undoStack.length - 1];
      return {
        ...state,
        portfolioData: previousState,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [state.portfolioData, ...state.redoStack]
      };
    
    case "REDO":
      if (state.redoStack.length === 0) return state;
      
      const nextState = state.redoStack[0];
      return {
        ...state,
        portfolioData: nextState,
        undoStack: [...state.undoStack, state.portfolioData],
        redoStack: state.redoStack.slice(1)
      };
    
    case "RESET":
      return initialState;
    
    case "SET_ACTIVE_PAGE":
      return {
        ...state,
        editorSettings: {
          ...state.editorSettings,
          activePageId: action.payload
        }
      };
    
    case "ADD_PAGE":
      return {
        ...state,
        portfolioData: {
          ...state.portfolioData,
          pages: [...(state.portfolioData.pages || []), action.payload]
        }
      };
    
    case "UPDATE_PAGE":
      return {
        ...state,
        portfolioData: {
          ...state.portfolioData,
          pages: (state.portfolioData.pages || []).map(page =>
            page.id === action.payload.id ? { ...page, ...action.payload.data } : page
          )
        }
      };
    
    case "REMOVE_PAGE":
      return {
        ...state,
        portfolioData: {
          ...state.portfolioData,
          pages: (state.portfolioData.pages || []).filter(page => page.id !== action.payload)
        }
      };
    
    case "UPDATE_FOOTER":
      return {
        ...state,
        portfolioData: {
          ...state.portfolioData,
          footer: {
            ...state.portfolioData.footer,
            ...action.payload
          }
        }
      };
    
    default:
      return state;
  }
};

const PortfolioContext = createContext<{
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  useEffect(() => {
    const { colorScheme } = state.portfolioData.themeSettings;
    
    if (colorScheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (colorScheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (colorScheme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, [state.portfolioData.themeSettings.colorScheme]);

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  )
};

export const usePortfolio = () => useContext(PortfolioContext);
