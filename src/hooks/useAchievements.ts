/**
 * Achievement management hook
 */

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Achievement } from '../types/gamification.types';
import type { QuizStats } from '../types/quiz.types';
import type { UserProgress } from '../types/user.types';
import { STORAGE_KEYS } from '../services/storage/storageKeys';
import { initializeAchievements, checkAchievements } from '../services/gamification/achievementEngine';

interface UseAchievementsResult {
  achievements: Achievement[];
  checkAndUnlock: (stats: QuizStats, userProgress: UserProgress, currentStreak: number, dailyStreak: number) => Achievement[];
  resetAchievements: () => void;
}

export function useAchievements(): UseAchievementsResult {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>(
    STORAGE_KEYS.USER_PROGRESS + ':achievements',
    initializeAchievements()
  );

  /**
   * Check conditions and unlock eligible achievements
   * Returns array of newly unlocked achievements
   */
  const checkAndUnlock = useCallback((
    stats: QuizStats,
    userProgress: UserProgress,
    currentStreak: number,
    dailyStreak: number
  ): Achievement[] => {
    const { updated, newlyUnlocked } = checkAchievements(
      achievements,
      stats,
      userProgress,
      currentStreak,
      dailyStreak
    );

    if (newlyUnlocked.length > 0) {
      setAchievements(updated);
    }

    return newlyUnlocked;
  }, [achievements, setAchievements]);

  /**
   * Reset all achievements (for debugging)
   */
  const resetAchievements = useCallback(() => {
    setAchievements(initializeAchievements());
  }, [setAchievements]);

  return {
    achievements,
    checkAndUnlock,
    resetAchievements,
  };
}
