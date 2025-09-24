import { useState, useEffect } from 'react';
import { fetchSunglasses, fetchSunglassesBrands } from '../services/sunglassesApi';
import { Product } from '../context/CartContext';
import { GlassesApiParams } from '../types/api';

interface UseSunglassesReturn {
  sunglasses: Product[];
  loading: boolean;
  error: string | null;
  brands: string[];
  refetch: () => Promise<void>;
}

export function useSunglasses(params?: GlassesApiParams): UseSunglassesReturn {
  const [sunglasses, setSunglasses] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchData = async () => {
    if (loading && hasInitialized) {
      console.log('Sunglasses fetch already in progress, skipping...');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Only fetch sunglasses data once, then extract brands from it
      const sunglassesData = await fetchSunglasses(params);
      const uniqueBrands = [...new Set(sunglassesData.map(p => p.brand).filter(Boolean))].sort();
      
      setSunglasses(sunglassesData);
      setBrands(uniqueBrands);
      setHasInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error in useSunglasses:', err);
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
    sunglasses,
    loading,
    error,
    brands,
    refetch: fetchData
  };
}