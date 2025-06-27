import React, { useState } from 'react';
import { usePortfolio } from '@/lib/portfolio-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TestimonialItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Award } from 'lucide-react';

interface TestimonialFormProps {
  open: boolean;
  onClose: () => void;
  initialTestimonial?: TestimonialItem;
  isEditing?: boolean;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ 
  open, 
  onClose, 
  initialTestimonial,
  isEditing = false
}) => {
  const { dispatch } = usePortfolio();
  
  const [testimonial, setTestimonial] = useState<TestimonialItem>(
    initialTestimonial || {
      id: uuidv4(),
      text: '',
      author: '',
      position: '',
      company: '',
      rating: 5
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: number[]) => {
    setTestimonial(prev => ({ ...prev, rating: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      dispatch({ 
        type: "UPDATE_TESTIMONIAL", 
        payload: {
          id: testimonial.id,
          data: testimonial
        }
      });
    } else {
      dispatch({ 
        type: "ADD_TESTIMONIAL", 
        payload: testimonial 
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update testimonial details.' 
              : 'Add a testimonial from someone who has worked with you.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="text">Testimonial</Label>
            <Textarea
              id="text"
              name="text"
              value={testimonial.text}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter the testimonial text here"
            />
          </div>
          
          <div>
            <Label htmlFor="author">Author Name</Label>
            <Input
              id="author"
              name="author"
              value={testimonial.author}
              onChange={handleChange}
              required
              placeholder="e.g. Jane Smith"
            />
          </div>
          
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={testimonial.position}
              onChange={handleChange}
              required
              placeholder="e.g. CEO"
            />
          </div>
          
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={testimonial.company}
              onChange={handleChange}
              required
              placeholder="e.g. Acme Inc."
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="rating">Rating</Label>
              <span className="text-sm text-muted-foreground">{testimonial.rating}/5</span>
            </div>
            <Slider
              id="rating"
              value={[testimonial.rating]}
              min={1}
              max={5}
              step={1}
              onValueChange={handleRatingChange}
            />
            <div className="flex justify-between mt-1">
              {Array(5).fill(0).map((_, i) => (
                <span 
                  key={i} 
                  className={`text-lg ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                >★</span>
              ))}
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update' : 'Add'} Testimonial
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;
