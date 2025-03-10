
import { Button } from '@/components/ui/button';
import { FilterOptions, initialFilterOptions } from '@/data/plans';

interface EmptyPlansProps {
  showResetButton: boolean;
  resetFilters: () => void;
}

export const EmptyPlans = ({ showResetButton, resetFilters }: EmptyPlansProps) => {
  return (
    <div className="p-8 text-center">
      <p className="text-foreground/70">Aucun forfait ne correspond aux critères sélectionnés.</p>
      {showResetButton && (
        <Button variant="link" onClick={resetFilters}>
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );
};
