
import { Percent, CheckCircle2, Info, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhonePlan } from '@/data/plans';

interface PlanFeaturesProps {
  plan: PhonePlan;
  isBestValue: boolean;
}

export const PlanFeatures = ({ plan, isBestValue }: PlanFeaturesProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <Percent className="w-4 h-4 text-primary mr-2" />
        Avantages et services
      </h4>
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-4">
        <Button className="w-full hover-effect">Sélectionner ce forfait</Button>
        <div className="flex items-center justify-center mt-3">
          <Info className="w-4 h-4 text-foreground/60 mr-1" />
          <span className="text-xs text-foreground/60">
            {plan.isSponsored ? "Offre sponsorisée" : "Prix transparents"}
          </span>
        </div>
      </div>
      
      {isBestValue && (
        <div className="mt-4 flex items-center justify-center p-2 bg-green-50 text-green-700 rounded-md">
          <BarChart3 className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Meilleur rapport qualité/prix</span>
        </div>
      )}
    </div>
  );
};
