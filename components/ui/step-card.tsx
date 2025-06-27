import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedCard from './animated-card';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const StepCard = ({ 
  number, 
  title, 
  description, 
  className,
  delay = 0 
}: StepCardProps) => {
  return (
    <AnimatedCard
      delay={delay}
      className={cn("text-white", className)}
    >
      <div className="text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white/60 to-transparent">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/80">{description}</p>
    </AnimatedCard>
  );
};

export default StepCard;