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
import { ExperienceItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { X, Plus, Briefcase } from 'lucide-react';

interface ExperienceFormProps {
  open: boolean;
  onClose: () => void;
  initialExperience?: ExperienceItem;
  isEditing?: boolean;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
  open, 
  onClose, 
  initialExperience,
  isEditing = false
}) => {
  const { dispatch } = usePortfolio();
  
  const [experience, setExperience] = useState<ExperienceItem>(
    initialExperience || {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
      location: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleCurrentChange = (checked: boolean) => {
    setExperience(prev => ({ 
      ...prev, 
      current: checked,
      // Clear end date if current
      endDate: checked ? '' : prev.endDate 
    }));
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...experience.achievements];
    newAchievements[index] = value;
    setExperience(prev => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    setExperience(prev => ({ 
      ...prev, 
      achievements: [...prev.achievements, ''] 
    }));
  };

  const removeAchievement = (index: number) => {
    const newAchievements = [...experience.achievements];
    newAchievements.splice(index, 1);
    setExperience(prev => ({ ...prev, achievements: newAchievements }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty achievements
    const filteredAchievements = experience.achievements.filter(a => a.trim() !== '');
    const finalExperience = { ...experience, achievements: filteredAchievements };
    
    if (isEditing) {
      dispatch({ 
        type: "UPDATE_EXPERIENCE", 
        payload: {
          id: finalExperience.id,
          data: finalExperience
        }
      });
    } else {
      dispatch({ 
        type: "ADD_EXPERIENCE", 
        payload: finalExperience 
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto"      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {isEditing ? 'Edit Experience' : 'Add New Experience'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update your work experience details.' 
              : 'Add details about your work experience.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={experience.company}
              onChange={handleChange}
              required
              placeholder="e.g. Google"
            />
          </div>
          
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={experience.position}
              onChange={handleChange}
              required
              placeholder="e.g. Software Engineer"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={experience.location || ''}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={experience.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={experience.endDate}
                onChange={handleChange}
                disabled={experience.current}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="current"
              checked={experience.current}
              onCheckedChange={handleCurrentChange}
            />
            <Label htmlFor="current">I currently work here</Label>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={experience.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your role and responsibilities"
            />
          </div>
          
          <div>
            <Label className="flex justify-between items-center">
              Achievements
              <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                onClick={addAchievement}
                className="h-8 px-2 text-xs"
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </Label>
            
            <div className="space-y-2 mt-2">
              {experience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    placeholder={`Achievement ${index + 1}`}
                  />
                  <Button 
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeAchievement(index)}
                    disabled={experience.achievements.length <= 1}
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
              {isEditing ? 'Update' : 'Add'} Experience
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceForm;
