
import { PhonePlan } from "@/data/plans";

/**
 * Get saved comparisons from localStorage
 */
export const getSavedComparisons = (): {id: string, name: string, plans: PhonePlan[]}[] => {
  if (typeof window === 'undefined') return [];
  
  const savedComparisons = localStorage.getItem('savedComparisons');
  if (!savedComparisons) return [];
  
  try {
    return JSON.parse(savedComparisons);
  } catch (error) {
    console.error('Error parsing saved comparisons:', error);
    return [];
  }
};

/**
 * Save a comparison to localStorage
 */
export const saveComparison = (name: string, plans: PhonePlan[]): {id: string, name: string, plans: PhonePlan[]} => {
  const id = `comparison-${Date.now()}`;
  const newComparison = { id, name, plans };
  
  const existingComparisons = getSavedComparisons();
  const updatedComparisons = [...existingComparisons, newComparison];
  
  localStorage.setItem('savedComparisons', JSON.stringify(updatedComparisons));
  
  return newComparison;
};

/**
 * Delete a saved comparison from localStorage
 */
export const deleteComparison = (id: string): void => {
  const existingComparisons = getSavedComparisons();
  const updatedComparisons = existingComparisons.filter(
    (comparison) => comparison.id !== id
  );
  
  localStorage.setItem('savedComparisons', JSON.stringify(updatedComparisons));
};

/**
 * Share comparison via URL parameters
 */
export const getComparisonShareUrl = (plans: PhonePlan[]): string => {
  const planIds = plans.map((plan) => plan.id).join(',');
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?plans=${planIds}`;
};

/**
 * Get plan IDs from URL parameters
 */
export const getPlanIdsFromUrl = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  const params = new URLSearchParams(window.location.search);
  const planIdsParam = params.get('plans');
  
  if (!planIdsParam) return [];
  
  return planIdsParam.split(',');
};

