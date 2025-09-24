import { useState, useEffect } from 'react';
import { fetchGlasses, fetchGlassesBrands, fetchGlassesCategories } from '../services/glassesApi';
import { Product } from '../context/CartContext';

export interface UseGlassesOptions {
  limit?: number;
  autoFetch?: boolean;
}

export interface UseGlassesReturn {
  glasses: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  brands: string[];
  categories: string[];
}

export function useGlasses(options: UseGlassesOptions = {}): UseGlassesReturn {
  const { limit = 20, autoFetch = true } = options;
  
  const [glasses, setGlasses] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchData = async () => {
    if (loading) {
      console.log('Fetch already in progress, skipping...');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching glasses data...');
      // Only fetch glasses data once, then extract brands and categories from it
      const glassesData = await fetchGlasses({ limit });
      
      // Extract unique brands and categories from the products
      const uniqueBrands = [...new Set(glassesData.map(p => p.brand).filter(Boolean))].sort();
      const uniqueCategories = [...new Set(glassesData.map(p => p.category).filter(Boolean))].sort();
      
      setGlasses(glassesData);
      setBrands(uniqueBrands);
      setCategories(uniqueCategories);
      setHasInitialized(true);
      
      console.log(`Successfully loaded ${glassesData.length} glasses products`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch glasses data';
      setError(errorMessage);
      console.error('Error fetching glasses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && !hasInitialized && !loading) {
      console.log('useGlasses useEffect triggered - initializing data fetch');
      fetchData();
    }
  }, [autoFetch, hasInitialized, loading]);

  return {
    glasses,
    loading,
    error,
    refetch: fetchData,
    brands,
    categories
  };
}