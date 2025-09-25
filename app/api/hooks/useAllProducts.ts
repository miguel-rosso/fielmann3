import { useState, useEffect } from 'react';
import { fetchGlasses } from '@/api/services/glassesApi';
import { fetchSunglasses } from '@/api/services/sunglassesApi';
import { fetchAccessories } from '@/api/services/accessoriesApi';
import { Product } from '@/context/CartContext';

export interface UseAllProductsOptions {
  limit?: number;
  autoFetch?: boolean;
}

export interface UseAllProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  brands: string[];
}

export function useAllProducts(options: UseAllProductsOptions = {}): UseAllProductsReturn {
  const { limit = 20, autoFetch = true } = options;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
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
      console.log('Fetching all products data...');
      
      // Fetch products from selected categories (excluding contact lenses for faster loading)
      const [glassesData, sunglassesData, accessoriesData] = await Promise.all([
        fetchGlasses({ limit: Math.ceil(limit / 3) }).catch(() => []),
        fetchSunglasses({ limit: Math.ceil(limit / 3) }).catch(() => []),
        fetchAccessories({ limit: Math.ceil(limit / 3) }).catch(() => [])
      ]);
      
      // Combine all products
      const allProducts = [
        ...glassesData,
        ...sunglassesData,
        ...accessoriesData
      ];
      
      // Shuffle the products to get a good mix
      const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
      
      // Limit to requested number
      const limitedProducts = shuffledProducts.slice(0, limit);
      
      // Extract unique brands from all products
      const uniqueBrands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))].sort();
      
      setProducts(limitedProducts);
      setBrands(uniqueBrands);
      setHasInitialized(true);
      
      console.log(`Successfully loaded ${limitedProducts.length} products from glasses, sunglasses, and accessories`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products data';
      setError(errorMessage);
      console.error('Error fetching all products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && !hasInitialized && !loading) {
      console.log('useAllProducts useEffect triggered - initializing data fetch');
      fetchData();
    }
  }, [autoFetch, hasInitialized, loading]);

  return {
    products,
    loading,
    error,
    refetch: fetchData,
    brands
  };
}