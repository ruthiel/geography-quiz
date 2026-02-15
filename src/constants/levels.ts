/**
 * Level system definitions
 */

import type { Level } from '../types/gamification.types';

export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Geography Novice',
    minPoints: 0,
    maxPoints: 999,
    color: '#94a3b8', // Slate 400
  },
  {
    level: 2,
    name: 'World Explorer',
    minPoints: 1000,
    maxPoints: 2499,
    color: '#22c55e', // Green 500
  },
  {
    level: 3,
    name: 'Globe Trotter',
    minPoints: 2500,
    maxPoints: 4999,
    color: '#3b82f6', // Blue 500
  },
  {
    level: 4,
    name: 'Cartographer',
    minPoints: 5000,
    maxPoints: 9999,
    color: '#a855f7', // Purple 500
  },
  {
    level: 5,
    name: 'Geography Master',
    minPoints: 10000,
    maxPoints: 19999,
    color: '#f59e0b', // Amber 500
  },
  {
    level: 6,
    name: 'World Champion',
    minPoints: 20000,
    maxPoints: Infinity,
    color: '#ef4444', // Red 500
  },
];

/**
 * Get level info based on total points
 */
export function getLevelByPoints(points: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

/**
 * Get progress to next level (0-100%)
 */
export function getLevelProgress(points: number): number {
  const currentLevel = getLevelByPoints(points);

  if (currentLevel.maxPoints === Infinity) {
    return 100; // Max level reached
  }

  const pointsInLevel = points - currentLevel.minPoints;
  const levelRange = currentLevel.maxPoints - currentLevel.minPoints + 1;

  return Math.min(100, (pointsInLevel / levelRange) * 100);
}

/**
 * Calculate points needed for next level
 */
export function getPointsToNextLevel(points: number): number {
  const currentLevel = getLevelByPoints(points);

  if (currentLevel.maxPoints === Infinity) {
    return 0; // Already at max level
  }

  return currentLevel.maxPoints + 1 - points;
}
