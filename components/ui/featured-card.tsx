import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedCard from './animated-card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  className, 
  delay = 0 
}: FeatureCardProps) => {
  return (
    <AnimatedCard
      delay={delay}
      className={cn("bg-finpay-card p-6 rounded-2xl shadow-sm", className)}
    >
      <div className="mb-4">
      <div className="w-12 h-12 bg-teal-50 text-teal-800 rounded-lg flex items-center justify-center">
        {icon}</div>
        </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </AnimatedCard>
  );
};

export default FeatureCard;
