
import { Checkbox } from '@/components/ui/checkbox';

interface DataAmountFilterProps {
  dataAmount: string[];
  toggleDataFilter: (value: string) => void;
  idPrefix: string;
}

export const DataAmountFilter = ({ dataAmount, toggleDataFilter, idPrefix }: DataAmountFilterProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Volume de données</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-low`} 
            checked={dataAmount.includes('low')}
            onCheckedChange={() => toggleDataFilter('low')}
          />
          <label htmlFor={`${idPrefix}-low`} className="text-sm cursor-pointer">Moins de 50 Go</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-medium`} 
            checked={dataAmount.includes('medium')}
            onCheckedChange={() => toggleDataFilter('medium')}
          />
          <label htmlFor={`${idPrefix}-medium`} className="text-sm cursor-pointer">50 Go - 150 Go</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-high`} 
            checked={dataAmount.includes('high')}
            onCheckedChange={() => toggleDataFilter('high')}
          />
          <label htmlFor={`${idPrefix}-high`} className="text-sm cursor-pointer">Plus de 150 Go</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-unlimited`} 
            checked={dataAmount.includes('unlimited')}
            onCheckedChange={() => toggleDataFilter('unlimited')}
          />
          <label htmlFor={`${idPrefix}-unlimited`} className="text-sm cursor-pointer">Illimité</label>
        </div>
      </div>
    </div>
  );
};
