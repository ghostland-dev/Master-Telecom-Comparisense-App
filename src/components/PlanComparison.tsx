
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PhonePlan, FilterOptions } from '@/data/plans';
import FilterBar from '@/components/filters/FilterBar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PlanItem } from './plans/PlanItem';
import { PlanSorting } from './plans/PlanSorting';
import { EmptyPlans } from './plans/EmptyPlans';
import { usePlansFilter } from '@/hooks/usePlansFilter';

interface PlanComparisonProps {
  plans: PhonePlan[];
  showFilter?: boolean;
}

const PlanComparison = ({ plans, showFilter = true }: PlanComparisonProps) => {
  const { toast } = useToast();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  
  const {
    filterOptions,
    setFilterOptions,
    filteredPlans,
    sortBy,
    sortOrder,
    loading,
    bestValue,
    toggleSorting,
    resetFilters
  } = usePlansFilter(plans);

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
