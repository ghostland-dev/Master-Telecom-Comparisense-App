
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterOptions } from '@/data/plans';
import { PriceRangeFilter } from './PriceRangeFilter';
import { DataAmountFilter } from './DataAmountFilter';
import { CommitmentFilter } from './CommitmentFilter';
import { NetworkFilter } from './NetworkFilter';

interface FilterTabsProps {
  filterOptions: FilterOptions;
  handlePriceRangeChange: (value: number[]) => void;
  toggleDataFilter: (value: string) => void;
  toggleCommitmentFilter: (value: string) => void;
  toggleNetworkFilter: (value: string) => void;
}

export const FilterTabs = ({ 
  filterOptions,
  handlePriceRangeChange,
  toggleDataFilter,
  toggleCommitmentFilter,
  toggleNetworkFilter
}: FilterTabsProps) => {
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList className="w-full grid grid-cols-4">
        <TabsTrigger value="all">Tous</TabsTrigger>
        <TabsTrigger value="price">Prix</TabsTrigger>
        <TabsTrigger value="data">Données</TabsTrigger>
        <TabsTrigger value="other">Autres</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PriceRangeFilter
            minPrice={filterOptions.minPrice}
            maxPrice={filterOptions.maxPrice}
            onValueChange={handlePriceRangeChange}
          />
          
          <DataAmountFilter
            dataAmount={filterOptions.dataAmount}
            toggleDataFilter={toggleDataFilter}
            idPrefix="data"
          />
          
          <div className="grid grid-cols-1 gap-6">
            <CommitmentFilter
              commitment={filterOptions.commitment}
              toggleCommitmentFilter={toggleCommitmentFilter}
              idPrefix="commitment"
            />
            
            <NetworkFilter
              network={filterOptions.network}
              toggleNetworkFilter={toggleNetworkFilter}
              idPrefix="network"
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="price" className="mt-4">
        <PriceRangeFilter
          minPrice={filterOptions.minPrice}
          maxPrice={filterOptions.maxPrice}
          onValueChange={handlePriceRangeChange}
        />
      </TabsContent>
      
      <TabsContent value="data" className="mt-4">
        <DataAmountFilter
          dataAmount={filterOptions.dataAmount}
          toggleDataFilter={toggleDataFilter}
          idPrefix="data-tab"
        />
      </TabsContent>
      
      <TabsContent value="other" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CommitmentFilter
            commitment={filterOptions.commitment}
            toggleCommitmentFilter={toggleCommitmentFilter}
            idPrefix="commitment-tab"
          />
          
          <NetworkFilter
            network={filterOptions.network}
            toggleNetworkFilter={toggleNetworkFilter}
            idPrefix="network-tab"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
