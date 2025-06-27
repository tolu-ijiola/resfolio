import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash, GripVertical, Globe } from "lucide-react";
import { useResume, ProjectItem } from "./ResumeContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProjectsForm = () => {
  const {
    resume,
    addProject,
    updateProject,
    removeProject,
    addProjectBullet,
    updateProjectBullet,
    removeProjectBullet,
  } = useResume();

  const { projects = [] } = resume;

  const handleInputChange = (
    id: string,
    field: keyof ProjectItem,
    value: string
  ) => {
    updateProject(id, { [field]: value });
  };

  const handleBulletChange = (
    projectId: string,
    index: number,
    value: string
  ) => {
    updateProjectBullet(projectId, index, value);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">Projects</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Showcase your notable projects, personal or professional.
        </p>
      </div>

      <div className="space-y-6">
        {projects.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-border rounded-md bg-muted/50">
            <h3 className="font-medium text-sm mb-2">No projects added yet</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Add projects to demonstrate your skills and experience.
            </p>
            <Button onClick={addProject} className="border border-gray-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {projects.map((project) => (
              <AccordionItem
                key={project.id}
                value={project.id}
                className="border border-border rounded-md overflow-hidden"
              >
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 mx-2 text-muted-foreground" />
                  <AccordionTrigger className="flex-1 hover:no-underline py-4">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">
                        {project.name || "New Project"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {project.description
                          ? project.description.slice(0, 50) +
                            (project.description.length > 50 ? "..." : "")
                          : "No description"}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(project.id);
                    }}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>

                <AccordionContent className="pt-2">
                  <div className="flex flex-col gap-4 p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                      <Input
                        id={`name-${project.id}`}
                        value={project.name}
                        onChange={(e) =>
                          handleInputChange(project.id, "name", e.target.value)
                        }
                        placeholder="E-commerce Website"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`url-${project.id}`}>
                        Project URL (Optional)
                      </Label>
                      <div className="relative">
                        <Input
                          id={`url-${project.id}`}
                          value={project.url || ""}
                          onChange={(e) =>
                            handleInputChange(project.id, "url", e.target.value)
                          }
                          placeholder="https://project-example.com"
                          className="pl-10"
                        />
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${project.id}`}>
                        Start Date (Optional)
                      </Label>
                      <Input
                        id={`startDate-${project.id}`}
                        value={project.startDate || ""}
                        onChange={(e) =>
                          handleInputChange(
                            project.id,
                            "startDate",
                            e.target.value
                          )
                        }
                        placeholder="Jan 2022"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${project.id}`}>
                        End Date (Optional)
                      </Label>
                      <Input
                        id={`endDate-${project.id}`}
                        value={project.endDate || ""}
                        onChange={(e) =>
                          handleInputChange(
                            project.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        placeholder="Present"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`description-${project.id}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`description-${project.id}`}
                        value={project.description}
                        onChange={(e) =>
                          handleInputChange(
                            project.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Brief overview of the project"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Key Features/Achievements</Label>
                      </div>

                      <div className="space-y-3">
                        {project.bullets.map((bullet, bulletIndex) => (
                          <div
                            key={bulletIndex}
                            className="flex items-start gap-2"
                          >
                            <div className="pt-2.5">•</div>
                            <Textarea
                              value={bullet}
                              onChange={(e) =>
                                handleBulletChange(
                                  project.id,
                                  bulletIndex,
                                  e.target.value
                                )
                              }
                              placeholder="Describe a key feature or achievement"
                              className="flex-1 min-h-[60px]"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeProjectBullet(project.id, bulletIndex)
                              }
                              disabled={project.bullets.length <= 1}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addProjectBullet(project.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Bullet Point
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <Button
          variant={projects.length === 0 ? "default" : "outline"}
          onClick={addProject}
          className={projects.length === 0 ? "hidden" : ""}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Project
        </Button>
      </div>

      {projects.length > 0 && (
        <div className="bg-muted p-4 rounded-md border border-border mt-6">
          <h3 className="font-medium text-sm mb-2">Tips for Projects Section</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Include projects that demonstrate relevant skills for the job</li>
            <li>• Mention technologies and tools used in each project</li>
            <li>• Highlight your specific contributions and role in team projects</li>
            <li>• Include measurable results or impact when possible</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
