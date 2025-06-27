'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePortfolio } from "@/lib/portfolio-context";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
  ...props
}: ThemeProviderProps) {
  const { state } = usePortfolio();
  const { portfolioData } = state;
  
  // Initialize theme from portfolio data or default
  const [theme, setTheme] = useState<Theme>(
    () => (portfolioData?.themeSettings?.colorScheme as Theme) || defaultTheme
  );

  // Apply theme class to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
        
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
  }, [theme]);

  // Apply custom colors and styling from theme settings to CSS variables
  useEffect(() => {
    if (!portfolioData?.themeSettings) return;
    
    const root = window.document.documentElement;
    
    // Apply custom colors if they are set
    if (portfolioData.themeSettings.primaryColor) {
      root.style.setProperty('--primary', portfolioData.themeSettings.primaryColor);
      root.style.setProperty('--primary-color', portfolioData.themeSettings.primaryColor);
    }
    
    if (portfolioData.themeSettings.accentColor) {
      root.style.setProperty('--accent', portfolioData.themeSettings.accentColor);
      root.style.setProperty('--accent-color', portfolioData.themeSettings.accentColor);
    }
    
    if (portfolioData.themeSettings.textColor) {
      root.style.setProperty('--foreground', portfolioData.themeSettings.textColor);
      root.style.setProperty('--text-color', portfolioData.themeSettings.textColor);
    }
    
    if (portfolioData.themeSettings.backgroundColor) {
      root.style.setProperty('--background', portfolioData.themeSettings.backgroundColor);
      root.style.setProperty('--background-color', portfolioData.themeSettings.backgroundColor);
    }
    
    if (portfolioData.themeSettings.headerColor) {
      root.style.setProperty('--header', portfolioData.themeSettings.headerColor);
      root.style.setProperty('--header-color', portfolioData.themeSettings.headerColor);
    }
    
    if (portfolioData.themeSettings.linkColor) {
      root.style.setProperty('--link', portfolioData.themeSettings.linkColor);
      root.style.setProperty('--link-color', portfolioData.themeSettings.linkColor);
    }
    
    // Apply font settings
    if (portfolioData.themeSettings.fontPrimary) {
      root.style.setProperty('--font-primary', portfolioData.themeSettings.fontPrimary);
      document.body.style.fontFamily = portfolioData.themeSettings.fontPrimary;
    }
    
    // Apply font size
    if (portfolioData.themeSettings.baseFontSize) {
      root.style.setProperty('--base-font-size', portfolioData.themeSettings.baseFontSize);
      document.body.style.fontSize = portfolioData.themeSettings.baseFontSize;
    }
    
    // Apply border radius
    if (portfolioData.themeSettings.borderRadius) {
      root.style.setProperty('--border-radius', portfolioData.themeSettings.borderRadius);
    }
    
    // Apply spacing settings
    if (portfolioData.themeSettings.sectionSpacing) {
      root.style.setProperty('--section-spacing', portfolioData.themeSettings.sectionSpacing);
    }
    
    if (portfolioData.themeSettings.contentPadding) {
      root.style.setProperty('--content-padding', portfolioData.themeSettings.contentPadding);
    }
  }, [portfolioData?.themeSettings]);

  // Update theme when portfolio colorScheme changes
  useEffect(() => {
    if (!portfolioData?.themeSettings?.colorScheme) return;
    
    if (portfolioData.themeSettings.colorScheme === "dark" || portfolioData.themeSettings.colorScheme === "light") {
      setTheme(portfolioData.themeSettings.colorScheme);
    } else {
      setTheme("system");
    }
  }, [portfolioData?.themeSettings?.colorScheme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
      localStorage.setItem(storageKey, theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
    
  return context;
};
