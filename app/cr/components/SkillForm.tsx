import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash, GripVertical, Edit } from "lucide-react";
import { useResume, SkillItem } from "./ResumeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SkillsForm = () => {
  const {
    resume,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addSkill,
    updateSkill,
    removeSkill,
  } = useResume();

  const [editingCategory, setEditingCategory] = React.useState<{
    id: string;
    name: string;
  } | null>(null);
  const [tempCategoryName, setTempCategoryName] = React.useState("");

  const handleCategoryNameChange = (name: string) => {
    setTempCategoryName(name);
  };

  const handleSaveCategory = () => {
    if (editingCategory && tempCategoryName.trim()) {
      updateSkillCategory(editingCategory.id, tempCategoryName.trim());
      setEditingCategory(null);
      setTempCategoryName("");
    }
  };

  const handleEditCategory = (category: { id: string; name: string }) => {
    setEditingCategory(category);
    setTempCategoryName(category.name);
  };

  const handleSkillChange = (
    categoryId: string,
    skillId: string,
    field: keyof SkillItem,
    value: string
  ) => {
    updateSkill(categoryId, skillId, { [field]: value });
  };

  const skillLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
    "Master",
  ] as const;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">Skills</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Add your technical and soft skills, categorized by type.
        </p>
      </div>

      <div className="space-y-6">
        {resume.skills.categories.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-border rounded-md bg-muted/50">
            <h3 className="font-medium text-sm mb-2">No skill categories added yet</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Organize your skills into categories like "Technical Skills" or "Soft Skills"
            </p>
            <Button onClick={addSkillCategory} className="border border-gray-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Skill Category
            </Button>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {resume.skills.categories.map((category) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="border border-border rounded-md overflow-hidden"
              >
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 mx-2 text-muted-foreground" />
                  <AccordionTrigger className="flex-1 hover:no-underline py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{category.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCategory({
                            id: category.id,
                            name: category.name,
                          });
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </AccordionTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSkillCategory(category.id);
                    }}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>

                <AccordionContent>
                  <div className="p-4">
                    {category.skills.length === 0 ? (
                      <div className="text-center p-4 border border-dashed border-border rounded-md">
                        <p className="text-sm text-muted-foreground mb-2">
                          No skills added to this category yet
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addSkill(category.id)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Skill
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col gap-4">
                          {category.skills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex items-center space-x-2 p-2 border border-border rounded-md"
                            >
                              <div className="flex-1 grid gap-2">
                                <Input
                                  value={skill.name}
                                  onChange={(e) =>
                                    handleSkillChange(
                                      category.id,
                                      skill.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Skill name"
                                  className="col-span-1"
                                />
                                <Select
                                  value={skill.level || "Intermediate"}
                                  onValueChange={(value) =>
                                    handleSkillChange(
                                      category.id,
                                      skill.id,
                                      "level",
                                      value as any
                                    )
                                  }
                                >
                                  <SelectTrigger className="col-span-1">
                                    <SelectValue placeholder="Level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {skillLevels.map((level) => (
                                      <SelectItem key={level} value={level}>
                                        {level}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSkill(category.id, skill.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(category.id)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Skill
                        </Button>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <Button
          variant={resume.skills.categories.length === 0 ? "default" : "outline"}
          onClick={addSkillCategory}
          className={resume.skills.categories.length === 0 ? "hidden" : ""}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill Category
        </Button>
      </div>

      {/* Dialog for editing category name */}
      <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => {
          if (!open) {
            setEditingCategory(null);
            setTempCategoryName("");
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={tempCategoryName}
              onChange={(e) => handleCategoryNameChange(e.target.value)}
              placeholder="e.g., Technical Skills"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingCategory(null);
                setTempCategoryName("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-muted p-4 rounded-md border border-border mt-6">
        <h3 className="font-medium text-sm mb-2">Tips for Skills Section</h3>
        <ul className="text-sm space-y-2 text-muted-foreground">
          <li>• Categorize skills by type (e.g., Technical, Languages, Software)</li>
          <li>• Focus on relevant skills for the job you're applying to</li>
          <li>• Include both technical (hard) skills and soft skills</li>
          <li>• Be honest about your skill levels</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;
