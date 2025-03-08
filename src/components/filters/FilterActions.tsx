
import { Button } from '@/components/ui/button';

interface FilterActionsProps {
  resetFilters: () => void;
  closeFilters: () => void;
}

export const FilterActions = ({ resetFilters, closeFilters }: FilterActionsProps) => {
  return (
    <div className="flex justify-end mt-4">
      <Button variant="outline" onClick={resetFilters} className="mr-2">
        Réinitialiser les filtres
      </Button>
      <Button onClick={closeFilters}>Appliquer les filtres</Button>
    </div>
  );
};
