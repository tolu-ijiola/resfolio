import React, { useState } from 'react';
import { usePortfolio } from '@/lib/portfolio-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EducationItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { School } from 'lucide-react';

interface EducationFormProps {
  open: boolean;
  onClose: () => void;
  initialEducation?: EducationItem;
  isEditing?: boolean;
}

const EducationForm: React.FC<EducationFormProps> = ({ 
  open, 
  onClose, 
  initialEducation,
  isEditing = false
}) => {
  const { dispatch } = usePortfolio();
  
  const [education, setEducation] = useState<EducationItem>(
    initialEducation || {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEducation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      dispatch({ 
        type: "UPDATE_EDUCATION", 
        payload: {
          id: education.id,
          data: education
        }
      });
    } else {
      dispatch({ 
        type: "ADD_EDUCATION", 
        payload: education 
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto" >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <School className="h-5 w-5" />
            {isEditing ? 'Edit Education' : 'Add New Education'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update your education details.' 
              : 'Add details about your educational background.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              name="institution"
              value={education.institution}
              onChange={handleChange}
              required
              placeholder="e.g. Stanford University"
            />
          </div>
          
          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              name="degree"
              value={education.degree}
              onChange={handleChange}
              required
              placeholder="e.g. Bachelor of Science"
            />
          </div>
          
          <div>
            <Label htmlFor="field">Field of Study</Label>
            <Input
              id="field"
              name="field"
              value={education.field}
              onChange={handleChange}
              required
              placeholder="e.g. Computer Science"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={education.startDate}
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
                value={education.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={education.description || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Additional information about your education"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update' : 'Add'} Education
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EducationForm;
