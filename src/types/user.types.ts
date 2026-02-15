/**
 * User progress and statistics tracking
 */

import { Achievement, Streak } from './gamification.types';
import { QuizMode } from './quiz.types';

export interface ModeStats {
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  averageAccuracy: number;
  bestScore: number;
  fastestCompletion: number; // Seconds for full quiz
}

export interface UserProgress {
  id: string;
  playerName: string;
  createdAt: number; // Timestamp
  lastPlayedAt: number; // Timestamp

  // Overall stats
  totalPoints: number;
  currentLevel: number;
  totalQuizzes: number;

  // Per-mode statistics
  modeStats: {
    [key in QuizMode]: ModeStats;
  };

  // Gamification
  achievements: Achievement[];
  streaks: {
    correct: Streak;
    daily: Streak;
  };

  // Preferences
  preferences: {
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  };
}

export const createDefaultUserProgress = (): UserProgress => {
  const now = Date.now();

  const defaultModeStats: ModeStats = {
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    totalPoints: 0,
    averageAccuracy: 0,
    bestScore: 0,
    fastestCompletion: 0,
  };

  return {
    id: crypto.randomUUID(),
    playerName: 'Geography Explorer',
    createdAt: now,
    lastPlayedAt: now,
    totalPoints: 0,
    currentLevel: 1,
    totalQuizzes: 0,
    modeStats: {
      flags: { ...defaultModeStats },
      capitals: { ...defaultModeStats },
      currencies: { ...defaultModeStats },
      mixed: { ...defaultModeStats },
    },
    achievements: [],
    streaks: {
      correct: {
        current: 0,
        best: 0,
        lastUpdated: now,
        type: 'correct',
      },
      daily: {
        current: 0,
        best: 0,
        lastUpdated: now,
        type: 'daily',
      },
    },
    preferences: {
      soundEnabled: true,
      vibrationEnabled: true,
    },
  };
};
