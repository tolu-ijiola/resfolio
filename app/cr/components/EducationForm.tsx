import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash, GripVertical } from "lucide-react";
import { useResume, EducationItem } from "./ResumeContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EducationForm = () => {
  const { resume, addEducation, updateEducation, removeEducation } = useResume();

  const handleInputChange = (
    id: string,
    field: keyof EducationItem,
    value: string
  ) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">Education</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Add your educational background, starting with your most recent degree.
        </p>
      </div>

      <div className="space-y-6">
        {resume.education.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-border rounded-md bg-muted/50">
            <h3 className="font-medium text-sm mb-2">No education added yet</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Add your educational background to enhance your resume.
            </p>
            <Button onClick={addEducation} className="border border-gray-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {resume.education.map((education) => (
              <AccordionItem
                key={education.id}
                value={education.id}
                className="border border-border rounded-md overflow-hidden"
              >
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 mx-2 text-muted-foreground" />
                  <AccordionTrigger className="flex-1 hover:no-underline py-4">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">
                        {education.degree || "Degree"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {education.school || "School Name"}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEducation(education.id);
                    }}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>

                <AccordionContent className="pt-2">
                  <div className="flex flex-col gap-4 p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`school-${education.id}`}>School/University</Label>
                      <Input
                        id={`school-${education.id}`}
                        value={education.school}
                        onChange={(e) =>
                          handleInputChange(
                            education.id,
                            "school",
                            e.target.value
                          )
                        }
                        placeholder="Harvard University"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                      <Input
                        id={`degree-${education.id}`}
                        value={education.degree}
                        onChange={(e) =>
                          handleInputChange(
                            education.id,
                            "degree",
                            e.target.value
                          )
                        }
                        placeholder="Bachelor of Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`fieldOfStudy-${education.id}`}>
                        Field of Study
                      </Label>
                      <Input
                        id={`fieldOfStudy-${education.id}`}
                        value={education.fieldOfStudy}
                        onChange={(e) =>
                          handleInputChange(
                            education.id,
                            "fieldOfStudy",
                            e.target.value
                          )
                        }
                        placeholder="Computer Science"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`location-${education.id}`}>
                        Location (Optional)
                      </Label>
                      <Input
                        id={`location-${education.id}`}
                        value={education.location || ""}
                        onChange={(e) =>
                          handleInputChange(
                            education.id,
                            "location",
                            e.target.value
                          )
                        }
                        placeholder="Cambridge, MA"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${education.id}`}>
                        Start Date
                      </Label>
                      <Input
                        id={`startDate-${education.id}`}
                        value={education.startDate}
                        onChange={(e) =>
                          handleInputChange(
                            education.id,
                            "startDate",
                            e.target.value
                          )
                        }
                        placeholder="Sep 2018"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${education.id}`}>
                        End Date (or Expected)
                      </Label>
                      <Input
                        id={`endDate-${education.id}`}
                        value={education.endDate}
                        onChange={(e) =>
                          handleInputChange(
                            education.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        placeholder="May 2022"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`description-${education.id}`}>
                        Description (Optional)
                      </Label>
                      <Textarea
                        id={`description-${education.id}`}
                        value={education.description || ""}
                        onChange={(e) =>
                          handleInputChange(
                            education.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Notable achievements, GPA, honors, relevant coursework, etc."
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <Button
          variant={resume.education.length === 0 ? "default" : "outline"}
          onClick={addEducation}
          className={resume.education.length === 0 ? "hidden" : ""}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Education
        </Button>
      </div>

      {resume.education.length > 0 && (
        <div className="bg-muted p-4 rounded-md border border-border mt-6">
          <h3 className="font-medium text-sm mb-2">Tips for Education Section</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• List your most recent education first</li>
            <li>• Include relevant coursework if you're a recent graduate</li>
            <li>• Add major achievements or a high GPA (3.5+) in the description</li>
            <li>• Include study abroad experiences if applicable</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
