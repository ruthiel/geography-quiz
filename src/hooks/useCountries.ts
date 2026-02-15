/**
 * Hook for fetching and managing country data
 */

import { useState, useEffect } from 'react';
import type { NormalizedCountry } from '../types/country.types';
import { fetchCountries } from '../services/api/countriesApi';

interface UseCountriesResult {
  countries: NormalizedCountry[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useCountries(): UseCountriesResult {
  const [countries, setCountries] = useState<NormalizedCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCountries();
      setCountries(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Failed to load countries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const refresh = async () => {
    await loadCountries();
  };

  return {
    countries,
    loading,
    error,
    refresh,
  };
}
