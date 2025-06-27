import type React from "react"
import type { ResumeData } from "../components/ResumeContext"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  Award,
  Briefcase,
  GraduationCap,
  FileText,
  Layers,
  Star,
  Calendar,
  ExternalLink,
} from "lucide-react"

interface TemplateProps {
  resume: ResumeData
  styleSettings?: any
}

const TealElegantTemplate: React.FC<TemplateProps> = ({ resume, styleSettings = {} }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, customSections } =
    resume

  const accentColor = styleSettings.accentColor || "#14b8a6"
  const headerColor = styleSettings.headerColor || "#0f172a"
  const textColor = styleSettings.textColor || "#334155"

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
      className="bg-gradient-to-br from-slate-50 to-white text-gray-800 w-full h-full relative"
      style={textStyles}
    >
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full"
          style={{ background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)` }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
          style={{ background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)` }}
        ></div>
      </div>

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        {/* Sophisticated Header */}
        <header className="mb-12 relative">
          <div
            className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
            style={{ backgroundColor: accentColor }}
          ></div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h1
                  className="font-bold tracking-tight leading-tight"
                  style={{
                    fontSize:
                      styleSettings.headerSize === "xl"
                        ? "2.5rem"
                        : styleSettings.headerSize === "2xl"
                          ? "3rem"
                          : styleSettings.headerSize === "3xl"
                            ? "3.5rem"
                            : styleSettings.headerSize === "4xl"
                              ? "4rem"
                              : "2.5rem",
                    color: headerColor,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {personalInfo.fullName || "Your Name"}
                </h1>
                <div className="h-1 w-24 rounded-full" style={{ backgroundColor: accentColor }}></div>
              </div>

              <h2 className="text-xl font-medium tracking-wide" style={{ color: `${textColor}dd` }}>
                {personalInfo.jobTitle || "Professional Title"}
              </h2>
            </div>

            {personalInfo.imageUrl && (
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-30"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <div
                  className={`relative w-32 h-32 overflow-hidden border-4 border-white shadow-2xl ${
                    styleSettings.imageShape === "circle"
                      ? "rounded-full"
                      : styleSettings.imageShape === "rounded"
                        ? "rounded-2xl"
                        : "rounded-lg"
                  }`}
                >
                  <img
                    src={personalInfo.imageUrl || "/placeholder.svg"}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Elegant Contact Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personalInfo.email && (
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
                  <Mail className="h-4 w-4" style={{ color: accentColor }} />
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm font-medium hover:underline"
                  style={{ color: accentColor }}
                >
                   Send Email
                </a>
              </div>
            )}

            {personalInfo.phone && (
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
                  <Phone className="h-4 w-4" style={{ color: accentColor }} />
                </div>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-sm font-medium hover:underline"
                  style={{ color: accentColor }}
                >
                  Call Me
                </a>
              </div>
            )}

            {personalInfo.location && (
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
                  <MapPin className="h-4 w-4" style={{ color: accentColor }} />
                </div>
                <span className="text-sm font-medium">{personalInfo.location}</span>
              </div>
            )}

            {personalInfo.website && (
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
                  <Globe className="h-4 w-4" style={{ color: accentColor }} />
                </div>
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                  style={{ color: accentColor }}
                >
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {summary?.summary && (
          <section className="mb-12">
            <div className="relative">
              <div
                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              ></div>
              <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: headerColor }}>
                <User className="mr-3 h-6 w-6" style={{ color: accentColor }} />
                Professional Summary
              </h3>
              <div
                className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl shadow-lg border-l-4"
                style={{ borderColor: accentColor }}
              >
                <p className="text-lg leading-relaxed" style={{ color: textColor }}>
                  {summary.summary}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-12">
            <div className="relative">
              <div
                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              ></div>
              <h3 className="text-2xl font-bold mb-8 flex items-center" style={{ color: headerColor }}>
                <Briefcase className="mr-3 h-6 w-6" style={{ color: accentColor }} />
                Professional Experience
              </h3>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div
                      className="bg-white rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300"
                      style={{ borderColor: accentColor }}
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2" style={{ color: headerColor }}>
                            {exp.position}
                          </h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-semibold" style={{ color: accentColor }}>
                              {exp.company}
                            </span>
                            {exp.location && (
                              <>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{exp.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full">
                          <Calendar className="h-4 w-4" style={{ color: accentColor }} />
                          <span className="text-sm font-medium whitespace-nowrap">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                      </div>

                      {exp.description && <p className="mb-4 text-gray-700 leading-relaxed">{exp.description}</p>}

                      {exp.bullets.length > 0 && (
                        <ul className="space-y-2">
                          {exp.bullets.map(
                            (bullet, bulletIndex) =>
                              bullet.trim() && (
                                <li key={bulletIndex} className="flex items-start space-x-3">
                                  <div
                                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                    style={{ backgroundColor: accentColor }}
                                  ></div>
                                  <span className="text-gray-700 leading-relaxed">{bullet}</span>
                                </li>
                              ),
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mb-12">
            <div className="relative">
              <div
                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              ></div>
              <h3 className="text-2xl font-bold mb-8 flex items-center" style={{ color: headerColor }}>
                <GraduationCap className="mr-3 h-6 w-6" style={{ color: accentColor }} />
                Education
              </h3>

              <div className="grid gap-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-white rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300"
                    style={{ borderColor: accentColor }}
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-2" style={{ color: headerColor }}>
                          {edu.degree}
                        </h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg font-semibold" style={{ color: accentColor }}>
                            {edu.school}
                          </span>
                          {edu.fieldOfStudy && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-600">{edu.fieldOfStudy}</span>
                            </>
                          )}
                        </div>
                        {edu.location && <div className="text-gray-600">{edu.location}</div>}
                      </div>
                      <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full mt-4 lg:mt-0">
                        <Calendar className="h-4 w-4" style={{ color: accentColor }} />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                    </div>

                    {edu.description && <p className="mt-4 text-gray-700 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.categories.length > 0 && (
          <section className="mb-12">
            <div className="relative">
              <div
                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              ></div>
              <h3 className="text-2xl font-bold mb-8 flex items-center" style={{ color: headerColor }}>
                <Star className="mr-3 h-6 w-6" style={{ color: accentColor }} />
                Skills & Expertise
              </h3>

              <div className="grid gap-6">
                {skills.categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <h4 className="text-lg font-bold mb-4" style={{ color: headerColor }}>
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
                          style={{
                            backgroundColor: `${accentColor}15`,
                            color: accentColor,
                            border: `1px solid ${accentColor}30`,
                          }}
                        >
                          {skill.name}
                          {skill.level && <span className="ml-2 text-xs opacity-75">({skill.level})</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="mb-12">
            <div className="relative">
              <div
                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              ></div>
              <h3 className="text-2xl font-bold mb-8 flex items-center" style={{ color: headerColor }}>
                <Layers className="mr-3 h-6 w-6" style={{ color: accentColor }} />
                Featured Projects
              </h3>

              <div className="grid gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300"
                    style={{ borderColor: accentColor }}
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-xl font-bold" style={{ color: headerColor }}>
                            {project.name}
                          </h4>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-sm font-medium hover:underline"
                              style={{ color: accentColor }}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>View Project</span>
                            </a>
                          )}
                        </div>
                      </div>
                      {(project.startDate || project.endDate) && (
                        <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full">
                          <Calendar className="h-4 w-4" style={{ color: accentColor }} />
                          <span className="text-sm font-medium whitespace-nowrap">
                            {project.startDate} {project.startDate && project.endDate && " - "} {project.endDate}
                          </span>
                        </div>
                      )}
                    </div>

                    {project.description && <p className="mb-4 text-gray-700 leading-relaxed">{project.description}</p>}

                    {project.bullets.length > 0 && (
                      <ul className="space-y-2">
                        {project.bullets.map(
                          (bullet, index) =>
                            bullet.trim() && (
                              <li key={index} className="flex items-start space-x-3">
                                <div
                                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: accentColor }}
                                ></div>
                                <span className="text-gray-700 leading-relaxed">{bullet}</span>
                              </li>
                            ),
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Additional Sections */}
        {certifications && certifications.length > 0 && languages && languages.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className="relative">
                <div
                  className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: headerColor }}>
                  <Award className="mr-3 h-5 w-5" style={{ color: accentColor }} />
                  Certifications
                </h3>

                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold" style={{ color: headerColor }}>
                          {cert.name}
                        </h4>
                        <span className="text-sm bg-slate-100 px-3 py-1 rounded-full">{cert.date}</span>
                      </div>
                      <div className="text-sm" style={{ color: accentColor }}>
                        {cert.organization}
                      </div>

                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-sm mt-2 hover:underline"
                          style={{ color: accentColor }}
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Verify</span>
                        </a>
                      )}

                      {cert.description && <p className="mt-2 text-sm text-gray-600">{cert.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="relative">
                <div
                  className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: headerColor }}>
                  <Globe className="mr-3 h-5 w-5" style={{ color: accentColor }} />
                  Languages
                </h3>

                <div className="grid gap-4">
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold" style={{ color: headerColor }}>
                          {lang.language}
                        </span>
                        <span
                          className="text-sm px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${accentColor}20`,
                            color: accentColor,
                          }}
                        >
                          {lang.proficiency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 &&
          customSections.map((section) => (
            <section key={section.id} className="mb-12">
              <div className="relative">
                <div
                  className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></div>
                <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: headerColor }}>
                  <FileText className="mr-3 h-6 w-6" style={{ color: accentColor }} />
                  {section.title}
                </h3>
                <div
                  className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl shadow-lg border-l-4"
                  style={{ borderColor: accentColor }}
                >
                  <div className="whitespace-pre-line leading-relaxed" style={{ color: textColor }}>
                    {section.content}
                  </div>
                </div>
              </div>
            </section>
          ))}
      </div>
    </div>
  )
}

export default TealElegantTemplate
