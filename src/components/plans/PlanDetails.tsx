
import { Phone, ChartBar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PhonePlan } from '@/data/plans';

interface PlanDetailsProps {
  plan: PhonePlan;
}

export const PlanDetails = ({ plan }: PlanDetailsProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <Phone className="w-4 h-4 text-primary mr-2" />
        Détails du forfait
      </h4>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <span className="text-sm text-foreground/70">Volume de données</span>
          <span className="text-sm font-medium">{plan.data}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-sm text-foreground/70">Appels</span>
          <span className="text-sm font-medium">{plan.calls}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-sm text-foreground/70">SMS</span>
          <span className="text-sm font-medium">{plan.sms}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-sm text-foreground/70">Durée d'engagement</span>
          <span className="text-sm font-medium">{plan.commitment}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-sm text-foreground/70">Type de réseau</span>
          <span className="text-sm font-medium">{plan.network}</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <ChartBar className="w-4 h-4 text-primary mr-2" />
        Détail des prix
      </h4>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <span className="text-sm text-foreground/70">Tarif mensuel</span>
          <span className="text-sm font-medium">€{plan.price.toFixed(2)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-sm text-foreground/70">Frais d'activation</span>
          <span className="text-sm font-medium">€0.00</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-sm text-foreground/70">Coût annuel</span>
          <span className="text-sm font-medium">€{(plan.price * 12).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
