import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash, GripVertical } from "lucide-react";
import { useResume, ExperienceItem } from "./ResumeContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ExperienceForm = () => {
  const {
    resume,
    addExperience,
    updateExperience,
    removeExperience,
    addExperienceBullet,
    updateExperienceBullet,
    removeExperienceBullet,
  } = useResume();

  const handleInputChange = (
    id: string,
    field: keyof ExperienceItem,
    value: string
  ) => {
    updateExperience(id, { [field]: value });
  };

  const handleBulletChange = (
    experienceId: string,
    index: number,
    value: string
  ) => {
    updateExperienceBullet(experienceId, index, value);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">Work Experience</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Add your work history, starting with your most recent position.
        </p>
      </div>

      <div className="space-y-6">
        {resume.experience.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-border rounded-md bg-muted/50">
            <h3 className="font-medium text-sm mb-2">No experience added yet</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Start adding your work history to make your resume stand out.
            </p>
            <Button onClick={addExperience} className="border border-gray-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {resume.experience.map((experience, index) => (
              <AccordionItem
                key={experience.id}
                value={experience.id}
                className="border border-border rounded-md overflow-hidden"
              >
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 mx-2 text-muted-foreground" />
                  <AccordionTrigger className="flex-1 hover:no-underline py-4">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">
                        {experience.position || "New Position"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {experience.company || "Company Name"}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(experience.id);
                    }}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>

                <AccordionContent className="pt-2">
                  <div className=" flex flex-col gap-4 p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`position-${experience.id}`}>
                        Job Title
                      </Label>
                      <Input
                        id={`position-${experience.id}`}
                        value={experience.position}
                        onChange={(e) =>
                          handleInputChange(
                            experience.id,
                            "position",
                            e.target.value
                          )
                        }
                        className="w-full"
                        placeholder="Software Developer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`company-${experience.id}`}>
                        Company
                      </Label>
                      <Input
                        id={`company-${experience.id}`}
                        value={experience.company}
                        onChange={(e) =>
                          handleInputChange(
                            experience.id,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${experience.id}`}>
                        Start Date
                      </Label>
                      <Input
                        id={`startDate-${experience.id}`}
                        value={experience.startDate}
                        onChange={(e) =>
                          handleInputChange(
                            experience.id,
                            "startDate",
                            e.target.value
                          )
                        }
                        placeholder="Jun 2020"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${experience.id}`}>
                        End Date
                      </Label>
                      <Input
                        id={`endDate-${experience.id}`}
                        value={experience.endDate}
                        onChange={(e) =>
                          handleInputChange(
                            experience.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        placeholder="Present"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`location-${experience.id}`}>
                        Location
                      </Label>
                      <Input
                        id={`location-${experience.id}`}
                        value={experience.location || ""}
                        onChange={(e) =>
                          handleInputChange(
                            experience.id,
                            "location",
                            e.target.value
                          )
                        }
                        placeholder="New York, NY"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`description-${experience.id}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`description-${experience.id}`}
                        value={experience.description}
                        onChange={(e) =>
                          handleInputChange(
                            experience.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Brief description of your role and responsibilities"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Key Achievements/Responsibilities</Label>
                      </div>

                      <div className="space-y-3">
                        {experience.bullets.map((bullet, bulletIndex) => (
                          <div
                            key={bulletIndex}
                            className="flex items-start gap-2"
                          >
                            <div className="pt-2.5">•</div>
                            <Textarea
                              value={bullet}
                              onChange={(e) =>
                                handleBulletChange(
                                  experience.id,
                                  bulletIndex,
                                  e.target.value
                                )
                              }
                              placeholder="Describe a key achievement or responsibility"
                              className="flex-1 min-h-[60px]"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeExperienceBullet(
                                  experience.id,
                                  bulletIndex
                                )
                              }
                              disabled={experience.bullets.length <= 1}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addExperienceBullet(experience.id)}
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
          variant={resume.experience.length === 0 ? "default" : "outline"}
          onClick={addExperience}
          className={resume.experience.length === 0 ? "hidden" : ""}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Experience
        </Button>
      </div>

      {resume.experience.length > 0 && (
        <div className="bg-muted p-4 rounded-md border border-border mt-6">
          <h3 className="font-medium text-sm mb-2">Tips for Work Experience</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Use action verbs like "developed," "led," or "managed" to start bullet points</li>
            <li>• Quantify achievements when possible (e.g., "increased sales by 20%")</li>
            <li>• Focus on your accomplishments rather than just listing duties</li>
            <li>• Include relevant experience for the position you're applying for</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
