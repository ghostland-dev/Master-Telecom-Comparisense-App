
import { useState, useEffect } from 'react';
import { PhonePlan, FilterOptions, initialFilterOptions } from '@/data/plans';

export function usePlansFilter(plans: PhonePlan[]) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilterOptions);
  const [filteredPlans, setFilteredPlans] = useState<PhonePlan[]>(plans);
  const [sortBy, setSortBy] = useState<'price' | 'data'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);
  const [bestValue, setBestValue] = useState<string | null>(null);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...plans];
    
    // Filter by price
    result = result.filter(plan => 
      plan.price >= filterOptions.minPrice && plan.price <= filterOptions.maxPrice
    );
    
    // Filter by data amount
    if (filterOptions.dataAmount.length > 0) {
      result = result.filter(plan => {
        if (plan.data === 'Unlimited' && filterOptions.dataAmount.includes('unlimited')) {
          return true;
        }
        
        const dataNumber = parseInt(plan.data.replace(/[^0-9]/g, ''));
        
        if (filterOptions.dataAmount.includes('low') && dataNumber < 50) {
          return true;
        }
        if (filterOptions.dataAmount.includes('medium') && dataNumber >= 50 && dataNumber <= 150) {
          return true;
        }
        if (filterOptions.dataAmount.includes('high') && dataNumber > 150) {
          return true;
        }
        
        return false;
      });
    }
    
    // Filter by commitment
    if (filterOptions.commitment.length > 0) {
      result = result.filter(plan => filterOptions.commitment.includes(plan.commitment));
    }
    
    // Filter by network
    if (filterOptions.network.length > 0) {
      result = result.filter(plan => {
        if (plan.network === '4G/5G') {
          return filterOptions.network.includes('4G') || filterOptions.network.includes('5G');
        }
        return filterOptions.network.includes(plan.network);
      });
    }
    
    // Find best value plan
    if (result.length > 0) {
      const bestPlan = result.reduce((best, current) => {
        // For unlimited data, consider it as highest value
        if (current.data === 'Unlimited') return current;
        if (best.data === 'Unlimited') return best;
        
        const currentDataValue = parseInt(current.data.replace(/[^0-9]/g, '')) / current.price;
        const bestDataValue = parseInt(best.data.replace(/[^0-9]/g, '')) / best.price;
        
        return currentDataValue > bestDataValue ? current : best;
      }, result[0]);
      
      setBestValue(bestPlan.id);
    } else {
      setBestValue(null);
    }
    
    // Apply sorting
    result = applySorting(result, sortBy, sortOrder);
    
    // Simulate loading for better UX
    setLoading(true);
    setTimeout(() => {
      setFilteredPlans(result);
      setLoading(false);
    }, 300);
  }, [plans, filterOptions, sortBy, sortOrder]);

  const applySorting = (plans: PhonePlan[], sortBy: 'price' | 'data', sortOrder: 'asc' | 'desc') => {
    return [...plans].sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else {
        // For data sorting, handle 'Unlimited' as highest value
        const getDataValue = (plan: PhonePlan) => {
          if (plan.data === 'Unlimited') return Number.MAX_SAFE_INTEGER;
          return parseInt(plan.data.replace(/[^0-9]/g, ''));
        };
        
        const aValue = getDataValue(a);
        const bValue = getDataValue(b);
        
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
  };

  const toggleSorting = (column: 'price' | 'data') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const resetFilters = () => {
    setFilterOptions(initialFilterOptions);
  };

  return {
    filterOptions,
    setFilterOptions,
    filteredPlans,
    sortBy,
    sortOrder,
    loading,
    bestValue,
    toggleSorting,
    resetFilters
  };
}
