/**
 * Gamification system types for achievements, levels, and streaks
 */

export type AchievementCategory = 'milestone' | 'streak' | 'mastery' | 'perfect' | 'speed';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string; // Emoji or icon identifier
  unlocked: boolean;
  unlockedAt?: number; // Timestamp
  progress?: number; // 0-100 percentage for multi-step achievements
  target?: number; // Target value for progress-based achievements
}

export interface Level {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string; // Hex color for UI theming
}

export interface Streak {
  current: number; // Current streak count
  best: number; // Best streak ever achieved
  lastUpdated: number; // Timestamp
  type: 'correct' | 'daily'; // Correct answers or daily play
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  mode: string;
  accuracy: number;
  date: number; // Timestamp
  level: number;
}
