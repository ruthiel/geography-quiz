/**
 * User progress management hook
 * Handles loading, updating, and persisting user data
 */

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { UserProgress } from '../types/user.types';
import { createDefaultUserProgress } from '../types/user.types';
import type { QuizStats } from '../types/quiz.types';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

interface UseUserProgressResult {
  userProgress: UserProgress;
  updateAfterQuiz: (stats: QuizStats) => void;
  resetProgress: () => void;
}

export function useUserProgress(): UseUserProgressResult {
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>(
    STORAGE_KEYS.USER_PROGRESS,
    createDefaultUserProgress()
  );

  /**
   * Update user progress after completing a quiz
   */
  const updateAfterQuiz = useCallback((stats: QuizStats) => {
    setUserProgress(prev => {
      const { mode } = stats;
      const modeStats = prev.modeStats[mode];

      // Update mode-specific stats
      const updatedModeStats = {
        totalQuizzes: modeStats.totalQuizzes + 1,
        totalQuestions: modeStats.totalQuestions + stats.totalQuestions,
        correctAnswers: modeStats.correctAnswers + stats.correctAnswers,
        totalPoints: modeStats.totalPoints + stats.totalPoints,
        averageAccuracy:
          ((modeStats.averageAccuracy * modeStats.totalQuizzes + stats.accuracy) /
          (modeStats.totalQuizzes + 1)),
        bestScore: Math.max(modeStats.bestScore, stats.totalPoints),
        fastestCompletion:
          modeStats.fastestCompletion === 0
            ? stats.averageTimePerQuestion * stats.totalQuestions
            : Math.min(
                modeStats.fastestCompletion,
                stats.averageTimePerQuestion * stats.totalQuestions
              ),
      };

      return {
        ...prev,
        totalPoints: prev.totalPoints + stats.totalPoints,
        totalQuizzes: prev.totalQuizzes + 1,
        lastPlayedAt: Date.now(),
        modeStats: {
          ...prev.modeStats,
          [mode]: updatedModeStats,
        },
      };
    });
  }, [setUserProgress]);

  /**
   * Reset all progress (for debugging or user request)
   */
  const resetProgress = useCallback(() => {
    setUserProgress(createDefaultUserProgress());
  }, [setUserProgress]);

  return {
    userProgress,
    updateAfterQuiz,
    resetProgress,
  };
}
