
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FilterOptions } from '@/data/plans';

interface ActiveFiltersProps {
  filterOptions: FilterOptions;
  initialFilterOptions: FilterOptions;
  handlePriceRangeChange: (value: number[]) => void;
  toggleDataFilter: (value: string) => void;
  toggleCommitmentFilter: (value: string) => void;
  toggleNetworkFilter: (value: string) => void;
}

export const ActiveFilters = ({
  filterOptions,
  initialFilterOptions,
  handlePriceRangeChange,
  toggleDataFilter,
  toggleCommitmentFilter,
  toggleNetworkFilter
}: ActiveFiltersProps) => {
  return (
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
            <span>{"<"} 50 Go</span>
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
            <span>{">"} 150 Go</span>
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
  );
};
