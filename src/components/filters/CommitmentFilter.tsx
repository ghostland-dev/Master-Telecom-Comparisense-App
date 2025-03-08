
import { Checkbox } from '@/components/ui/checkbox';

interface CommitmentFilterProps {
  commitment: string[];
  toggleCommitmentFilter: (value: string) => void;
  idPrefix: string;
}

export const CommitmentFilter = ({ commitment, toggleCommitmentFilter, idPrefix }: CommitmentFilterProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Type d'engagement</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-none`} 
            checked={commitment.includes('No contract')}
            onCheckedChange={() => toggleCommitmentFilter('No contract')}
          />
          <label htmlFor={`${idPrefix}-none`} className="text-sm cursor-pointer">Sans engagement</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-12`} 
            checked={commitment.includes('12 months')}
            onCheckedChange={() => toggleCommitmentFilter('12 months')}
          />
          <label htmlFor={`${idPrefix}-12`} className="text-sm cursor-pointer">12 mois</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-24`} 
            checked={commitment.includes('24 months')}
            onCheckedChange={() => toggleCommitmentFilter('24 months')}
          />
          <label htmlFor={`${idPrefix}-24`} className="text-sm cursor-pointer">24 mois</label>
        </div>
      </div>
    </div>
  );
};
