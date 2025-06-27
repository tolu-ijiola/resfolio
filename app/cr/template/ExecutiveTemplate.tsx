import type React from "react"
import type { ResumeData } from "../components/ResumeContext"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  FileText,
  Layers,
  Star,
  Calendar,
  ExternalLink,
  TrendingUp,
  Users,
  Target,
  Zap,
  Crown,
  Shield,
} from "lucide-react"

interface TemplateProps {
  resume: ResumeData
  styleSettings?: any
}

const ExecutiveTemplate: React.FC<TemplateProps> = ({ resume, styleSettings = {} }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, customSections } =
    resume

  const accentColor = styleSettings.accentColor || "#dc2626"
  const headerColor = styleSettings.headerColor || "#1e293b"
  const textColor = styleSettings.textColor || "#334155"

  return (
    <div
      className="bg-white text-gray-800 w-full h-full relative"
      style={{
        fontFamily: styleSettings.fontFamily || "Playfair Display, Georgia, serif",
        fontSize:
          styleSettings.fontSize === "sm"
            ? "0.875rem"
            : styleSettings.fontSize === "lg"
              ? "1.125rem"
              : styleSettings.fontSize === "xl"
                ? "1.25rem"
                : "1rem",
        fontWeight: styleSettings.fontWeight || "400",
        lineHeight:
          styleSettings.lineHeight === "normal"
            ? "1.7"
            : styleSettings.lineHeight === "relaxed"
              ? "1.8"
              : styleSettings.lineHeight === "loose"
                ? "2"
                : styleSettings.lineHeight === "tight"
                  ? "1.5"
                  : "1.7",
        color: textColor,
      }}
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 right-0 w-96 h-96"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, ${accentColor}20 0deg, transparent 60deg, ${accentColor}10 120deg, transparent 180deg, ${accentColor}15 240deg, transparent 300deg, ${accentColor}20 360deg)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Executive Header */}
        <header className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>

          <div className="relative p-12">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
                    <Crown className="h-5 w-5" style={{ color: accentColor }} />
                    <span className="text-sm font-medium uppercase tracking-wider">Executive Profile</span>
                  </div>

                  <h1
                    className="font-bold tracking-tight leading-none"
                    style={{
                      fontSize:
                        styleSettings.headerSize === "xl"
                          ? "3.5rem"
                          : styleSettings.headerSize === "2xl"
                            ? "4rem"
                            : styleSettings.headerSize === "3xl"
                              ? "4.5rem"
                              : styleSettings.headerSize === "4xl"
                                ? "5rem"
                                : "3.5rem",
                      fontFamily: "Playfair Display, Georgia, serif",
                    }}
                  >
                    {personalInfo.fullName || "Your Name"}
                  </h1>

                  <div className="flex items-center justify-center lg:justify-start space-x-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
                    <h2 className="text-2xl font-light italic" style={{ color: accentColor }}>
                      {personalInfo.jobTitle || "Executive Title"}
                    </h2>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
                  </div>
                </div>
              </div>

              {personalInfo.imageUrl && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl opacity-30"></div>
                  <div
                    className={`relative w-48 h-48 overflow-hidden border-4 border-white/30 shadow-2xl ${
                      styleSettings.imageShape === "circle"
                        ? "rounded-full"
                        : styleSettings.imageShape === "rounded"
                          ? "rounded-3xl"
                          : "rounded-2xl"
                    }`}
                  >
                    <img
                      src={personalInfo.imageUrl || "/placeholder.svg"}
                      alt={personalInfo.fullName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Executive Contact Bar */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalInfo.email && (
                <div className="group flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-300 uppercase tracking-widest font-medium">Direct Contact</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-medium text-white hover:text-red-300 transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {personalInfo.phone && (
                <div className="group flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-300 uppercase tracking-widest font-medium">Executive Line</div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm font-medium text-white hover:text-red-300 transition-colors truncate block"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {personalInfo.location && (
                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-300 uppercase tracking-widest font-medium">Location</div>
                    <div className="text-sm font-medium text-white truncate">{personalInfo.location}</div>
                  </div>
                </div>
              )}

              {personalInfo.website && (
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 shadow-lg">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-300 uppercase tracking-widest font-medium">Portfolio</div>
                    <div className="text-sm font-medium text-white hover:text-red-300 transition-colors truncate">
                      Executive Profile
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </header>

        <div className="p-12 space-y-16">
          {/* Executive Summary */}
          {summary?.summary && (
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>

              <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    Executive Summary
                  </h3>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed font-light" style={{ color: textColor }}>
                    {summary.summary}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Leadership Experience */}
          {experience.length > 0 && (
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>

              <div className="flex items-center space-x-4 mb-12">
                <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3
                  className="text-3xl font-bold"
                  style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  Leadership Experience
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent"></div>
              </div>

              <div className="space-y-12">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-orange-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8">
                        <div className="flex-1">
                          <div className="flex items-start space-x-6 mb-6">
                            <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg">
                              <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4
                                className="text-2xl font-bold mb-3"
                                style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                              >
                                {exp.position}
                              </h4>
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-xl font-semibold" style={{ color: accentColor }}>
                                  {exp.company}
                                </span>
                                {exp.location && (
                                  <>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-600 font-medium">{exp.location}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full shadow-sm">
                          <Calendar className="h-5 w-5" style={{ color: accentColor }} />
                          <span className="text-sm font-semibold whitespace-nowrap" style={{ color: headerColor }}>
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                      </div>

                      {exp.description && (
                        <div
                          className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border-l-4"
                          style={{ borderColor: accentColor }}
                        >
                          <p className="text-lg leading-relaxed font-light" style={{ color: textColor }}>
                            {exp.description}
                          </p>
                        </div>
                      )}

                      {exp.bullets.length > 0 && (
                        <div className="space-y-4">
                          <h5
                            className="text-lg font-semibold flex items-center space-x-2"
                            style={{ color: headerColor }}
                          >
                            <Shield className="h-5 w-5" style={{ color: accentColor }} />
                            <span>Key Achievements</span>
                          </h5>
                          <ul className="space-y-4">
                            {exp.bullets.map(
                              (bullet, bulletIndex) =>
                                bullet.trim() && (
                                  <li key={bulletIndex} className="flex items-start space-x-4">
                                    <div
                                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0 shadow-sm"
                                      style={{ backgroundColor: accentColor }}
                                    ></div>
                                    <span className="text-gray-700 leading-relaxed font-light">{bullet}</span>
                                  </li>
                                ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {skills.categories.length > 0 && (
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>

              <div className="flex items-center space-x-4 mb-12">
                <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3
                  className="text-3xl font-bold"
                  style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  Core Competencies
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent"></div>
              </div>

              <div className="grid gap-8">
                {skills.categories.map((category) => (
                  <div key={category.id} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <h4
                        className="text-xl font-bold"
                        style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                      >
                        {category.name}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="group relative p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-orange-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative">
                            <div className="text-base font-semibold mb-2" style={{ color: headerColor }}>
                              {skill.name}
                            </div>
                            {skill.level && (
                              <div className="text-sm font-medium" style={{ color: accentColor }}>
                                {skill.level}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Strategic Initiatives */}
          {projects && projects.length > 0 && (
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>

              <div className="flex items-center space-x-4 mb-12">
                <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3
                  className="text-3xl font-bold"
                  style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  Strategic Initiatives
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-orange-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-lg">
                            <Layers className="h-5 w-5 text-white" />
                          </div>
                          <h4
                            className="text-xl font-bold"
                            style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                          >
                            {project.name}
                          </h4>
                        </div>

                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-full hover:from-red-200 hover:to-orange-200 transition-all duration-300"
                            style={{ color: accentColor }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="text-sm font-semibold">View</span>
                          </a>
                        )}
                      </div>

                      {(project.startDate || project.endDate) && (
                        <div className="flex items-center space-x-2 mb-6">
                          <Calendar className="h-4 w-4" style={{ color: accentColor }} />
                          <span className="text-sm font-medium text-gray-600">
                            {project.startDate} {project.startDate && project.endDate && " - "} {project.endDate}
                          </span>
                        </div>
                      )}

                      {project.description && (
                        <p className="mb-6 text-gray-700 leading-relaxed font-light">{project.description}</p>
                      )}

                      {project.bullets.length > 0 && (
                        <div className="space-y-3">
                          {project.bullets.map(
                            (bullet, index) =>
                              bullet.trim() && (
                                <div key={index} className="flex items-start space-x-3">
                                  <div
                                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                    style={{ backgroundColor: accentColor }}
                                  ></div>
                                  <span className="text-gray-700 leading-relaxed font-light text-sm">{bullet}</span>
                                </div>
                              ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Credentials */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            {education.length > 0 && (
              <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>

                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-lg">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    Education
                  </h3>
                </div>

                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm">
                          <GraduationCap className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold mb-2" style={{ color: headerColor }}>
                            {edu.degree}
                          </h4>
                          <div className="text-base font-semibold" style={{ color: accentColor }}>
                            {edu.school}
                          </div>
                          {edu.fieldOfStudy && (
                            <div className="text-sm text-gray-600 font-medium">{edu.fieldOfStudy}</div>
                          )}
                          {edu.location && <div className="text-sm text-gray-500">{edu.location}</div>}
                          <div className="text-sm text-gray-500 mt-2 font-medium">
                            {edu.startDate} - {edu.endDate}
                          </div>
                        </div>
                      </div>

                      {edu.description && (
                        <p className="mt-4 text-gray-700 leading-relaxed font-light">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Credentials */}
            <div className="space-y-8">
              {certifications && certifications.length > 0 && (
                <div className="relative">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>

                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-lg">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                    >
                      Professional Credentials
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold" style={{ color: headerColor }}>
                            {cert.name}
                          </h4>
                          <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                            {cert.date}
                          </span>
                        </div>
                        <div className="text-base font-semibold mb-2" style={{ color: accentColor }}>
                          {cert.organization}
                        </div>

                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-sm font-medium hover:underline"
                            style={{ color: accentColor }}
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Verify Credential</span>
                          </a>
                        )}

                        {cert.description && (
                          <p className="mt-3 text-sm text-gray-600 leading-relaxed font-light">{cert.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {languages && languages.length > 0 && (
                <div className="relative">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>

                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-lg">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                    >
                      Languages
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {languages.map((lang) => (
                      <div key={lang.id} className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="font-bold" style={{ color: headerColor }}>
                            {lang.language}
                          </span>
                          <span
                            className="text-sm font-semibold px-3 py-1 rounded-full"
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
          </div>

          {/* Custom Sections */}
          {customSections.length > 0 &&
            customSections.map((section) => (
              <section key={section.id} className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-orange-600 rounded-full"></div>

                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3
                    className="text-3xl font-bold"
                    style={{ color: headerColor, fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    {section.title}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent"></div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-100">
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-line leading-relaxed font-light" style={{ color: textColor }}>
                      {section.content}
                    </div>
                  </div>
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ExecutiveTemplate
