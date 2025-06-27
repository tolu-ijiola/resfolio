import React, { useState } from 'react';
import { usePortfolio } from '@/lib/portfolio-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Plus, X, FileText } from 'lucide-react';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  initialProject?: ProjectItem;
  isEditing?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  open, 
  onClose, 
  initialProject,
  isEditing = false
}) => {
  const { dispatch } = usePortfolio();
  
  const [project, setProject] = useState<ProjectItem>(
    initialProject || {
      id: uuidv4(),
      title: '',
      description: '',
      technologies: [''],
      featured: false
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setProject(prev => ({ ...prev, featured: checked }));
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...project.technologies];
    newTechnologies[index] = value;
    setProject(prev => ({ ...prev, technologies: newTechnologies }));
  };

  const addTechnology = () => {
    setProject(prev => ({ 
      ...prev, 
      technologies: [...prev.technologies, ''] 
    }));
  };

  const removeTechnology = (index: number) => {
    const newTechnologies = [...project.technologies];
    newTechnologies.splice(index, 1);
    setProject(prev => ({ ...prev, technologies: newTechnologies }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty technologies
    const filteredTechnologies = project.technologies.filter(t => t.trim() !== '');
    const finalProject = { ...project, technologies: filteredTechnologies };
    
    if (isEditing) {
      dispatch({ 
        type: "UPDATE_PROJECT", 
        payload: {
          id: finalProject.id,
          data: finalProject
        }
      });
    } else {
      dispatch({ 
        type: "ADD_PROJECT", 
        payload: finalProject 
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update your project details.' 
              : 'Add details about a project you\'ve worked on.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={project.title}
              onChange={handleChange}
              required
              placeholder="e.g. Portfolio Website"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={project.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your project"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="link">Project Link (Optional)</Label>
            <Input
              id="link"
              name="link"
              type="url"
              value={project.link || ''}
              onChange={handleChange}
              placeholder="e.g. https://myproject.com"
            />
          </div>
          
          <div>
            <Label htmlFor="github">GitHub Link (Optional)</Label>
            <Input
              id="github"
              name="github"
              type="url"
              value={project.github || ''}
              onChange={handleChange}
              placeholder="e.g. https://github.com/username/project"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={project.featured}
              onCheckedChange={handleFeaturedChange}
            />
            <Label htmlFor="featured">Feature this project</Label>
          </div>
          
          <div>
            <Label className="flex justify-between items-center">
              Technologies Used
              <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                onClick={addTechnology}
                className="h-8 px-2 text-xs"
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </Label>
            
            <div className="space-y-2 mt-2">
              {project.technologies.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tech}
                    onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    placeholder={`Technology ${index + 1}`}
                  />
                  <Button 
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeTechnology(index)}
                    disabled={project.technologies.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update' : 'Add'} Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
