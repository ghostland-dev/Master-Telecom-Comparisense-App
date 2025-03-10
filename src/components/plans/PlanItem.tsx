
import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Info, Signal, Smartphone, Phone, ChartBar, Percent, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PhonePlan } from '@/data/plans';
import { cn } from '@/lib/utils';
import { PlanDetails } from './PlanDetails';
import { PlanFeatures } from './PlanFeatures';

interface PlanItemProps {
  plan: PhonePlan;
  isExpanded: boolean;
  isBestValue: boolean;
  toggleExpanded: () => void;
}

export const PlanItem = ({ plan, isExpanded, isBestValue, toggleExpanded }: PlanItemProps) => {
  return (
    <div className={cn(
      "transition-all duration-300",
      plan.isSponsored ? "bg-primary/5" : "",
      isBestValue ? "border-l-4 border-l-green-500" : ""
    )}>
      <div className="grid grid-cols-12 p-4 gap-4 items-center">
        <div className="col-span-12 md:col-span-3 flex items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{plan.provider.name}</div>
              <div className="text-sm text-foreground/70">{plan.name}</div>
            </div>
          </div>
        </div>
        
        <div className="col-span-4 md:col-span-2 flex flex-col">
          <span className="text-xs text-foreground/60 md:hidden">Prix</span>
          <div className="flex items-baseline">
            <span className="font-medium">€{plan.price.toFixed(2)}</span>
            <span className="text-xs text-foreground/70 ml-1">/mois</span>
          </div>
        </div>
        
        <div className="col-span-4 md:col-span-2 flex flex-col">
          <span className="text-xs text-foreground/60 md:hidden">Données</span>
          <div className="flex items-center">
            <Signal className="w-4 h-4 text-primary mr-1" />
            <span className="font-medium">{plan.data}</span>
          </div>
        </div>
        
        <div className="col-span-4 md:col-span-2 flex flex-col">
          <span className="text-xs text-foreground/60 md:hidden">Réseau</span>
          <Badge variant={plan.network.includes('5G') ? "default" : "outline"} className="w-fit">
            {plan.network}
          </Badge>
        </div>
        
        <div className="col-span-6 md:col-span-2 flex flex-col">
          <span className="text-xs text-foreground/60 md:hidden">Engagement</span>
          <span>{plan.commitment}</span>
        </div>
        
        <div className="col-span-6 md:col-span-1 flex justify-end md:justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary hover:bg-primary/10"
            onClick={toggleExpanded}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 mr-1" />
            ) : (
              <ChevronDown className="w-4 h-4 mr-1" />
            )}
            <span className="text-xs">Détails</span>
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-background/30 rounded-b-xl animate-fade-in">
          <PlanDetails plan={plan} />
          <PlanFeatures plan={plan} isBestValue={isBestValue} />
        </div>
      )}
    </div>
  );
};
