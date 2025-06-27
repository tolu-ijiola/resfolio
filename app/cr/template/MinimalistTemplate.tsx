import type React from "react"
import type { ResumeData } from "../components/ResumeContext"
import { Mail, Phone, MapPin, Globe } from "lucide-react"

interface TemplateProps {
  resume: ResumeData
  styleSettings?: any
}

const MinimalistTemplate: React.FC<TemplateProps> = ({ resume, styleSettings = {} }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, customSections } =
    resume

  const accentColor = styleSettings.accentColor || "#6366f1"
  const headerColor = styleSettings.headerColor || "#1e293b"
  const textColor = styleSettings.textColor || "#475569"

  const textStyles = {
    fontFamily: styleSettings.fontFamily || "Inter, system-ui, sans-serif",
    fontSize: styleSettings.fontSize === "sm" ? "0.875rem" : 
              styleSettings.fontSize === "lg" ? "1.125rem" : 
              styleSettings.fontSize === "xl" ? "1.25rem" : "1rem",
    fontWeight: styleSettings.fontWeight || "400",
    lineHeight: styleSettings.lineHeight === "normal" ? "1.6" : 
                styleSettings.lineHeight === "relaxed" ? "1.75" : 
                styleSettings.lineHeight === "loose" ? "2" : 
                styleSettings.lineHeight === "tight" ? "1.25" : "1.6",
    color: textColor,
  }

  return (
    <div
      className="bg-white text-gray-800 w-full h-full"
      style={textStyles}
    >
      <div className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Clean Header */}
        <header className="text-center space-y-6">
          <div className="space-y-4">
            {personalInfo.imageUrl && (
              <div className="flex justify-center mb-6">
                <div
                  className={`w-32 h-32 overflow-hidden border-2 ${
                    styleSettings.imageShape === "circle"
                      ? "rounded-full"
                      : styleSettings.imageShape === "rounded"
                        ? "rounded-2xl"
                        : "rounded-lg"
                  }`}
                  style={{ borderColor: `${accentColor}30` }}
                >
                  <img
                    src={personalInfo.imageUrl || "/placeholder.svg"}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h1
                className="font-light tracking-wide"
                style={{
                  fontSize:
                    styleSettings.headerSize === "xl"
                      ? "3rem"
                      : styleSettings.headerSize === "2xl"
                        ? "3.5rem"
                        : styleSettings.headerSize === "3xl"
                          ? "4rem"
                          : styleSettings.headerSize === "4xl"
                            ? "4.5rem"
                            : "3rem",
                  color: headerColor,
                  letterSpacing: "0.05em",
                }}
              >
                {personalInfo.fullName || "Your Name"}
              </h1>

              <div className="w-16 h-px mx-auto" style={{ backgroundColor: accentColor }}></div>

              <h2 className="text-xl font-light tracking-wide" style={{ color: `${textColor}cc` }}>
                {personalInfo.jobTitle || "Professional Title"}
              </h2>
            </div>
          </div>

          {/* Minimal Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
                style={{ color: accentColor }}
              >
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </a>
            )}

            {personalInfo.phone && (
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
                style={{ color: accentColor }}
              >
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </a>
            )}

            {personalInfo.location && (
              <div className="flex items-center space-x-2" style={{ color: textColor }}>
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}

            {personalInfo.website && (
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
                style={{ color: accentColor }}
              >
                <Globe className="h-4 w-4" />
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </header>

        {/* Elegant Divider */}
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-px" style={{ backgroundColor: `${accentColor}40` }}></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
          <div className="w-16 h-px" style={{ backgroundColor: `${accentColor}40` }}></div>
        </div>

        {/* Summary */}
        {summary?.summary && (
          <section className="text-center max-w-3xl mx-auto">
            <h3
              className="text-lg font-light tracking-wide mb-6 uppercase"
              style={{ color: headerColor, letterSpacing: "0.2em" }}
            >
              About
            </h3>
            <p className="text-lg leading-relaxed font-light" style={{ color: textColor }}>
              {summary.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h3
              className="text-lg font-light tracking-wide mb-8 text-center uppercase"
              style={{ color: headerColor, letterSpacing: "0.2em" }}
            >
              Experience
            </h3>

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: accentColor }}
                  ></div>

                  <div className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center gap-12`}>
                    <div className="flex-1 text-right" style={{ textAlign: index % 2 === 0 ? "right" : "left" }}>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xl font-light" style={{ color: headerColor }}>
                            {exp.position}
                          </h4>
                          <div className="text-lg font-light" style={{ color: accentColor }}>
                            {exp.company}
                          </div>
                          {exp.location && (
                            <div className="text-sm" style={{ color: `${textColor}80` }}>
                              {exp.location}
                            </div>
                          )}
                        </div>

                        <div className="text-sm font-light" style={{ color: `${textColor}80` }}>
                          {exp.startDate} — {exp.endDate}
                        </div>

                        {exp.description && (
                          <p className="font-light leading-relaxed" style={{ color: textColor }}>
                            {exp.description}
                          </p>
                        )}

                        {exp.bullets.length > 0 && (
                          <ul className="space-y-2 text-sm">
                            {exp.bullets.map(
                              (bullet, bulletIndex) =>
                                bullet.trim() && (
                                  <li
                                    key={bulletIndex}
                                    className="font-light leading-relaxed"
                                    style={{ color: `${textColor}dd` }}
                                  >
                                    {bullet}
                                  </li>
                                ),
                            )}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="flex-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3
              className="text-lg font-light tracking-wide mb-8 text-center uppercase"
              style={{ color: headerColor, letterSpacing: "0.2em" }}
            >
              Education
            </h3>

            <div className="grid gap-8 max-w-2xl mx-auto">
              {education.map((edu) => (
                <div key={edu.id} className="text-center space-y-3">
                  <div>
                    <h4 className="text-xl font-light" style={{ color: headerColor }}>
                      {edu.degree}
                    </h4>
                    <div className="text-lg font-light" style={{ color: accentColor }}>
                      {edu.school}
                    </div>
                    {edu.fieldOfStudy && (
                      <div className="text-sm" style={{ color: `${textColor}80` }}>
                        {edu.fieldOfStudy}
                      </div>
                    )}
                    {edu.location && (
                      <div className="text-sm" style={{ color: `${textColor}80` }}>
                        {edu.location}
                      </div>
                    )}
                  </div>

                  <div className="text-sm font-light" style={{ color: `${textColor}80` }}>
                    {edu.startDate} — {edu.endDate}
                  </div>

                  {edu.description && (
                    <p className="font-light leading-relaxed" style={{ color: textColor }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.categories.length > 0 && (
          <section>
            <h3
              className="text-lg font-light tracking-wide mb-8 text-center uppercase"
              style={{ color: headerColor, letterSpacing: "0.2em" }}
            >
              Skills
            </h3>

            <div className="space-y-8">
              {skills.categories.map((category) => (
                <div key={category.id} className="text-center">
                  <h4
                    className="text-base font-light mb-4 uppercase tracking-wider"
                    style={{ color: accentColor, letterSpacing: "0.15em" }}
                  >
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-4 py-2 text-sm font-light tracking-wide border rounded-full hover:shadow-sm transition-shadow"
                        style={{
                          borderColor: `${accentColor}40`,
                          color: textColor,
                        }}
                      >
                        {skill.name}
                        {skill.level && (
                          <span className="ml-2 text-xs" style={{ color: `${textColor}60` }}>
                            {skill.level}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h3
              className="text-lg font-light tracking-wide mb-8 text-center uppercase"
              style={{ color: headerColor, letterSpacing: "0.2em" }}
            >
              Projects
            </h3>

            <div className="grid gap-8 max-w-3xl mx-auto">
              {projects.map((project) => (
                <div key={project.id} className="text-center space-y-4 pb-8 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h4 className="text-xl font-light mb-2" style={{ color: headerColor }}>
                      {project.name}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 text-sm font-light hover:opacity-70 transition-opacity"
                          style={{ color: accentColor }}
                        >
                          View →
                        </a>
                      )}
                    </h4>

                    {(project.startDate || project.endDate) && (
                      <div className="text-sm font-light" style={{ color: `${textColor}80` }}>
                        {project.startDate} {project.startDate && project.endDate && "—"} {project.endDate}
                      </div>
                    )}
                  </div>

                  {project.description && (
                    <p className="font-light leading-relaxed" style={{ color: textColor }}>
                      {project.description}
                    </p>
                  )}

                  {project.bullets.length > 0 && (
                    <div className="space-y-2">
                      {project.bullets.map(
                        (bullet, index) =>
                          bullet.trim() && (
                            <div
                              key={index}
                              className="text-sm font-light leading-relaxed"
                              style={{ color: `${textColor}dd` }}
                            >
                              {bullet}
                            </div>
                          ),
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Section - Certifications & Languages */}
        {certifications && certifications.length > 0 && languages && languages.length > 0 && (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section>
                <h3
                  className="text-lg font-light tracking-wide mb-6 text-center uppercase"
                  style={{ color: headerColor, letterSpacing: "0.2em" }}
                >
                  Certifications
                </h3>

                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-center space-y-2">
                      <h4 className="font-light" style={{ color: headerColor }}>
                        {cert.name}
                      </h4>
                      <div className="text-sm font-light" style={{ color: accentColor }}>
                        {cert.organization}
                      </div>
                      <div className="text-sm font-light" style={{ color: `${textColor}80` }}>
                        {cert.date}
                      </div>

                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-light hover:opacity-70 transition-opacity"
                          style={{ color: accentColor }}
                        >
                          Verify →
                        </a>
                      )}

                      {cert.description && (
                        <p className="text-sm font-light leading-relaxed" style={{ color: `${textColor}dd` }}>
                          {cert.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <section>
                <h3
                  className="text-lg font-light tracking-wide mb-6 text-center uppercase"
                  style={{ color: headerColor, letterSpacing: "0.2em" }}
                >
                  Languages
                </h3>

                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.id} className="text-center">
                      <div className="font-light" style={{ color: headerColor }}>
                        {lang.language}
                      </div>
                      <div className="text-sm font-light" style={{ color: accentColor }}>
                        {lang.proficiency}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 &&
          customSections.map((section) => (
            <section key={section.id}>
              <h3
                className="text-lg font-light tracking-wide mb-6 text-center uppercase"
                style={{ color: headerColor, letterSpacing: "0.2em" }}
              >
                {section.title}
              </h3>
              <div className="text-center max-w-3xl mx-auto">
                <div className="whitespace-pre-line font-light leading-relaxed" style={{ color: textColor }}>
                  {section.content}
                </div>
              </div>
            </section>
          ))}
      </div>
    </div>
  )
}

export default MinimalistTemplate
