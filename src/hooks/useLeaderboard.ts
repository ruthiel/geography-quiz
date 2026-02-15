/**
 * Leaderboard management hook
 * Manages local leaderboard with top 100 entries
 */

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { LeaderboardEntry } from '../types/gamification.types';
import type { QuizStats } from '../types/quiz.types';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

const MAX_LEADERBOARD_ENTRIES = 100;

interface UseLeaderboardResult {
  entries: LeaderboardEntry[];
  addEntry: (stats: QuizStats, playerName: string, level: number) => void;
  getTopEntries: (limit?: number) => LeaderboardEntry[];
  getEntriesByMode: (mode: string) => LeaderboardEntry[];
  getEntriesByTimePeriod: (days: number) => LeaderboardEntry[];
  clearLeaderboard: () => void;
}

export function useLeaderboard(): UseLeaderboardResult {
  const [entries, setEntries] = useLocalStorage<LeaderboardEntry[]>(
    STORAGE_KEYS.LEADERBOARD,
    []
  );

  /**
   * Add a new entry to the leaderboard
   */
  const addEntry = useCallback((stats: QuizStats, playerName: string, level: number) => {
    const newEntry: LeaderboardEntry = {
      id: crypto.randomUUID(),
      playerName,
      score: stats.totalPoints,
      mode: stats.mode,
      accuracy: stats.accuracy,
      date: stats.completedAt,
      level,
    };

    setEntries(prev => {
      // Add new entry
      const updated = [...prev, newEntry];

      // Sort by score descending
      updated.sort((a, b) => b.score - a.score);

      // Keep only top 100
      return updated.slice(0, MAX_LEADERBOARD_ENTRIES);
    });
  }, [setEntries]);

  /**
   * Get top N entries
   */
  const getTopEntries = useCallback((limit: number = 10): LeaderboardEntry[] => {
    return entries.slice(0, limit);
  }, [entries]);

  /**
   * Get entries filtered by quiz mode
   */
  const getEntriesByMode = useCallback((mode: string): LeaderboardEntry[] => {
    return entries.filter(entry => entry.mode === mode);
  }, [entries]);

  /**
   * Get entries from the last N days
   */
  const getEntriesByTimePeriod = useCallback((days: number): LeaderboardEntry[] => {
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    return entries.filter(entry => entry.date >= cutoffTime);
  }, [entries]);

  /**
   * Clear all leaderboard entries
   */
  const clearLeaderboard = useCallback(() => {
    setEntries([]);
  }, [setEntries]);

  return {
    entries,
    addEntry,
    getTopEntries,
    getEntriesByMode,
    getEntriesByTimePeriod,
    clearLeaderboard,
  };
}
