
import { Checkbox } from '@/components/ui/checkbox';

interface NetworkFilterProps {
  network: string[];
  toggleNetworkFilter: (value: string) => void;
  idPrefix: string;
}

export const NetworkFilter = ({ network, toggleNetworkFilter, idPrefix }: NetworkFilterProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Réseau</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-4g`} 
            checked={network.includes('4G')}
            onCheckedChange={() => toggleNetworkFilter('4G')}
          />
          <label htmlFor={`${idPrefix}-4g`} className="text-sm cursor-pointer">4G</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`${idPrefix}-5g`} 
            checked={network.includes('5G')}
            onCheckedChange={() => toggleNetworkFilter('5G')}
          />
          <label htmlFor={`${idPrefix}-5g`} className="text-sm cursor-pointer">5G</label>
        </div>
      </div>
    </div>
  );
};
