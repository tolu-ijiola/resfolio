import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedCard from './animated-card';
import { MovingBorderBox } from './moving-borders';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  className?: string;
  delay?: number;
}

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  className,
  delay = 0 
}: StatCardProps) => {
  return (
    <MovingBorderBox
        borderRadius="0.75rem"
      className={cn("text-center bg-white border-none", className)}
    >
      <div className=' p-8'>
      <div className="text-4xl text-black font-bold mb-1">{value}</div>
      <p className="text-sm text-gray-700">{subtitle}</p>
      </div>
    </MovingBorderBox>
  );
};

export default StatCard;
