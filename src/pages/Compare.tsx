
import { useState, useEffect } from 'react';
import { toast } from "sonner";
 
import Footer from '@/components/Footer';
import PlanComparison from '@/components/PlanComparison';
import ComparisonSummary from '@/components/ComparisonSummary';
import SaveComparisonDialog from '@/components/SaveComparisonDialog';
import { phonePlans, PhonePlan } from '@/data/plans';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Share2, RefreshCw, Save } from 'lucide-react';
import { getSavedComparisons, saveComparison } from '@/lib/comparisonUtils';
import Header from '@/components/header';

const Compare = () => {
  const [selectedPlans, setSelectedPlans] = useState<PhonePlan[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<{id: string, name: string, plans: PhonePlan[]}[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterOpened, setFilterOpened] = useState(false);
  
  // Load saved comparisons from localStorage on mount
  useEffect(() => {
    const comparisons = getSavedComparisons();
    setSavedComparisons(comparisons);
  }, []);
  
  const togglePlanSelection = (plan: PhonePlan) => {
    if (selectedPlans.find(p => p.id === plan.id)) {
      setSelectedPlans(selectedPlans.filter(p => p.id !== plan.id));
    } else {
      if (selectedPlans.length < 3) {
        setSelectedPlans([...selectedPlans, plan]);
      } else {
        toast.warning("Vous pouvez comparer jusqu'à 3 forfaits maximum", {
          position: "top-center",
          duration: 3000,
        });
      }
    }
  };

  const handleSaveComparison = (name: string) => {
    if (selectedPlans.length === 0) {
      toast.error("Veuillez sélectionner au moins un forfait pour sauvegarder", {
        position: "top-center",
      });
      return;
    }
    
    const newComparison = saveComparison(name, selectedPlans);
    setSavedComparisons([...savedComparisons, newComparison]);
    setShowSaveDialog(false);
    
    toast.success("Comparaison sauvegardée avec succès", {
      position: "top-center",
    });
  };
  
  const loadSavedComparison = (id: string) => {
    const comparison = savedComparisons.find(c => c.id === id);
    if (comparison) {
      setSelectedPlans(comparison.plans);
      toast.info(`Comparaison "${comparison.name}" chargée`, {
        position: "top-center",
      });
    }
  };
  
  const clearSelection = () => {
    setSelectedPlans([]);
    toast.info("Sélection effacée", {
      position: "top-center",
    });
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
            
            {/* Control panel */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-up">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Forfaits sélectionnés ({selectedPlans.length}/3)</h2>
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
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSaveDialog(true)}
                  disabled={selectedPlans.length === 0}
                >
                  <Save size={16} />
                  Sauvegarder
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearSelection}
                  disabled={selectedPlans.length === 0}
                >
                  <RefreshCw size={16} />
                  Réinitialiser
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFilterOpened(!filterOpened)}
                >
                  <Share2 size={16} />
                  Partager
                </Button>
              </div>
            </div>
            
            {/* Saved comparisons */}
            {savedComparisons.length > 0 && (
              <div className="mb-8 animate-fade-up">
                <h2 className="text-xl font-semibold mb-4">Vos comparaisons sauvegardées</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {savedComparisons.map(comparison => (
                    <div 
                      key={comparison.id}
                      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => loadSavedComparison(comparison.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{comparison.name}</h3>
                          <p className="text-foreground/70 text-sm">
                            {comparison.plans.length} forfait{comparison.plans.length > 1 ? 's' : ''}
                          </p>
                        </div>
                        <Heart size={18} className="text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Comparison area */}
            {selectedPlans.length > 0 && (
              <div className="mb-12 animate-fade-up">
                <h2 className="text-xl font-semibold mb-4">Comparaison des forfaits sélectionnés</h2>
                <ComparisonSummary plans={selectedPlans} />
                <div className="mt-8">
                  <PlanComparison plans={selectedPlans} />
                </div>
              </div>
            )}
            
            {/* All plans */}
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
      
      <SaveComparisonDialog 
        open={showSaveDialog} 
        onClose={() => setShowSaveDialog(false)}
        onSave={handleSaveComparison}
      />
      
      <Footer />
    </div>
  );
};

export default Compare;
