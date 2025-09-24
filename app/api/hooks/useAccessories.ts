import { useState, useEffect } from 'react';
import { fetchAccessories, fetchAccessoriesBrands } from '@/api/services/accessoriesApi';
import { Product } from '@/context/CartContext';
import { GlassesApiParams } from '@/api/types/api';

interface UseAccessoriesReturn {
  accessories: Product[];
  loading: boolean;
  error: string | null;
  brands: string[];
  refetch: () => Promise<void>;
}

export function useAccessories(params?: GlassesApiParams): UseAccessoriesReturn {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchData = async () => {
    if (loading && hasInitialized) {
      console.log('Accessories fetch already in progress, skipping...');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Only fetch accessories data once, then extract brands from it
      const accessoriesData = await fetchAccessories(params);
      const uniqueBrands = [...new Set(accessoriesData.map(p => p.brand).filter(Boolean))].sort();
      
      setAccessories(accessoriesData);
      setBrands(uniqueBrands);
      setHasInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error in useAccessories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasInitialized) {
      fetchData();
    }
  }, [hasInitialized]);

  return {
    accessories,
    loading,
    error,
    brands,
    refetch: fetchData
  };
}