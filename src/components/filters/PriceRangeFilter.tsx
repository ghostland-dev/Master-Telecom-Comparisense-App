
import { Slider } from '@/components/ui/slider';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onValueChange: (value: number[]) => void;
}

export const PriceRangeFilter = ({ minPrice, maxPrice, onValueChange }: PriceRangeFilterProps) => {
  return (
    <div className="space-y-6">
      <h4 className="text-sm font-medium mb-3">Fourchette de prix</h4>
      <Slider 
        value={[minPrice, maxPrice]} 
        max={100} 
        step={1}
        onValueChange={onValueChange}
        className="my-6"
      />
      <div className="flex justify-between text-sm">
        <span>{minPrice}€</span>
        <span>{maxPrice}€</span>
      </div>
    </div>
  );
};
