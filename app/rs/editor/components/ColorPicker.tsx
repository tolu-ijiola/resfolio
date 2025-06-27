'use client'

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="w-8 h-8 rounded-md border border-input overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring"
          style={{ backgroundColor: color }}
          aria-label="Pick a color"
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-3">
          <div>
            <Label htmlFor="color-picker">Color</Label>
            <div className="flex mt-1 gap-2">
              <Input
                id="color-picker"
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10"
              />
              <Input
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {["#000000", "#FFFFFF", "#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"].map(
              (presetColor) => (
                <button
                  key={presetColor}
                  className="w-8 h-8 rounded-md border border-input overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => {
                    onChange(presetColor);
                    setIsOpen(false);
                  }}
                  aria-label={`Select color ${presetColor}`}
                />
              )
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
