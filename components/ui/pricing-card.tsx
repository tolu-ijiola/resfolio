import { ArrowRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedCard from './animated-card';

interface PricingCardProps {
    title: string;
    price: string;
    isPrimary?: boolean;
    className?: string;
    delay?: number;
}

const PricingCard = ({
    title,
    price,
    isPrimary = false,
    className,
    delay = 0
}: PricingCardProps) => {
    return (
        <AnimatedCard
            delay={delay}
            className={cn(
                "p-6 rounded-2xl h-40 transition-all duration-300 hover:shadow-md",
                isPrimary
                    ? "bg-teal-800 text-white"
                    : "bg-gray-200",
                className
            )}
        >
            <div className='flex flex-col h-full justify-between'>
                <h3 className="text-xl font-semibold mb-1">{title}</h3>
                <div className="flex items-center justify-between w-full flex-1">
                    <p className={isPrimary ? "text-white/90" : "text-gray-600"}>{price}</p>

                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        isPrimary ? "bg-white/20" : "bg-teal-800/10"
                    )}>
                        <ArrowRight size={16} className={isPrimary ? "text-white -rotate-45" : "text-finpay-teal -rotate-45"} />
                    </div>
                </div>
            </div>

        </AnimatedCard>
    );
};

export default PricingCard;