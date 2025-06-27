import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "./ResumeContext";

const SummaryForm = () => {
  const { resume, updateSummary } = useResume();
  const summary = resume.summary?.summary || "";

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold mb-1">Professional Summary</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Write a compelling summary that highlights your skills and experience.
          This is often the first thing employers read.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={handleInputChange}
            placeholder="Experienced software developer with 5+ years of expertise in developing web applications using modern frontend frameworks..."
            className="min-h-[200px]"
          />
          
          <div className="flex justify-between mt-2">
            <p className="text-sm text-muted-foreground">
              Aim for 3-5 sentences that highlight your most relevant qualifications.
            </p>
            <p className="text-sm text-muted-foreground">
              {summary.length} characters
            </p>
          </div>
        </div>

        <div className="bg-muted p-4 border border-gray-300 rounded-md mt-4">
          <h3 className="font-medium text-sm mb-2">Writing Tips</h3>
          <ul className="text-sm bg-gray-20 p-2 space-y-2 list-disc list-inside text-muted-foreground">
            <li>Focus on your most impressive achievements and valuable skills</li>
            <li>Use industry-specific keywords that might appear in job descriptions</li>
            <li>Quantify your achievements when possible (e.g., "increased sales by 20%")</li>
            <li>Keep it concise and impactful - recruiters spend seconds scanning resumes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
