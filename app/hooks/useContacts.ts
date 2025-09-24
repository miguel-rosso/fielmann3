import { useState, useEffect } from 'react';
import { fetchContacts, fetchContactsBrands } from '../services/contactsApi';
import { Product } from '../context/CartContext';
import { GlassesApiParams } from '../types/api';

interface UseContactsReturn {
  contacts: Product[];
  loading: boolean;
  error: string | null;
  brands: string[];
  refetch: () => Promise<void>;
}

export function useContacts(params?: GlassesApiParams): UseContactsReturn {
  const [contacts, setContacts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchData = async () => {
    if (loading && hasInitialized) {
      console.log('Contacts fetch already in progress, skipping...');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Only fetch contacts data once, then extract brands from it
      const contactsData = await fetchContacts(params);
      const uniqueBrands = [...new Set(contactsData.map(p => p.brand).filter(Boolean))].sort();
      
      setContacts(contactsData);
      setBrands(uniqueBrands);
      setHasInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error in useContacts:', err);
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
    contacts,
    loading,
    error,
    brands,
    refetch: fetchData
  };
}