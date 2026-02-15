/**
 * Cache utilities for API responses
 */

import { storageService } from '../storage/storageService';
import { CACHE_TTL } from '../storage/storageKeys';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const apiCache = {
  /**
   * Check if cached data is still valid
   */
  isValid(timestamp: number, ttl: number = CACHE_TTL): boolean {
    return Date.now() - timestamp < ttl;
  },

  /**
   * Get cached data if valid
   */
  get<T>(key: string, ttl?: number): T | null {
    const entry = storageService.get<CacheEntry<T>>(key);
    if (!entry) {
      return null;
    }

    if (this.isValid(entry.timestamp, ttl)) {
      return entry.data;
    }

    // Cache expired, remove it
    storageService.remove(key);
    return null;
  },

  /**
   * Set cached data with timestamp
   */
  set<T>(key: string, data: T): boolean {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    return storageService.set(key, entry);
  },

  /**
   * Get stale cache data regardless of expiration (fallback for offline)
   */
  getStale<T>(key: string): T | null {
    const entry = storageService.get<CacheEntry<T>>(key);
    return entry?.data ?? null;
  },

  /**
   * Clear specific cache entry
   */
  clear(key: string): boolean {
    return storageService.remove(key);
  },
};
