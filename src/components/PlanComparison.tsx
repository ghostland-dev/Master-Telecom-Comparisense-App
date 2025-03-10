
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PhonePlan, FilterOptions, initialFilterOptions } from '@/data/plans';
import FilterBar from '@/components/filters/FilterBar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PlanItem } from './plans/PlanItem';
import { PlanSorting } from './plans/PlanSorting';
import { EmptyPlans } from './plans/EmptyPlans';

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
    result = applySorting(result, sortBy, sortOrder);
    
    // Simulate loading for better UX
    setLoading(true);
    setTimeout(() => {
      setFilteredPlans(result);
      setLoading(false);
    }, 300);
  }, [plans, filterOptions, sortBy, sortOrder]);

  const applySorting = (plans: PhonePlan[], sortBy: 'price' | 'data', sortOrder: 'asc' | 'desc') => {
    return [...plans].sort((a, b) => {
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
  };

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

  const resetFilters = () => {
    setFilterOptions(initialFilterOptions);
  };

  return (
    <div>
      {showFilter && (
        <FilterBar filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
      )}
      
      <div className={cn("mt-8 glass border border-border/50 rounded-2xl overflow-hidden", {
        "opacity-70 pointer-events-none": loading,
      })}>
        <PlanSorting 
          sortBy={sortBy}
          sortOrder={sortOrder}
          plansCount={filteredPlans.length}
          toggleSorting={toggleSorting}
          loading={loading}
        />
        
        <ScrollArea className="max-h-[600px]">
          <div className="divide-y divide-border/50">
            {filteredPlans.length === 0 ? (
              <EmptyPlans showResetButton={showFilter} resetFilters={resetFilters} />
            ) : (
              filteredPlans.map((plan) => (
                <PlanItem 
                  key={plan.id}
                  plan={plan}
                  isExpanded={isRowExpanded(plan.id)}
                  isBestValue={bestValue === plan.id}
                  toggleExpanded={() => toggleRowExpanded(plan.id)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PlanComparison;
