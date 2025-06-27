import React from "react";
import { usePortfolio } from "@/lib/portfolio-context";
import { cn } from "@/lib/utils";
import Header from "./Header";
import Footer from "./Footer";

const Preview: React.FC = () => {
  const { state } = usePortfolio();
  const { portfolioData, editorSettings } = state;

  // Get the current active page
  const currentPage = portfolioData.pages?.find(p => p.id === editorSettings.activePageId);

  // Get the viewport width based on selected device
  const getViewportWidth = () => {
    switch (editorSettings.activeDevice) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
        return "100%";
      default:
        return "100%";
    }
  };

  // Adjust scale based on zoom level
  const scale = editorSettings.zoom / 100;
  
  // Get the appropriate styling based on theme settings
  const getPortfolioStyles = () => {
    const { themeSettings } = portfolioData;
    
    return {
      "--primary-color": themeSettings.primaryColor,
      "--accent-color": themeSettings.accentColor,
      "--text-color": themeSettings.textColor,
      "--background-color": themeSettings.backgroundColor,
      "--header-color": themeSettings.headerColor,
      "--link-color": themeSettings.linkColor,
      "--base-font-size": themeSettings.baseFontSize,
      "--section-spacing": themeSettings.sectionSpacing,
      "--content-padding": themeSettings.contentPadding,
      "fontFamily": themeSettings.fontPrimary,
      "borderRadius": themeSettings.borderRadius,
    } as React.CSSProperties;
  };

  // Render page-specific content
  const renderPageContent = () => {
    if (!currentPage) return null;

    switch (currentPage.type) {
      case "home":
        return (
          <div className="space-y-8">
            {/* Personal Info Section */}
            <section className="space-y-4">
              <h1 className="text-4xl font-bold">{portfolioData.personalInfo.fullName}</h1>
              <p className="text-xl text-muted-foreground">{portfolioData.personalInfo.title}</p>
              <p className="text-lg">{portfolioData.personalInfo.bio}</p>
            </section>

            {/* Experience Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Experience</h2>
              {portfolioData.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <h3 className="text-xl font-semibold">{exp.position} at {exp.company}</h3>
                  <p className="text-muted-foreground">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </section>

            {/* Projects Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.projects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-accent rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Contact Me</h1>
            {currentPage.layout === "form" ? (
              <div className="max-w-2xl mx-auto">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md"
                      rows={4}
                      placeholder="Your message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
                    <p className="text-muted-foreground">
                      Feel free to reach out through any of these channels.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Email</h3>
                      <p>{portfolioData.personalInfo.contactInfo.email}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Phone</h3>
                      <p>{portfolioData.personalInfo.contactInfo.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Location</h3>
                      <p>{portfolioData.personalInfo.contactInfo.location}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Social Links</h2>
                    <p className="text-muted-foreground">
                      Connect with me on social media.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">LinkedIn</h3>
                      <a href={portfolioData.personalInfo.contactInfo.linkedin} className="text-primary hover:underline">
                        {portfolioData.personalInfo.contactInfo.linkedin}
                      </a>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">GitHub</h3>
                      <a href={portfolioData.personalInfo.contactInfo.github} className="text-primary hover:underline">
                        {portfolioData.personalInfo.contactInfo.github}
                      </a>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Website</h3>
                      <a href={portfolioData.personalInfo.contactInfo.website} className="text-primary hover:underline">
                        {portfolioData.personalInfo.contactInfo.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "custom":
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">{currentPage.name}</h1>
            {currentPage.customType === "gallery" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {portfolioData.projects.map((project) => (
                  <div key={project.id} className="relative group">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-accent/10 rounded-lg flex items-center justify-center">
                        <span className="text-accent">{project.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm">{project.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-auto bg-background/50">
      <div
        className="mx-auto transition-all duration-200 bg-white shadow-lg"
        style={{
          width: getViewportWidth(),
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          minHeight: "100vh",
          ...getPortfolioStyles()
        }}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-8">
            {renderPageContent()}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Preview;
