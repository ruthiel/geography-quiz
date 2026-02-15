/**
 * REST Countries API integration with caching
 * API Documentation: https://restcountries.com/
 */

import { Country, NormalizedCountry } from '../../types/country.types';
import { apiCache } from './apiCache';
import { STORAGE_KEYS } from '../storage/storageKeys';

const API_BASE_URL = 'https://restcountries.com/v3.1';
const API_ENDPOINT = `${API_BASE_URL}/all`;

// Fields to request from API (reduces payload size)
const FIELDS = [
  'name',
  'cca2',
  'cca3',
  'capital',
  'currencies',
  'flags',
  'region',
  'subregion',
  'population',
  'languages',
].join(',');

/**
 * Normalize country data from API response to simplified format
 */
function normalizeCountry(country: Country): NormalizedCountry {
  // Get primary currency (first one in object)
  const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : null;
  const primaryCurrency = currencyCode && country.currencies ? country.currencies[currencyCode] : null;

  // Get primary capital (first one in array)
  const capital = country.capital && country.capital.length > 0 ? country.capital[0] : null;

  return {
    code: country.cca3,
    name: country.name.common,
    capital,
    currency: primaryCurrency?.name ?? null,
    currencyCode: currencyCode ?? null,
    currencySymbol: primaryCurrency?.symbol ?? null,
    flagUrl: country.flags.svg,
    flagPngUrl: country.flags.png,
    region: country.region,
    subregion: country.subregion ?? null,
    population: country.population,
  };
}

/**
 * Fetch countries from API with caching strategy
 */
export async function fetchCountries(): Promise<NormalizedCountry[]> {
  // Try to get from cache first
  const cached = apiCache.get<NormalizedCountry[]>(STORAGE_KEYS.COUNTRIES_DATA);
  if (cached) {
    console.log('Using cached country data');
    return cached;
  }

  try {
    console.log('Fetching fresh country data from API...');
    const response = await fetch(`${API_ENDPOINT}?fields=${FIELDS}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: Country[] = await response.json();

    // Normalize the data
    const normalized = data
      .map(normalizeCountry)
      // Filter out countries without essential data
      .filter(country => country.name && country.flagUrl);

    // Cache the normalized data
    apiCache.set(STORAGE_KEYS.COUNTRIES_DATA, normalized);

    console.log(`Fetched and cached ${normalized.length} countries`);
    return normalized;
  } catch (error) {
    console.error('Error fetching countries:', error);

    // Try to use stale cache as fallback
    const staleCache = apiCache.getStale<NormalizedCountry[]>(STORAGE_KEYS.COUNTRIES_DATA);
    if (staleCache) {
      console.warn('Using stale cache due to fetch error');
      return staleCache;
    }

    // No cache available, throw error
    throw new Error('Failed to fetch country data and no cache available');
  }
}

/**
 * Manually refresh country data (clear cache and fetch fresh)
 */
export async function refreshCountries(): Promise<NormalizedCountry[]> {
  apiCache.clear(STORAGE_KEYS.COUNTRIES_DATA);
  return fetchCountries();
}

/**
 * Get cache status
 */
export function getCacheStatus(): { cached: boolean; timestamp: number | null } {
  const entry = apiCache.get<NormalizedCountry[]>(STORAGE_KEYS.COUNTRIES_DATA);
  return {
    cached: entry !== null,
    timestamp: entry ? Date.now() : null,
  };
}
