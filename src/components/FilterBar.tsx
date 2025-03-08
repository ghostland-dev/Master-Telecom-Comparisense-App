
import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterOptions } from '@/data/plans';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

const FilterBar = ({ filterOptions, setFilterOptions }: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceRangeChange = (value: number[]) => {
    setFilterOptions({
      ...filterOptions,
      minPrice: value[0],
      maxPrice: value[1]
    });
  };

  const toggleDataFilter = (value: string) => {
    const currentFilters = [...filterOptions.dataAmount];
    const index = currentFilters.indexOf(value);
    
    if (index === -1) {
      currentFilters.push(value);
    } else {
      currentFilters.splice(index, 1);
    }
    
    setFilterOptions({
      ...filterOptions,
      dataAmount: currentFilters
    });
  };

  const toggleCommitmentFilter = (value: string) => {
    const currentFilters = [...filterOptions.commitment];
    const index = currentFilters.indexOf(value);
    
    if (index === -1) {
      currentFilters.push(value);
    } else {
      currentFilters.splice(index, 1);
    }
    
    setFilterOptions({
      ...filterOptions,
      commitment: currentFilters
    });
  };

  const toggleNetworkFilter = (value: string) => {
    const currentFilters = [...filterOptions.network];
    const index = currentFilters.indexOf(value);
    
    if (index === -1) {
      currentFilters.push(value);
    } else {
      currentFilters.splice(index, 1);
    }
    
    setFilterOptions({
      ...filterOptions,
      network: currentFilters
    });
  };

  const resetFilters = () => {
    setFilterOptions({
      minPrice: 0,
      maxPrice: 100,
      dataAmount: [],
      commitment: [],
      network: []
    });
  };

  return (
    <div className={cn(
      "glass border border-border/50 rounded-2xl overflow-hidden transition-all duration-300",
      isExpanded ? "max-h-[600px]" : "max-h-24"
    )}>
      <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Filtrer les forfaits</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      
      <div className={cn(
        "px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-8",
        isExpanded ? "opacity-100" : "opacity-0 hidden"
      )}>
        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium mb-3">Fourchette de prix</h4>
          <div className="space-y-6">
            <Slider 
              defaultValue={[filterOptions.minPrice, filterOptions.maxPrice]} 
              max={100} 
              step={1}
              onValueChange={handlePriceRangeChange}
              className="my-6"
            />
            <div className="flex justify-between text-sm">
              <span>{filterOptions.minPrice}€</span>
              <span>{filterOptions.maxPrice}€</span>
            </div>
          </div>
        </div>
        
        {/* Data Amount */}
        <div>
          <h4 className="text-sm font-medium mb-3">Volume de données</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="data-low" 
                checked={filterOptions.dataAmount.includes('low')}
                onCheckedChange={() => toggleDataFilter('low')}
              />
              <label htmlFor="data-low" className="text-sm cursor-pointer">Moins de 50 Go</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="data-medium" 
                checked={filterOptions.dataAmount.includes('medium')}
                onCheckedChange={() => toggleDataFilter('medium')}
              />
              <label htmlFor="data-medium" className="text-sm cursor-pointer">50 Go - 150 Go</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="data-high" 
                checked={filterOptions.dataAmount.includes('high')}
                onCheckedChange={() => toggleDataFilter('high')}
              />
              <label htmlFor="data-high" className="text-sm cursor-pointer">Plus de 150 Go</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="data-unlimited" 
                checked={filterOptions.dataAmount.includes('unlimited')}
                onCheckedChange={() => toggleDataFilter('unlimited')}
              />
              <label htmlFor="data-unlimited" className="text-sm cursor-pointer">Illimité</label>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Contract Type */}
          <div>
            <h4 className="text-sm font-medium mb-3">Type d'engagement</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="commitment-none" 
                  checked={filterOptions.commitment.includes('No contract')}
                  onCheckedChange={() => toggleCommitmentFilter('No contract')}
                />
                <label htmlFor="commitment-none" className="text-sm cursor-pointer">Sans engagement</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="commitment-12" 
                  checked={filterOptions.commitment.includes('12 months')}
                  onCheckedChange={() => toggleCommitmentFilter('12 months')}
                />
                <label htmlFor="commitment-12" className="text-sm cursor-pointer">12 mois</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="commitment-24" 
                  checked={filterOptions.commitment.includes('24 months')}
                  onCheckedChange={() => toggleCommitmentFilter('24 months')}
                />
                <label htmlFor="commitment-24" className="text-sm cursor-pointer">24 mois</label>
              </div>
            </div>
          </div>
          
          {/* Network */}
          <div>
            <h4 className="text-sm font-medium mb-3">Réseau</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="network-4g" 
                  checked={filterOptions.network.includes('4G')}
                  onCheckedChange={() => toggleNetworkFilter('4G')}
                />
                <label htmlFor="network-4g" className="text-sm cursor-pointer">4G</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="network-5g" 
                  checked={filterOptions.network.includes('5G')}
                  onCheckedChange={() => toggleNetworkFilter('5G')}
                />
                <label htmlFor="network-5g" className="text-sm cursor-pointer">5G</label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter actions */}
        <div className="col-span-1 md:col-span-3 flex justify-end">
          <Button variant="outline" onClick={resetFilters} className="mr-2">
            Réinitialiser les filtres
          </Button>
          <Button>Appliquer les filtres</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
