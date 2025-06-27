import React, { useState } from 'react';
import { usePortfolio } from '@/lib/portfolio-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SkillItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Star } from 'lucide-react';

interface SkillFormProps {
  open: boolean;
  onClose: () => void;
  initialSkill?: SkillItem;
  isEditing?: boolean;
}

const SkillForm: React.FC<SkillFormProps> = ({ 
  open, 
  onClose, 
  initialSkill,
  isEditing = false
}) => {
  const { dispatch } = usePortfolio();
  
  const [skill, setSkill] = useState<SkillItem>(
    initialSkill || {
      id: uuidv4(),
      name: '',
      level: 3,
      category: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkill(prev => ({ ...prev, [name]: value }));
  };

  const handleLevelChange = (value: number[]) => {
    setSkill(prev => ({ ...prev, level: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      dispatch({ 
        type: "UPDATE_SKILL", 
        payload: {
          id: skill.id,
          data: skill
        }
      });
    } else {
      dispatch({ 
        type: "ADD_SKILL", 
        payload: skill 
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            {isEditing ? 'Edit Skill' : 'Add New Skill'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update your skill details.' 
              : 'Add details about a skill you possess.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              value={skill.name}
              onChange={handleChange}
              required
              placeholder="e.g. JavaScript"
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category (Optional)</Label>
            <Input
              id="category"
              name="category"
              value={skill.category || ''}
              onChange={handleChange}
              placeholder="e.g. Programming Languages"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="level">Proficiency Level</Label>
              <span className="text-sm text-muted-foreground">{skill.level}/5</span>
            </div>
            <Slider
              id="level"
              value={[skill.level]}
              min={1}
              max={5}
              step={1}
              onValueChange={handleLevelChange}
            />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update' : 'Add'} Skill
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillForm;
