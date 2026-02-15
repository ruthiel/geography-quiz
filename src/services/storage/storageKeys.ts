/**
 * Centralized localStorage key constants
 */

export const STORAGE_KEYS = {
  // Country data cache
  COUNTRIES_DATA: 'geography-quiz:countries-data',
  COUNTRIES_CACHE_TIMESTAMP: 'geography-quiz:countries-cache-timestamp',

  // User progress
  USER_PROGRESS: 'geography-quiz:user-progress',

  // Leaderboard
  LEADERBOARD: 'geography-quiz:leaderboard',

  // Settings
  PREFERENCES: 'geography-quiz:preferences',
} as const;

export const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
