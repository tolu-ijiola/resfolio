'use client'

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Preview from "./components/Preview";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Upload, ZoomIn, ZoomOut, RefreshCw, Download, Moon, Sun, User, Monitor, Tablet, Smartphone } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";
import UploadPortfolioModal from "./components/UploadPorfolioModal";
import { useTheme } from "./components/ThemeProvider";
import NavigationEditor from "./components/NavigationEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Builder = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [logoUploadOpen, setLogoUploadOpen] = useState(false);
  const { state, dispatch } = usePortfolio();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Track screen size for responsive adjustments
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (pageId: string) => {
    dispatch({ type: "SET_ACTIVE_PAGE", payload: pageId });
    // Reset sidebar to content tab when changing pages
    dispatch({ type: "SET_ACTIVE_SIDEBAR_TAB", payload: "content" });
  };
  
  const handleZoomIn = () => {
    if (state.editorSettings.zoom < 150) {
      dispatch({ type: "SET_ZOOM", payload: state.editorSettings.zoom + 10 });
    }
  };
  
  const handleZoomOut = () => {
    if (state.editorSettings.zoom > 50) {
      dispatch({ type: "SET_ZOOM", payload: state.editorSettings.zoom - 10 });
    }
  };
  
  const handleZoomReset = () => {
    dispatch({ type: "SET_ZOOM", payload: 100 });
  };
  
  const toggleDarkMode = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    dispatch({ 
      type: "UPDATE_THEME_SETTINGS", 
      payload: { 
        colorScheme: newTheme === "dark" ? "dark" : "light" 
      } 
    });
    
    toast({
      title: newTheme === "dark" ? "Dark mode enabled" : "Light mode enabled",
      duration: 2000,
    });
  };
  
  const handleDeviceChange = (device: "mobile" | "tablet" | "desktop") => {
    dispatch({ type: "SET_ACTIVE_DEVICE", payload: device });
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    const fullName = state.portfolioData.personalInfo.fullName;
    if (!fullName) return "U";
    
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  /* const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update navigation with logo
        dispatch({
          type: "UPDATE_NAVIGATION",
          payload: {
            ...state.portfolioData.navigation,
            logo: reader.result as string
          }
        });
        setLogoUploadOpen(false);
        
        toast({
          title: "Logo updated successfully",
          duration: 2000,
        });
      };
      reader.readAsDataURL(file);
    }
  }; */

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header with navigation bar */}
      <div className="h-12 border-b flex items-center justify-between px-4 bg-card">
        <div className="flex items-center space-x-4">
          {/* <Dialog open={logoUploadOpen} onOpenChange={setLogoUploadOpen}>
            <Button variant="ghost" className="p-0 h-9 w-9 rounded-full overflow-hidden" onClick={() => setLogoUploadOpen(true)}>
              {state.portfolioData.navigation?.logo ? (
                <img 
                  src={state.portfolioData.navigation.logo} 
                  alt="Logo" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <Avatar>
                  <AvatarImage src={state.portfolioData.personalInfo.avatar} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              )}
            </Button>
            <DialogContent className="sm:max-w-md">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Upload Logo</h2>
                <p className="text-sm text-muted-foreground">
                  Upload an image to use as your portfolio logo or use your initials as default.
                </p>
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog> */}
          
          <Link href="/px" className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="Resfolio Logo"
              width={120}
              height={32}
              priority
            />
          </Link>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Portfolio
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {/* Device controls */}
          <div className="hidden md:flex items-center space-x-1 mr-4 border-r pr-4">
            <Button 
              size="icon" 
              variant={state.editorSettings.activeDevice === "mobile" ? "default" : "ghost"} 
              onClick={() => handleDeviceChange("mobile")}
              className="h-8 w-8"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant={state.editorSettings.activeDevice === "tablet" ? "default" : "ghost"} 
              onClick={() => handleDeviceChange("tablet")}
              className="h-8 w-8"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant={state.editorSettings.activeDevice === "desktop" ? "default" : "ghost"} 
              onClick={() => handleDeviceChange("desktop")}
              className="h-8 w-8"
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Page Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {state.portfolioData.pages?.find(p => p.id === state.editorSettings.activePageId)?.name || "Current Page"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Switch Page</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {state.portfolioData.pages?.map((page) => (
                <DropdownMenuItem 
                  key={page.id}
                  onClick={() => handlePageChange(page.id)}
                >
                  {page.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                const newPage = {
                  id: `custom-${Date.now()}`,
                  name: "New Page",
                  type: "custom",
                  content: {},
                  styleSettings: {},
                };
                dispatch({ type: "ADD_PAGE", payload: newPage });
                handlePageChange(newPage.id);
              }}>
                Add New Page
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          {/* Zoom controls */}
          <Button size="icon" variant="ghost" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleZoomReset}
            className="flex items-center space-x-1 min-w-16"
          >
            <span>{state.editorSettings.zoom}%</span>
          </Button>
          <Button size="icon" variant="ghost" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          {/* Theme toggle */}
          <Button size="icon" variant="ghost" onClick={toggleDarkMode}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          {/* Export button */}
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <div className={`${windowWidth < 768 ? 'fixed z-20 inset-0 bg-background transform transition-transform duration-200 ease-in-out' : ''} ${state.editorSettings.sidebarOpen || windowWidth >= 768 ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar />
        </div>
        <div className="flex-1 overflow-hidden">
          <Preview />
        </div>
      </div>
      
      {/* Mobile sidebar toggle */}
      {windowWidth < 768 && (
        <Button
          size="icon"
          variant="default"
          className="fixed bottom-4 right-4 z-30 rounded-full shadow-lg"
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
        >
          {state.editorSettings.sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </Button>
      )}
      
      <UploadPortfolioModal 
        open={uploadModalOpen} 
        onClose={() => setUploadModalOpen(false)} 
      />
    </div>
  );
};

export default Builder;