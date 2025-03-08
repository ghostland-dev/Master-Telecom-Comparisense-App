
import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { FilterOptions, initialFilterOptions } from '@/data/plans';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FilterBarProps {
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

const FilterBar = ({ filterOptions, setFilterOptions }: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Count active filters
  const countActiveFilters = (options: FilterOptions) => {
    let count = 0;
    
    if (options.minPrice > initialFilterOptions.minPrice || 
        options.maxPrice < initialFilterOptions.maxPrice) {
      count++;
    }
    
    if (options.dataAmount.length > 0) count++;
    if (options.commitment.length > 0) count++;
    if (options.network.length > 0) count++;
    
    setActiveFiltersCount(count);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const newOptions = {
      ...filterOptions,
      minPrice: value[0],
      maxPrice: value[1]
    };
    
    setFilterOptions(newOptions);
    countActiveFilters(newOptions);
  };

  const toggleDataFilter = (value: string) => {
    const currentFilters = [...filterOptions.dataAmount];
    const index = currentFilters.indexOf(value);
    
    if (index === -1) {
      currentFilters.push(value);
    } else {
      currentFilters.splice(index, 1);
    }
    
    const newOptions = {
      ...filterOptions,
      dataAmount: currentFilters
    };
    
    setFilterOptions(newOptions);
    countActiveFilters(newOptions);
  };

  const toggleCommitmentFilter = (value: string) => {
    const currentFilters = [...filterOptions.commitment];
    const index = currentFilters.indexOf(value);
    
    if (index === -1) {
      currentFilters.push(value);
    } else {
      currentFilters.splice(index, 1);
    }
    
    const newOptions = {
      ...filterOptions,
      commitment: currentFilters
    };
    
    setFilterOptions(newOptions);
    countActiveFilters(newOptions);
  };

  const toggleNetworkFilter = (value: string) => {
    const currentFilters = [...filterOptions.network];
    const index = currentFilters.indexOf(value);
    
    if (index === -1) {
      currentFilters.push(value);
    } else {
      currentFilters.splice(index, 1);
    }
    
    const newOptions = {
      ...filterOptions,
      network: currentFilters
    };
    
    setFilterOptions(newOptions);
    countActiveFilters(newOptions);
  };

  const resetFilters = () => {
    setFilterOptions(initialFilterOptions);
    countActiveFilters(initialFilterOptions);
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
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">{activeFiltersCount}</Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      
      <div className={cn(
        "px-6 pb-6",
        isExpanded ? "opacity-100" : "opacity-0 hidden"
      )}>
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="price">Prix</TabsTrigger>
            <TabsTrigger value="data">Données</TabsTrigger>
            <TabsTrigger value="other">Autres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium mb-3">Fourchette de prix</h4>
                <div className="space-y-6">
                  <Slider 
                    value={[filterOptions.minPrice, filterOptions.maxPrice]} 
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
            </div>
          </TabsContent>
          
          <TabsContent value="price" className="mt-4">
            <div className="space-y-6">
              <h4 className="text-sm font-medium mb-3">Fourchette de prix</h4>
              <Slider 
                value={[filterOptions.minPrice, filterOptions.maxPrice]} 
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
          </TabsContent>
          
          <TabsContent value="data" className="mt-4">
            <h4 className="text-sm font-medium mb-3">Volume de données</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="data-low-tab" 
                  checked={filterOptions.dataAmount.includes('low')}
                  onCheckedChange={() => toggleDataFilter('low')}
                />
                <label htmlFor="data-low-tab" className="text-sm cursor-pointer">Moins de 50 Go</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="data-medium-tab" 
                  checked={filterOptions.dataAmount.includes('medium')}
                  onCheckedChange={() => toggleDataFilter('medium')}
                />
                <label htmlFor="data-medium-tab" className="text-sm cursor-pointer">50 Go - 150 Go</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="data-high-tab" 
                  checked={filterOptions.dataAmount.includes('high')}
                  onCheckedChange={() => toggleDataFilter('high')}
                />
                <label htmlFor="data-high-tab" className="text-sm cursor-pointer">Plus de 150 Go</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="data-unlimited-tab" 
                  checked={filterOptions.dataAmount.includes('unlimited')}
                  onCheckedChange={() => toggleDataFilter('unlimited')}
                />
                <label htmlFor="data-unlimited-tab" className="text-sm cursor-pointer">Illimité</label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contract Type */}
              <div>
                <h4 className="text-sm font-medium mb-3">Type d'engagement</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="commitment-none-tab" 
                      checked={filterOptions.commitment.includes('No contract')}
                      onCheckedChange={() => toggleCommitmentFilter('No contract')}
                    />
                    <label htmlFor="commitment-none-tab" className="text-sm cursor-pointer">Sans engagement</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="commitment-12-tab" 
                      checked={filterOptions.commitment.includes('12 months')}
                      onCheckedChange={() => toggleCommitmentFilter('12 months')}
                    />
                    <label htmlFor="commitment-12-tab" className="text-sm cursor-pointer">12 mois</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="commitment-24-tab" 
                      checked={filterOptions.commitment.includes('24 months')}
                      onCheckedChange={() => toggleCommitmentFilter('24 months')}
                    />
                    <label htmlFor="commitment-24-tab" className="text-sm cursor-pointer">24 mois</label>
                  </div>
                </div>
              </div>
              
              {/* Network */}
              <div>
                <h4 className="text-sm font-medium mb-3">Réseau</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="network-4g-tab" 
                      checked={filterOptions.network.includes('4G')}
                      onCheckedChange={() => toggleNetworkFilter('4G')}
                    />
                    <label htmlFor="network-4g-tab" className="text-sm cursor-pointer">4G</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="network-5g-tab" 
                      checked={filterOptions.network.includes('5G')}
                      onCheckedChange={() => toggleNetworkFilter('5G')}
                    />
                    <label htmlFor="network-5g-tab" className="text-sm cursor-pointer">5G</label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Active filters */}
        {activeFiltersCount > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {(filterOptions.minPrice > initialFilterOptions.minPrice || 
                filterOptions.maxPrice < initialFilterOptions.maxPrice) && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>Prix: {filterOptions.minPrice}€ - {filterOptions.maxPrice}€</span>
                  <X 
                    size={14} 
                    className="cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePriceRangeChange([initialFilterOptions.minPrice, initialFilterOptions.maxPrice]);
                    }} 
                  />
                </Badge>
              )}
              
              {filterOptions.dataAmount.includes('low') && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>< 50 Go</span>
                  <X 
                    size={14} 
                    className="cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDataFilter('low');
                    }} 
                  />
                </Badge>
              )}
              
              {filterOptions.dataAmount.includes('medium') && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>50-150 Go</span>
                  <X 
                    size={14} 
                    className="cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDataFilter('medium');
                    }} 
                  />
                </Badge>
              )}
              
              {filterOptions.dataAmount.includes('high') && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>> 150 Go</span>
                  <X 
                    size={14} 
                    className="cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDataFilter('high');
                    }} 
                  />
                </Badge>
              )}
              
              {filterOptions.dataAmount.includes('unlimited') && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>Illimité</span>
                  <X 
                    size={14} 
                    className="cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDataFilter('unlimited');
                    }} 
                  />
                </Badge>
              )}
              
              {filterOptions.commitment.map(commitment => (
                <Badge key={commitment} variant="outline" className="flex items-center gap-1">
                  <span>
                    {commitment === 'No contract' ? 'Sans engagement' : 
                     commitment === '12 months' ? '12 mois' : '24 mois'}
                  </span>
                  <X 
                    size={14} 
                    className="cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCommitmentFilter(commitment);
                    }} 
                  />
                </Badge>
              ))}
              
              {filterOptions.network.map(network => (
                <Badge key={network} variant="outline" className="flex items-center gap-1">
                  <span>{network}</span>
                  <X 
                    size={14} 
                    className="cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNetworkFilter(network);
                    }} 
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Filter actions */}
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={resetFilters} className="mr-2">
            Réinitialiser les filtres
          </Button>
          <Button onClick={() => setIsExpanded(false)}>Appliquer les filtres</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
