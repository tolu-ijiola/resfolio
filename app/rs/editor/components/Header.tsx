import React from "react";
import { usePortfolio } from "@/lib/portfolio-context";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const { state } = usePortfolio();
  const { portfolioData } = state;
  const navigation = portfolioData.navigation || { links: [] };

  // Get logo (image, initials, or name fallback)
  const getLogo = () => {
    if (portfolioData.navigation?.logo) {
      return <img src={portfolioData.navigation.logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />;
    }
    const fullName = portfolioData.personalInfo.fullName || "User";
    const names = fullName.trim().split(" ");
    const initials = names.length === 1 ? names[0][0] : names[0][0] + names[names.length - 1][0];
    return (
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
        {initials.toUpperCase()}
      </div>
    );
  };

  // Layout classes
  const layoutClass =
    navigation.layout === "left"
      ? "justify-start"
      : navigation.layout === "center"
      ? "justify-center"
      : "justify-between";

  // Render logo/text based on mode
  const renderLogoText = () => {
    if (navigation.displayMode === "logo") return getLogo();
    if (navigation.displayMode === "text") {
      return (
        <span
          className="text-lg font-bold"
          style={{ fontFamily: portfolioData.themeSettings.fontPrimary, color: portfolioData.themeSettings.textColor }}
        >
          {navigation.title || portfolioData.personalInfo.fullName || "Portfolio"}
        </span>
      );
    }
    // text+logo
    return (
      <div className="flex items-center space-x-2">
        {getLogo()}
        <span
          className="text-lg font-bold"
          style={{ fontFamily: portfolioData.themeSettings.fontPrimary, color: portfolioData.themeSettings.textColor }}
        >
          {navigation.title || portfolioData.personalInfo.fullName || "Portfolio"}
        </span>
      </div>
    );
  };

  // Navigation links
  const renderNavLinks = () => (
    <nav className="flex space-x-4">
      {navigation.links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          className="text-base font-medium hover:underline"
          style={{ color: portfolioData.themeSettings.linkColor || portfolioData.themeSettings.accentColor, fontFamily: portfolioData.themeSettings.fontPrimary }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        "w-full flex items-center py-4 border-b mb-8 border-b-gray-300",
        layoutClass
      )}
      style={{ borderColor: portfolioData.themeSettings.primaryColor }}
    >
      <div className={cn("flex-1 flex items-center", layoutClass)}>
        {renderLogoText()}
        <div className={cn("ml-8 flex-1", navigation.layout === "split" ? "flex justify-end" : "")}>
          {renderNavLinks()}
        </div>
      </div>
    </header>
  );
};

export default Header; 