
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Info, Signal, Smartphone, Phone, ChartBar, Percent, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PhonePlan, FilterOptions, initialFilterOptions } from '@/data/plans';
import FilterBar from '@/components/filters/FilterBar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PlanComparisonProps {
  plans: PhonePlan[];
  showFilter?: boolean;
}

const PlanComparison = ({ plans, showFilter = true }: PlanComparisonProps) => {
  const { toast } = useToast();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilterOptions);
  const [filteredPlans, setFilteredPlans] = useState<PhonePlan[]>(plans);
  const [sortBy, setSortBy] = useState<'price' | 'data'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [bestValue, setBestValue] = useState<string | null>(null);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...plans];
    
    // Filter by price
    result = result.filter(plan => 
      plan.price >= filterOptions.minPrice && plan.price <= filterOptions.maxPrice
    );
    
    // Filter by data amount
    if (filterOptions.dataAmount.length > 0) {
      result = result.filter(plan => {
        if (plan.data === 'Unlimited' && filterOptions.dataAmount.includes('unlimited')) {
          return true;
        }
        
        const dataNumber = parseInt(plan.data.replace(/[^0-9]/g, ''));
        
        if (filterOptions.dataAmount.includes('low') && dataNumber < 50) {
          return true;
        }
        if (filterOptions.dataAmount.includes('medium') && dataNumber >= 50 && dataNumber <= 150) {
          return true;
        }
        if (filterOptions.dataAmount.includes('high') && dataNumber > 150) {
          return true;
        }
        
        return false;
      });
    }
    
    // Filter by commitment
    if (filterOptions.commitment.length > 0) {
      result = result.filter(plan => filterOptions.commitment.includes(plan.commitment));
    }
    
    // Filter by network
    if (filterOptions.network.length > 0) {
      result = result.filter(plan => {
        if (plan.network === '4G/5G') {
          return filterOptions.network.includes('4G') || filterOptions.network.includes('5G');
        }
        return filterOptions.network.includes(plan.network);
      });
    }
    
    // Find best value plan
    if (result.length > 0) {
      const bestPlan = result.reduce((best, current) => {
        // For unlimited data, consider it as highest value
        if (current.data === 'Unlimited') return current;
        if (best.data === 'Unlimited') return best;
        
        const currentDataValue = parseInt(current.data.replace(/[^0-9]/g, '')) / current.price;
        const bestDataValue = parseInt(best.data.replace(/[^0-9]/g, '')) / best.price;
        
        return currentDataValue > bestDataValue ? current : best;
      }, result[0]);
      
      setBestValue(bestPlan.id);
    } else {
      setBestValue(null);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else {
        // For data sorting, handle 'Unlimited' as highest value
        const getDataValue = (plan: PhonePlan) => {
          if (plan.data === 'Unlimited') return Number.MAX_SAFE_INTEGER;
          return parseInt(plan.data.replace(/[^0-9]/g, ''));
        };
        
        const aValue = getDataValue(a);
        const bValue = getDataValue(b);
        
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
    
    // Simulate loading for better UX
    setLoading(true);
    setTimeout(() => {
      setFilteredPlans(result);
      setLoading(false);
    }, 300);
  }, [plans, filterOptions, sortBy, sortOrder]);

  const toggleSorting = (column: 'price' | 'data') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const toggleRowExpanded = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const isRowExpanded = (id: string) => expandedRows.includes(id);

  return (
    <div>
      {showFilter && (
        <FilterBar filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
      )}
      
      <div className={cn("mt-8 glass border border-border/50 rounded-2xl overflow-hidden", {
        "opacity-70 pointer-events-none": loading,
      })}>
        <div className="p-6 flex justify-between items-center border-b border-border/50">
          <h3 className="font-medium flex items-center">
            <Smartphone className="w-5 h-5 text-primary mr-2" />
            <span>{filteredPlans.length} {filteredPlans.length > 1 ? 'Forfaits disponibles' : 'Forfait disponible'}</span>
          </h3>
          <div className="flex text-sm">
            <button 
              className={cn(
                "flex items-center px-3 py-1 rounded-l-md border border-r-0",
                sortBy === 'price' ? "bg-primary/10 border-primary/30" : "border-border bg-background/50"
              )}
              onClick={() => toggleSorting('price')}
            >
              Prix
              {sortBy === 'price' && (
                sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </button>
            <button 
              className={cn(
                "flex items-center px-3 py-1 rounded-r-md border",
                sortBy === 'data' ? "bg-primary/10 border-primary/30" : "border-border bg-background/50"
              )}
              onClick={() => toggleSorting('data')}
            >
              Données
              {sortBy === 'data' && (
                sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </button>
          </div>
        </div>
        
        <ScrollArea className="max-h-[600px]">
          <div className="divide-y divide-border/50">
            {filteredPlans.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-foreground/70">Aucun forfait ne correspond aux critères sélectionnés.</p>
                {showFilter && (
                  <Button variant="link" onClick={() => setFilterOptions(initialFilterOptions)}>
                    Réinitialiser les filtres
                  </Button>
                )}
              </div>
            ) : (
              filteredPlans.map((plan) => (
                <div key={plan.id} className={cn(
                  "transition-all duration-300",
                  plan.isSponsored ? "bg-primary/5" : "",
                  bestValue === plan.id ? "border-l-4 border-l-green-500" : ""
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
                        onClick={() => toggleRowExpanded(plan.id)}
                      >
                        {isRowExpanded(plan.id) ? (
                          <ChevronUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-xs">Détails</span>
                      </Button>
                    </div>
                  </div>
                  
                  {isRowExpanded(plan.id) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-background/30 rounded-b-xl animate-fade-in">
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
                        
                        {bestValue === plan.id && (
                          <div className="mt-4 flex items-center justify-center p-2 bg-green-50 text-green-700 rounded-md">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Meilleur rapport qualité/prix</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PlanComparison;
