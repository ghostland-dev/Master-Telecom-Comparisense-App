
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlanComparison from '@/components/PlanComparison';
import { phonePlans, PhonePlan } from '@/data/plans';
import { Badge } from '@/components/ui/badge';

const Compare = () => {
  const [selectedPlans, setSelectedPlans] = useState<PhonePlan[]>([]);
  
  const togglePlanSelection = (plan: PhonePlan) => {
    if (selectedPlans.find(p => p.id === plan.id)) {
      setSelectedPlans(selectedPlans.filter(p => p.id !== plan.id));
    } else {
      if (selectedPlans.length < 3) {
        setSelectedPlans([...selectedPlans, plan]);
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Comparer des forfaits</h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Sélectionnez jusqu'à 3 forfaits pour les comparer côte à côte et trouver la meilleure option pour vous.
              </p>
            </div>
            
            <div className="mb-8 animate-fade-up">
              <h2 className="text-xl font-semibold mb-4">Forfaits sélectionnés ({selectedPlans.length}/3)</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPlans.length > 0 ? (
                  selectedPlans.map(plan => (
                    <Badge 
                      key={plan.id} 
                      variant="outline" 
                      className="flex items-center gap-2 px-3 py-1.5 bg-primary/10"
                      onClick={() => togglePlanSelection(plan)}
                    >
                      <span>{plan.provider.name} - {plan.name}</span>
                      <span className="cursor-pointer">×</span>
                    </Badge>
                  ))
                ) : (
                  <p className="text-foreground/70">Aucun forfait sélectionné. Cliquez sur les forfaits ci-dessous pour les comparer.</p>
                )}
              </div>
            </div>
            
            {selectedPlans.length > 0 && (
              <div className="mb-12 animate-fade-up">
                <h2 className="text-xl font-semibold mb-4">Comparaison des forfaits sélectionnés</h2>
                <PlanComparison plans={selectedPlans} />
              </div>
            )}
            
            <div className="animate-fade-up">
              <h2 className="text-xl font-semibold mb-4">Tous les forfaits disponibles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phonePlans.map(plan => (
                  <div 
                    key={plan.id} 
                    className={`bg-card text-card-foreground rounded-lg p-4 border cursor-pointer transition-colors ${
                      selectedPlans.find(p => p.id === plan.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => togglePlanSelection(plan)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{plan.provider.name} - {plan.name}</h3>
                        <p className="text-foreground/70 text-sm">{plan.data} • {plan.network}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{plan.price}€/mois</p>
                        <p className="text-xs text-foreground/70">{plan.commitment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Compare;
