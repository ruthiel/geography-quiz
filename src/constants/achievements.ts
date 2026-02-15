/**
 * Achievement definitions
 */

import type { Achievement } from '../types/gamification.types';

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  // Milestone achievements
  {
    id: 'first-quiz',
    name: 'First Steps',
    description: 'Complete your first quiz',
    category: 'milestone',
    icon: '🎯',
    target: 1,
  },
  {
    id: 'century',
    name: 'Century Club',
    description: 'Score 100 points in a single quiz',
    category: 'milestone',
    icon: '💯',
    target: 100,
  },
  {
    id: 'thousand-club',
    name: 'Thousand Club',
    description: 'Accumulate 1,000 total points',
    category: 'milestone',
    icon: '🎖️',
    target: 1000,
  },
  {
    id: 'ten-quizzes',
    name: 'Dedicated Learner',
    description: 'Complete 10 quizzes',
    category: 'milestone',
    icon: '📚',
    target: 10,
  },
  {
    id: 'fifty-quizzes',
    name: 'Geography Enthusiast',
    description: 'Complete 50 quizzes',
    category: 'milestone',
    icon: '🌟',
    target: 50,
  },

  // Streak achievements
  {
    id: 'hot-streak',
    name: 'Hot Streak',
    description: 'Get 5 correct answers in a row',
    category: 'streak',
    icon: '🔥',
    target: 5,
  },
  {
    id: 'on-fire',
    name: 'On Fire',
    description: 'Get 10 correct answers in a row',
    category: 'streak',
    icon: '🔥🔥',
    target: 10,
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Get 20 correct answers in a row',
    category: 'streak',
    icon: '🔥🔥🔥',
    target: 20,
  },
  {
    id: 'daily-dedication',
    name: 'Daily Dedication',
    description: 'Play for 7 days in a row',
    category: 'streak',
    icon: '📅',
    target: 7,
  },

  // Mastery achievements
  {
    id: 'flag-master',
    name: 'Flag Master',
    description: 'Score 800+ points in a Flags quiz',
    category: 'mastery',
    icon: '🏴',
    target: 800,
  },
  {
    id: 'capital-expert',
    name: 'Capital Expert',
    description: 'Score 800+ points in a Capitals quiz',
    category: 'mastery',
    icon: '🏛️',
    target: 800,
  },
  {
    id: 'currency-connoisseur',
    name: 'Currency Connoisseur',
    description: 'Score 800+ points in a Currencies quiz',
    category: 'mastery',
    icon: '💰',
    target: 800,
  },

  // Perfect achievements
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 100% accuracy in a quiz',
    category: 'perfect',
    icon: '⭐',
    target: 100,
  },
  {
    id: 'flawless-victory',
    name: 'Flawless Victory',
    description: 'Complete a perfect quiz with all fast answers',
    category: 'perfect',
    icon: '👑',
    target: 1,
  },

  // Speed achievements
  {
    id: 'quick-thinker',
    name: 'Quick Thinker',
    description: 'Answer 5 questions in under 3 seconds each',
    category: 'speed',
    icon: '⚡',
    target: 5,
  },
  {
    id: 'lightning-round',
    name: 'Lightning Round',
    description: 'Complete a full quiz with average time under 5 seconds',
    category: 'speed',
    icon: '⚡⚡',
    target: 1,
  },
];

/**
 * Get all achievement definitions
 */
export function getAllAchievementDefinitions() {
  return ACHIEVEMENT_DEFINITIONS;
}

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string) {
  return ACHIEVEMENT_DEFINITIONS.find(achievement => achievement.id === id);
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(category: string) {
  return ACHIEVEMENT_DEFINITIONS.filter(achievement => achievement.category === category);
}
