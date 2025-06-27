import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash, GripVertical, Globe } from "lucide-react";
import { useResume, CertificationItem } from "./ResumeContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CertificationsForm = () => {
  const { resume, addCertification, updateCertification, removeCertification } =
    useResume();

  const { certifications = [] } = resume;

  const handleInputChange = (
    id: string,
    field: keyof CertificationItem,
    value: string
  ) => {
    updateCertification(id, { [field]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">Certifications</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Add professional certifications and credentials to showcase your
          qualifications.
        </p>
      </div>

      <div className="space-y-6">
        {certifications.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-border rounded-md bg-muted/50">
            <h3 className="font-medium text-sm mb-2">No certifications added yet</h3>
              <p className="text-xs text-muted-foreground mb-4">
              Add certifications to demonstrate your expertise and credentials.
            </p>
            <Button onClick={addCertification} className="border border-gray-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {certifications.map((certification) => (
              <AccordionItem
                key={certification.id}
                value={certification.id}
                className="border border-border rounded-md overflow-hidden"
              >
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 mx-2 text-muted-foreground" />
                  <AccordionTrigger className="flex-1 hover:no-underline py-4">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">
                        {certification.name || "New Certification"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {certification.organization || "Organization"}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCertification(certification.id);
                    }}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>

                <AccordionContent className="pt-2">
                  <div className="flex flex-col gap-4 p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${certification.id}`}>
                        Certification Name
                      </Label>
                      <Input
                        id={`name-${certification.id}`}
                        value={certification.name}
                        onChange={(e) =>
                          handleInputChange(
                            certification.id,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="AWS Certified Solutions Architect"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`organization-${certification.id}`}>
                        Issuing Organization
                      </Label>
                      <Input
                        id={`organization-${certification.id}`}
                        value={certification.organization}
                        onChange={(e) =>
                          handleInputChange(
                            certification.id,
                            "organization",
                            e.target.value
                          )
                        }
                        placeholder="Amazon Web Services"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`date-${certification.id}`}>
                        Issue Date
                      </Label>
                      <Input
                        id={`date-${certification.id}`}
                        value={certification.date}
                        onChange={(e) =>
                          handleInputChange(
                            certification.id,
                            "date",
                            e.target.value
                          )
                        }
                        placeholder="May 2022"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`url-${certification.id}`}>
                        URL (Optional)
                      </Label>
                      <div className="relative">
                        <Input
                          id={`url-${certification.id}`}
                          value={certification.url || ""}
                          onChange={(e) =>
                            handleInputChange(
                              certification.id,
                              "url",
                              e.target.value
                            )
                          }
                          placeholder="https://verify.example.com/cert"
                          className="pl-10"
                        />
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`description-${certification.id}`}>
                        Description (Optional)
                      </Label>
                      <Textarea
                        id={`description-${certification.id}`}
                        value={certification.description || ""}
                        onChange={(e) =>
                          handleInputChange(
                            certification.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Brief description of the certification and what it demonstrates"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <Button
          variant={certifications.length === 0 ? "default" : "outline"}
          onClick={addCertification}
          className={certifications.length === 0 ? "hidden" : ""}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Certification
        </Button>
      </div>

      {certifications.length > 0 && (
        <div className="bg-muted p-4 rounded-md border border-border mt-6">
          <h3 className="font-medium text-sm mb-2">Tips for Certifications Section</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• List certifications relevant to the job you're applying for</li>
            <li>• Include well-known industry certifications rather than minor courses</li>
            <li>• Add the certification number or verification URL if available</li>
            <li>• Mention if the certification is in progress with expected completion date</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
