/**
 * Country data types matching REST Countries API v3.1 response
 * API: https://restcountries.com/v3.1/all
 */

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // Two-letter country code
  cca3: string; // Three-letter country code
  capital?: string[];
  currencies?: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  region: string;
  subregion?: string;
  population: number;
  languages?: {
    [code: string]: string;
  };
}

/**
 * Normalized country data for quiz usage
 */
export interface NormalizedCountry {
  code: string; // cca3
  name: string; // common name
  capital: string | null;
  currency: string | null; // Primary currency name
  currencyCode: string | null; // Primary currency code
  currencySymbol: string | null;
  flagUrl: string; // SVG flag URL
  flagPngUrl: string; // PNG flag URL
  region: string;
  subregion: string | null;
  population: number;
}
