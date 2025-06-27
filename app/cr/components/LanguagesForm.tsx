import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash, GripVertical } from "lucide-react";
import { useResume, LanguageItem } from "./ResumeContext";
import {
  Select,   
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguagesForm = () => {
  const { resume, addLanguage, updateLanguage, removeLanguage } = useResume();

  const { languages = [] } = resume;

  const handleInputChange = (
    id: string,
    field: keyof LanguageItem,
    value: string
  ) => {
    updateLanguage(id, { [field]: value });
  };

  const proficiencyLevels = [
    "Elementary",
    "Limited",
    "Professional",
    "Full Professional",
    "Native",
  ] as const;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">Languages</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Add languages you can speak and your proficiency level.
        </p>
      </div>

      <div className="space-y-6">
        {languages.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-border rounded-md bg-muted/50">
            <h3 className="font-medium text-sm mb-2">No languages added yet</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Add languages to showcase your communication skills.
            </p>
            <Button onClick={addLanguage} className="border border-gray-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Language
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center space-x-4 p-4 border border-border rounded-md"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                
                <div className="flex-1 grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`language-${lang.id}`}>Language</Label>
                    <Input
                      id={`language-${lang.id}`}
                      value={lang.language}
                      onChange={(e) =>
                        handleInputChange(lang.id, "language", e.target.value)
                      }
                      placeholder="English"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`proficiency-${lang.id}`}>
                      Proficiency Level
                    </Label>
                    <Select
                      value={lang.proficiency}
                      onValueChange={(value) =>
                        handleInputChange(
                          lang.id,
                          "proficiency",
                          value as any
                        )
                      }
                    >
                      <SelectTrigger id={`proficiency-${lang.id}`}>
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeLanguage(lang.id)}
                  disabled={languages.length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          variant={languages.length === 0 ? "default" : "outline"}
          onClick={addLanguage}
          className={languages.length === 0 ? "hidden" : ""}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Language
        </Button>
      </div>

      {languages.length > 0 && (
        <div className="bg-muted p-4 rounded-md border border-border mt-6">
          <h3 className="font-medium text-sm mb-2">Proficiency Level Guide</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• <span className="font-medium">Elementary:</span> Basic vocabulary and phrases</li>
            <li>• <span className="font-medium">Limited:</span> Handle basic conversations with some difficulty</li>
            <li>• <span className="font-medium">Professional:</span> Converse comfortably on a wide range of topics</li>
            <li>• <span className="font-medium">Full Professional:</span> Near-native proficiency for professional purposes</li>
            <li>• <span className="font-medium">Native:</span> Native or bilingual proficiency</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguagesForm;
