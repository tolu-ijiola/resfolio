// components/TemplateChooserModal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  List,
  Layout,
  Highlighter,
} from 'lucide-react';

type TemplateOption = {
  id: 'modern' | 'minimalist' | 'elegant';
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const OPTIONS: TemplateOption[] = [
  {
    id: 'modern',
    title: 'Modern Template',
    Icon: List,
  },
  {
    id: 'minimalist',
    title: 'Minimalist Template',
    Icon: Layout,
  },
  {
    id: 'elegant',
    title: 'Elegant Template',
    Icon: Highlighter,
  },
];

export function TemplateChooserModal() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TemplateOption['id']>('modern');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs">Use Template</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className=' text-2xl'>Choose template</DialogTitle>
          <DialogDescription>
            Select a template to start building your resume.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {OPTIONS.map((opt) => {
            const isActive = opt.id === selected;
            return (
              <div
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`
                  cursor-pointer select-none rounded-lg border
                  p-4 flex flex-col items-start gap-2
                  ${isActive
                    ? 'border-primary bg-green-50'
                    : 'border-gray-200 hover:border-gray-400'}
                `}
              >
                <opt.Icon
                  className={`w-8 h-8 ${isActive ? 'text-primary' : 'text-gray-400'}`}
                />
                <h4 className={` font-medium ${isActive ? 'text-primary' : 'text-gray-900'}`}>
                  {opt.title}
                </h4>
              </div>
            );
          })}
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            // handle “Next” (e.g. advance step)
            console.log('Selected template:', selected);
          }}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
