import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useResume } from "./ResumeContext";
import Link from "next/link";

interface EditorNavbarProps {
  children?: React.ReactNode;
}

const EditorNavbar: React.FC<EditorNavbarProps> = ({ children }) => {
  const { resume, saveResume, setResume } = useResume();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(resume.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    saveResume();
  };

  const handleNameSave = () => {
    setResume((prev) => ({ ...prev, name }));
    setEditing(false);
  };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 sm:px-6 bg-card no-print">
      <div className="flex items-center">
        <Link href="/px/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="flex flex-col">
          {editing ? (
            <input
              ref={inputRef}
              className="font-bold text-lg truncate max-w-[200px] border-b border-primary focus:outline-none bg-transparent"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleNameSave();
                }
              }}
              autoFocus
            />
          ) : (
            <span
              className="font-bold text-lg truncate max-w-[200px] cursor-pointer hover:underline"
              onClick={() => setEditing(true)}
              title="Click to edit resume name"
            >
              {resume.name}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            Last saved: {new Date(resume.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
      
      <Button size="sm" className="bg-teal-800 text-white" onClick={handleSave}>
        Save Changes
      </Button>
    </header>
  );
};

export default EditorNavbar;
