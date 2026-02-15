/**
 * Streak tracking hook
 * Manages both correct answer streaks and daily play streaks
 */

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Streak } from '../types/gamification.types';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

interface Streaks {
  correct: Streak;
  daily: Streak;
}

const DAILY_STREAK_GRACE_PERIOD = 36 * 60 * 60 * 1000; // 36 hours in ms

const createDefaultStreaks = (): Streaks => ({
  correct: {
    current: 0,
    best: 0,
    lastUpdated: Date.now(),
    type: 'correct',
  },
  daily: {
    current: 0,
    best: 0,
    lastUpdated: Date.now(),
    type: 'daily',
  },
});

export function useStreak() {
  const [streaks, setStreaks] = useLocalStorage<Streaks>(
    STORAGE_KEYS.USER_PROGRESS + ':streaks',
    createDefaultStreaks()
  );

  /**
   * Update correct answer streak
   */
  const updateCorrectStreak = useCallback((isCorrect: boolean) => {
    setStreaks(prev => {
      if (isCorrect) {
        const newCurrent = prev.correct.current + 1;
        return {
          ...prev,
          correct: {
            ...prev.correct,
            current: newCurrent,
            best: Math.max(newCurrent, prev.correct.best),
            lastUpdated: Date.now(),
          },
        };
      } else {
        // Reset streak on wrong answer
        return {
          ...prev,
          correct: {
            ...prev.correct,
            current: 0,
            lastUpdated: Date.now(),
          },
        };
      }
    });
  }, [setStreaks]);

  /**
   * Update daily play streak
   */
  const updateDailyStreak = useCallback(() => {
    setStreaks(prev => {
      const now = Date.now();
      const timeSinceLastPlay = now - prev.daily.lastUpdated;
      const oneDayMs = 24 * 60 * 60 * 1000;

      let newCurrent = prev.daily.current;

      // Check if this is a new day
      if (timeSinceLastPlay >= oneDayMs) {
        if (timeSinceLastPlay <= DAILY_STREAK_GRACE_PERIOD) {
          // Within grace period, increment streak
          newCurrent = prev.daily.current + 1;
        } else {
          // Grace period expired, reset streak
          newCurrent = 1;
        }
      }
      // If less than one day, keep current streak

      return {
        ...prev,
        daily: {
          ...prev.daily,
          current: newCurrent,
          best: Math.max(newCurrent, prev.daily.best),
          lastUpdated: now,
        },
      };
    });
  }, [setStreaks]);

  /**
   * Reset correct answer streak (for new quiz)
   */
  const resetCorrectStreak = useCallback(() => {
    setStreaks(prev => ({
      ...prev,
      correct: {
        ...prev.correct,
        current: 0,
        lastUpdated: Date.now(),
      },
    }));
  }, [setStreaks]);

  return {
    streaks,
    updateCorrectStreak,
    updateDailyStreak,
    resetCorrectStreak,
  };
}
