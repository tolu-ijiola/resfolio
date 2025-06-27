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
  Code,
  Zap,
  Target,
} from "lucide-react"

interface TemplateProps {
  resume: ResumeData
  styleSettings?: any
}

const ModernTemplate: React.FC<TemplateProps> = ({ resume, styleSettings = {} }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, customSections } =
    resume

  const accentColor = styleSettings.accentColor || "#8b5cf6"
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
      className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white w-full h-full relative"
      style={textStyles}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 animate-pulse"
          style={{ background: `radial-gradient(circle, #06b6d4 0%, transparent 70%)`, animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 animate-pulse"
          style={{ background: `radial-gradient(circle, #f59e0b 0%, transparent 70%)`, animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 p-8 max-w-6xl mx-auto">
        {/* Futuristic Header */}
        <header className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"></div>

          <div className="relative p-8 backdrop-blur-sm border border-white/10 rounded-3xl">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                    <Zap className="h-4 w-4" style={{ color: accentColor }} />
                    <span>Available for opportunities</span>
                  </div>

                  <h1
                    className="font-bold tracking-tight leading-none bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
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
                    }}
                  >
                    {personalInfo.fullName || "Your Name"}
                  </h1>

                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
                    <h2 className="text-xl font-medium" style={{ color: accentColor }}>
                      {personalInfo.jobTitle || "Professional Title"}
                    </h2>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400"></div>
                  </div>
                </div>
              </div>

              {personalInfo.imageUrl && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div
                    className={`relative w-40 h-40 overflow-hidden border-4 border-white/20 backdrop-blur-sm ${
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
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Futuristic Contact Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Email</div>
                    <div className="text-sm font-medium truncate">{personalInfo.email}</div>
                  </div>
                </a>
              )}

              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="group flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Phone</div>
                    <div className="text-sm font-medium truncate">{personalInfo.phone}</div>
                  </div>
                </a>
              )}

              {personalInfo.location && (
                <div className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Location</div>
                    <div className="text-sm font-medium truncate">{personalInfo.location}</div>
                  </div>
                </div>
              )}

              {personalInfo.website && (
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Portfolio</div>
                    <div className="text-sm font-medium truncate">View Work</div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Summary */}
        {summary?.summary && (
          <section className="mb-16">
            <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
              <div className="absolute top-4 left-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5" style={{ color: accentColor }} />
                  <span className="text-sm font-medium uppercase tracking-wider" style={{ color: accentColor }}>
                    Mission
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-lg leading-relaxed text-gray-200">{summary.summary}</p>
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <Briefcase className="h-6 w-6" style={{ color: accentColor }} />
              <h3 className="text-2xl font-bold">Experience</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
            </div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                            <Briefcase className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-2">{exp.position}</h4>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg font-semibold" style={{ color: accentColor }}>
                                {exp.company}
                              </span>
                              {exp.location && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-gray-300">{exp.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                        <Calendar className="h-4 w-4" style={{ color: accentColor }} />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                    </div>

                    {exp.description && <p className="mb-6 text-gray-200 leading-relaxed">{exp.description}</p>}

                    {exp.bullets.length > 0 && (
                      <ul className="space-y-3">
                        {exp.bullets.map(
                          (bullet, bulletIndex) =>
                            bullet.trim() && (
                              <li key={bulletIndex} className="flex items-start space-x-3">
                                <div
                                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: accentColor }}
                                ></div>
                                <span className="text-gray-200 leading-relaxed">{bullet}</span>
                              </li>
                            ),
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.categories.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <Star className="h-6 w-6" style={{ color: accentColor }} />
              <h3 className="text-2xl font-bold">Skills & Technologies</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
            </div>

            <div className="grid gap-8">
              {skills.categories.map((category) => (
                <div key={category.id} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                    <div className="flex items-center space-x-3 mb-6">
                      <Code className="h-5 w-5" style={{ color: accentColor }} />
                      <h4 className="text-lg font-bold">{category.name}</h4>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="group/skill relative p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative">
                            <div className="text-sm font-medium mb-1">{skill.name}</div>
                            {skill.level && (
                              <div className="text-xs" style={{ color: accentColor }}>
                                {skill.level}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <Layers className="h-6 w-6" style={{ color: accentColor }} />
              <h3 className="text-2xl font-bold">Featured Projects</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl">
                          <Layers className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="text-xl font-bold">{project.name}</h4>
                      </div>

                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                          style={{ color: accentColor }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm font-medium">View</span>
                        </a>
                      )}
                    </div>

                    {(project.startDate || project.endDate) && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Calendar className="h-4 w-4" style={{ color: accentColor }} />
                        <span className="text-sm text-gray-300">
                          {project.startDate} {project.startDate && project.endDate && " - "} {project.endDate}
                        </span>
                      </div>
                    )}

                    {project.description && <p className="mb-6 text-gray-200 leading-relaxed">{project.description}</p>}

                    {project.bullets.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.bullets.map(
                          (bullet, index) =>
                            bullet.trim() && (
                              <span
                                key={index}
                                className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                              >
                                {bullet}
                              </span>
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

        {/* Education & Additional Info */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <GraduationCap className="h-6 w-6" style={{ color: accentColor }} />
                <h3 className="text-xl font-bold">Education</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{edu.degree}</h4>
                        <div className="text-sm" style={{ color: accentColor }}>
                          {edu.school}
                        </div>
                        {edu.fieldOfStudy && <div className="text-sm text-gray-300">{edu.fieldOfStudy}</div>}
                        <div className="text-xs text-gray-400 mt-2">
                          {edu.startDate} - {edu.endDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Languages */}
          <div className="space-y-8">
            {certifications && certifications.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="h-6 w-6" style={{ color: accentColor }} />
                  <h3 className="text-xl font-bold">Certifications</h3>
                </div>

                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{cert.name}</h4>
                        <span className="text-xs text-gray-400">{cert.date}</span>
                      </div>
                      <div className="text-sm" style={{ color: accentColor }}>
                        {cert.organization}
                      </div>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-xs mt-2 hover:underline"
                          style={{ color: accentColor }}
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Verify</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {languages && languages.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Globe className="h-6 w-6" style={{ color: accentColor }} />
                  <h3 className="text-xl font-bold">Languages</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center"
                    >
                      <div className="font-medium mb-1">{lang.language}</div>
                      <div className="text-sm" style={{ color: accentColor }}>
                        {lang.proficiency}
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
            <section key={section.id} className="mb-16">
              <div className="flex items-center space-x-3 mb-8">
                <FileText className="h-6 w-6" style={{ color: accentColor }} />
                <h3 className="text-2xl font-bold">{section.title}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
              </div>
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
                <div className="whitespace-pre-line leading-relaxed text-gray-200">{section.content}</div>
              </div>
            </section>
          ))}
      </div>
    </div>
  )
}

export default ModernTemplate
