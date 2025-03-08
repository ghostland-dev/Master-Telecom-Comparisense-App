
import { ArrowRight, Award, TrendingDown, TrendingUp } from "lucide-react";
import { PhonePlan } from "@/data/plans";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComparisonSummaryProps {
  plans: PhonePlan[];
}

const ComparisonSummary = ({ plans }: ComparisonSummaryProps) => {
  if (plans.length === 0) return null;

  // Find the best value plan (data/price ratio)
  const getBestValuePlan = () => {
    return plans.reduce((best, current) => {
      const currentValue = current.data === "Unlimited" 
        ? Infinity 
        : parseInt(current.data.replace(/[^0-9]/g, '')) / current.price;
      
      const bestValue = best.data === "Unlimited" 
        ? Infinity 
        : parseInt(best.data.replace(/[^0-9]/g, '')) / best.price;
      
      return currentValue > bestValue ? current : best;
    }, plans[0]);
  };

  // Find the cheapest plan
  const getCheapestPlan = () => {
    return plans.reduce((cheapest, current) => 
      current.price < cheapest.price ? current : cheapest, plans[0]);
  };

  // Find the plan with most data
  const getMostDataPlan = () => {
    return plans.reduce((most, current) => {
      if (current.data === "Unlimited") return current;
      if (most.data === "Unlimited") return most;
      
      const currentData = parseInt(current.data.replace(/[^0-9]/g, ''));
      const mostData = parseInt(most.data.replace(/[^0-9]/g, ''));
      
      return currentData > mostData ? current : most;
    }, plans[0]);
  };

  const bestValuePlan = getBestValuePlan();
  const cheapestPlan = getCheapestPlan();
  const mostDataPlan = getMostDataPlan();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className={cn(
        "border-l-4", 
        bestValuePlan.id === cheapestPlan.id ? "border-l-green-500" : "border-l-blue-500"
      )}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Award className="text-blue-500" size={20} />
              <h3 className="font-medium">Meilleur rapport qualité/prix</h3>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/70">{bestValuePlan.provider.name}</p>
              <p className="font-medium">{bestValuePlan.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground/70">{bestValuePlan.data}</p>
              <p className="font-bold">{bestValuePlan.price}€/mois</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="text-green-500" size={20} />
              <h3 className="font-medium">Forfait le moins cher</h3>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/70">{cheapestPlan.provider.name}</p>
              <p className="font-medium">{cheapestPlan.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground/70">{cheapestPlan.data}</p>
              <p className="font-bold">{cheapestPlan.price}€/mois</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-purple-500" size={20} />
              <h3 className="font-medium">Plus de données</h3>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/70">{mostDataPlan.provider.name}</p>
              <p className="font-medium">{mostDataPlan.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground/70">{mostDataPlan.data}</p>
              <p className="font-bold">{mostDataPlan.price}€/mois</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonSummary;
