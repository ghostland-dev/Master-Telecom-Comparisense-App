
import { CheckCircle, Info, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PhonePlan } from '@/data/plans';
import { cn } from '@/lib/utils';

interface FeaturedPlanProps {
  plan: PhonePlan;
}

const FeaturedPlan = ({ plan }: FeaturedPlanProps) => {
  return (
    <div className={cn(
      "glass relative flex flex-col rounded-2xl border transition-all duration-300 hover:border-primary/50 overflow-hidden",
      plan.isSponsored ? "border-primary/30" : "border-border/50"
    )}>
      {plan.isSponsored && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg z-10">
          Sponsorisé
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-3">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{plan.provider.name}</h3>
              <div className="text-sm text-foreground/70">{plan.name}</div>
            </div>
          </div>
          <Badge variant={plan.network === '5G' ? "default" : "outline"}>{plan.network}</Badge>
        </div>
        
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold">{plan.price.toFixed(2)}€</span>
          <span className="text-sm text-foreground/70 ml-1">/mois</span>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-foreground/70">Données</span>
            <span className="font-medium">{plan.data}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-foreground/70">Appels</span>
            <span className="font-medium">{plan.calls}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-foreground/70">SMS</span>
            <span className="font-medium">{plan.sms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-foreground/70">Engagement</span>
            <span className="font-medium">{plan.commitment === 'No contract' ? 'Sans engagement' : 
              plan.commitment === '12 months' ? '12 mois' : 
              plan.commitment === '24 months' ? '24 mois' : plan.commitment}</span>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-4 mb-6">
          <h4 className="text-sm font-medium mb-2">Caractéristiques</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                <span>{translateFeature(feature)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto">
          <Button className="w-full rounded-xl hover-effect">Voir le forfait</Button>
          <div className="flex items-center justify-center mt-3">
            <Info className="w-4 h-4 text-foreground/60 mr-1" />
            <span className="text-xs text-foreground/60">Prix transparent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fonction utilitaire pour traduire les caractéristiques
const translateFeature = (feature: string): string => {
  const translations: Record<string, string> = {
    'EU Roaming': 'Itinérance UE',
    '5G Network': 'Réseau 5G',
    'Mobile Hotspot': 'Partage de connexion',
    'Family Discounts': 'Réductions famille',
    'Unlimited Data': 'Données illimitées',
    'Premium Support': 'Support premium',
    'Music Streaming Included': 'Streaming musical inclus'
  };

  return translations[feature] || feature;
};

export default FeaturedPlan;
