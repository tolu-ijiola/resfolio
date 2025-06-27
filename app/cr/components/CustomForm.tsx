import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { useResume } from "./ResumeContext";

interface CustomFormProps {
  section: {
    id: string;
    title: string;
    type: 'text' | 'list' | 'timeline' | 'grid';
    content: string;
  };
}

const CustomForm: React.FC<CustomFormProps> = ({ section }) => {
  const { resume, setResume } = useResume();
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateSection({ title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    updateSection({ content: e.target.value });
  };

  const updateSection = (updates: { title?: string; content?: string }) => {
    const updatedResume = { ...resume };
    const sectionIndex = updatedResume.customSections.findIndex(s => s.id === section.id);
    if (sectionIndex !== -1) {
      updatedResume.customSections[sectionIndex] = {
        ...updatedResume.customSections[sectionIndex],
        ...updates
      };
      setResume(updatedResume);
    }
  };

  const renderContent = () => {
    switch (section.type) {
      case 'text':
        return (
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Enter your text content here..."
            className="min-h-[200px]"
          />
        );
      case 'list':
        return (
          <div className="space-y-2">
            {JSON.parse(content || '[]').map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...JSON.parse(content || '[]')];
                    newItems[index] = e.target.value;
                    setContent(JSON.stringify(newItems));
                    updateSection({ content: JSON.stringify(newItems) });
                  }}
                  placeholder="List item"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newItems = [...JSON.parse(content || '[]')];
                    newItems.splice(index, 1);
                    setContent(JSON.stringify(newItems));
                    updateSection({ content: JSON.stringify(newItems) });
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newItems = [...JSON.parse(content || '[]'), ''];
                setContent(JSON.stringify(newItems));
                updateSection({ content: JSON.stringify(newItems) });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        );
      case 'timeline':
        return (
          <div className="space-y-4">
            {JSON.parse(content || '[]').map((item: any, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-1 space-y-2">
                  <Input
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...JSON.parse(content || '[]')];
                      newItems[index].title = e.target.value;
                      setContent(JSON.stringify(newItems));
                      updateSection({ content: JSON.stringify(newItems) });
                    }}
                    placeholder="Title"
                  />
                  <Input
                    value={item.date}
                    onChange={(e) => {
                      const newItems = [...JSON.parse(content || '[]')];
                      newItems[index].date = e.target.value;
                      setContent(JSON.stringify(newItems));
                      updateSection({ content: JSON.stringify(newItems) });
                    }}
                    placeholder="Date"
                  />
                  <Textarea
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...JSON.parse(content || '[]')];
                      newItems[index].description = e.target.value;
                      setContent(JSON.stringify(newItems));
                      updateSection({ content: JSON.stringify(newItems) });
                    }}
                    placeholder="Description"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newItems = [...JSON.parse(content || '[]')];
                    newItems.splice(index, 1);
                    setContent(JSON.stringify(newItems));
                    updateSection({ content: JSON.stringify(newItems) });
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newItems = [...JSON.parse(content || '[]'), { title: '', date: '', description: '' }];
                setContent(JSON.stringify(newItems));
                updateSection({ content: JSON.stringify(newItems) });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Timeline Item
            </Button>
          </div>
        );
      case 'grid':
        return (
          <div className="grid grid-cols-2 gap-4">
            {JSON.parse(content || '[]').map((item: any, index: number) => (
              <div key={index} className="space-y-2">
                <Input
                  value={item.title}
                  onChange={(e) => {
                    const newItems = [...JSON.parse(content || '[]')];
                    newItems[index].title = e.target.value;
                    setContent(JSON.stringify(newItems));
                    updateSection({ content: JSON.stringify(newItems) });
                  }}
                  placeholder="Title"
                />
                <Textarea
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...JSON.parse(content || '[]')];
                    newItems[index].description = e.target.value;
                    setContent(JSON.stringify(newItems));
                    updateSection({ content: JSON.stringify(newItems) });
                  }}
                  placeholder="Description"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newItems = [...JSON.parse(content || '[]')];
                    newItems.splice(index, 1);
                    setContent(JSON.stringify(newItems));
                    updateSection({ content: JSON.stringify(newItems) });
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newItems = [...JSON.parse(content || '[]'), { title: '', description: '' }];
                setContent(JSON.stringify(newItems));
                updateSection({ content: JSON.stringify(newItems) });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Grid Item
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Input
        value={title}
        onChange={handleTitleChange}
        placeholder="Section Title"
      />
      {renderContent()}
    </div>
  );
};

export default CustomForm;
