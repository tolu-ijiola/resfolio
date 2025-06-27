import React, { useState } from "react";
import { usePortfolio } from "@/lib/portfolio-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const { portfolioData } = state;
  const [editing, setEditing] = useState(false);
  const defaultCopyright = `© 2025 ${portfolioData.personalInfo.fullName || "John Doe"}. All rights reserved.`;
  const copyright = portfolioData.footer?.copyright || defaultCopyright;
  const [temp, setTemp] = useState(copyright);

  // Get logo (image, initials, or name fallback)
  const getLogo = () => {
    if (portfolioData.navigation?.logo) {
      return <img src={portfolioData.navigation.logo} alt="Logo" className="h-8 w-8 rounded-full object-cover" />;
    }
    const fullName = portfolioData.personalInfo.fullName || "User";
    const names = fullName.trim().split(" ");
    const initials = names.length === 1 ? names[0][0] : names[0][0] + names[names.length - 1][0];
    return (
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-base">
        {initials.toUpperCase()}
      </div>
    );
  };

  const handleSave = () => {
    dispatch({
      type: "UPDATE_FOOTER",
      payload: { copyright: temp }
    });
    setEditing(false);
  };

  return (
    <footer className="w-full flex flex-col items-center justify-center py-6 border-t bg-[var(--header-color)] mt-8">
      <div className="flex items-center space-x-2 mb-2">{getLogo()}</div>
      <div className="mb-1">
        {editing ? (
          <div className="flex items-center space-x-2">
            <Input value={temp} onChange={e => setTemp(e.target.value)} onBlur={handleSave} onKeyDown={e => e.key === 'Enter' && handleSave()} className="h-8 w-72" autoFocus />
            <Button size="sm" onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground cursor-pointer" onClick={() => setEditing(true)}>{copyright}</span>
        )}
      </div>
      <div className="text-xs text-muted-foreground mt-1">Powered by Resfolio</div>
    </footer>
  );
};

export default Footer; 