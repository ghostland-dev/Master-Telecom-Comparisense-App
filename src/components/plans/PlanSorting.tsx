
import { ChevronDown, ChevronUp, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanSortingProps {
  sortBy: 'price' | 'data';
  sortOrder: 'asc' | 'desc';
  plansCount: number;
  toggleSorting: (column: 'price' | 'data') => void;
  loading: boolean;
}

export const PlanSorting = ({ 
  sortBy, 
  sortOrder, 
  plansCount, 
  toggleSorting,
  loading
}: PlanSortingProps) => {
  return (
    <div className={cn("p-6 flex justify-between items-center border-b border-border/50", {
      "opacity-70 pointer-events-none": loading,
    })}>
      <h3 className="font-medium flex items-center">
        <Smartphone className="w-5 h-5 text-primary mr-2" />
        <span>{plansCount} {plansCount > 1 ? 'Forfaits disponibles' : 'Forfait disponible'}</span>
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
  );
};
