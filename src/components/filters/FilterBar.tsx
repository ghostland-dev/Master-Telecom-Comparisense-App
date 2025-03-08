
import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterOptions, initialFilterOptions } from '@/data/plans';
import { cn } from '@/lib/utils';
import { FilterTabs } from './FilterTabs';
import { ActiveFilters } from './ActiveFilters';
import { FilterActions } from './FilterActions';

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
        <FilterTabs 
          filterOptions={filterOptions}
          handlePriceRangeChange={handlePriceRangeChange}
          toggleDataFilter={toggleDataFilter}
          toggleCommitmentFilter={toggleCommitmentFilter}
          toggleNetworkFilter={toggleNetworkFilter}
        />
        
        {activeFiltersCount > 0 && (
          <ActiveFilters
            filterOptions={filterOptions}
            initialFilterOptions={initialFilterOptions}
            handlePriceRangeChange={handlePriceRangeChange}
            toggleDataFilter={toggleDataFilter}
            toggleCommitmentFilter={toggleCommitmentFilter}
            toggleNetworkFilter={toggleNetworkFilter}
          />
        )}
        
        <FilterActions 
          resetFilters={resetFilters} 
          closeFilters={() => setIsExpanded(false)} 
        />
      </div>
    </div>
  );
};

export default FilterBar;
