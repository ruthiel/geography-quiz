/**
 * Achievement unlock logic and progress tracking
 */

import type { Achievement } from '../../types/gamification.types';
import type { QuizStats } from '../../types/quiz.types';
import type { UserProgress } from '../../types/user.types';
import { ACHIEVEMENT_DEFINITIONS } from '../../constants/achievements';

/**
 * Initialize user achievements from definitions
 */
export function initializeAchievements(): Achievement[] {
  return ACHIEVEMENT_DEFINITIONS.map(def => ({
    ...def,
    unlocked: false,
    progress: 0,
  }));
}

/**
 * Check and unlock achievements based on quiz stats and user progress
 */
export function checkAchievements(
  currentAchievements: Achievement[],
  stats: QuizStats,
  userProgress: UserProgress,
  currentStreak: number,
  dailyStreak: number
): { updated: Achievement[]; newlyUnlocked: Achievement[] } {
  const updated = [...currentAchievements];
  const newlyUnlocked: Achievement[] = [];

  updated.forEach((achievement, index) => {
    if (achievement.unlocked) return;

    let shouldUnlock = false;
    let progress = 0;

    switch (achievement.id) {
      // Milestone achievements
      case 'first-quiz':
        shouldUnlock = userProgress.totalQuizzes >= 1;
        progress = Math.min(100, (userProgress.totalQuizzes / 1) * 100);
        break;

      case 'century':
        shouldUnlock = stats.totalPoints >= 100;
        progress = Math.min(100, (stats.totalPoints / 100) * 100);
        break;

      case 'thousand-club':
        shouldUnlock = userProgress.totalPoints >= 1000;
        progress = Math.min(100, (userProgress.totalPoints / 1000) * 100);
        break;

      case 'ten-quizzes':
        shouldUnlock = userProgress.totalQuizzes >= 10;
        progress = Math.min(100, (userProgress.totalQuizzes / 10) * 100);
        break;

      case 'fifty-quizzes':
        shouldUnlock = userProgress.totalQuizzes >= 50;
        progress = Math.min(100, (userProgress.totalQuizzes / 50) * 100);
        break;

      // Streak achievements
      case 'hot-streak':
        shouldUnlock = currentStreak >= 5;
        progress = Math.min(100, (currentStreak / 5) * 100);
        break;

      case 'on-fire':
        shouldUnlock = currentStreak >= 10;
        progress = Math.min(100, (currentStreak / 10) * 100);
        break;

      case 'unstoppable':
        shouldUnlock = currentStreak >= 20;
        progress = Math.min(100, (currentStreak / 20) * 100);
        break;

      case 'daily-dedication':
        shouldUnlock = dailyStreak >= 7;
        progress = Math.min(100, (dailyStreak / 7) * 100);
        break;

      // Mastery achievements
      case 'flag-master':
        if (stats.mode === 'flags' && stats.totalPoints >= 800) {
          shouldUnlock = true;
        }
        progress = stats.mode === 'flags' ? Math.min(100, (stats.totalPoints / 800) * 100) : 0;
        break;

      case 'capital-expert':
        if (stats.mode === 'capitals' && stats.totalPoints >= 800) {
          shouldUnlock = true;
        }
        progress = stats.mode === 'capitals' ? Math.min(100, (stats.totalPoints / 800) * 100) : 0;
        break;

      case 'currency-connoisseur':
        if (stats.mode === 'currencies' && stats.totalPoints >= 800) {
          shouldUnlock = true;
        }
        progress = stats.mode === 'currencies' ? Math.min(100, (stats.totalPoints / 800) * 100) : 0;
        break;

      // Perfect achievements
      case 'perfectionist':
        shouldUnlock = stats.accuracy === 100;
        progress = stats.accuracy;
        break;

      case 'flawless-victory':
        // All correct and all fast (<5s average)
        if (stats.accuracy === 100 && stats.averageTimePerQuestion < 5) {
          shouldUnlock = true;
          progress = 100;
        }
        break;

      // Speed achievements
      case 'quick-thinker':
        // This would need to be tracked during quiz - for now simplified
        if (stats.fastestAnswer < 3) {
          shouldUnlock = true;
          progress = 100;
        }
        break;

      case 'lightning-round':
        if (stats.averageTimePerQuestion < 5) {
          shouldUnlock = true;
          progress = 100;
        }
        break;
    }

    if (shouldUnlock && !achievement.unlocked) {
      updated[index] = {
        ...achievement,
        unlocked: true,
        unlockedAt: Date.now(),
        progress: 100,
      };
      newlyUnlocked.push(updated[index]);
    } else if (!achievement.unlocked) {
      updated[index] = {
        ...achievement,
        progress,
      };
    }
  });

  return { updated, newlyUnlocked };
}

/**
 * Get achievement completion percentage
 */
export function getAchievementCompletion(achievements: Achievement[]): number {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  return (unlockedCount / achievements.length) * 100;
}

/**
 * Get achievements by category with unlock status
 */
export function getAchievementsByCategory(achievements: Achievement[], category: string) {
  return achievements.filter(a => a.category === category);
}
