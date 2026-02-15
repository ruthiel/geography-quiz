/**
 * Level calculation and management
 */

import { LEVELS, getLevelByPoints } from '../../constants/levels';

/**
 * Check if user leveled up after earning points
 */
export function checkLevelUp(previousPoints: number, newPoints: number): boolean {
  const previousLevel = getLevelByPoints(previousPoints);
  const newLevel = getLevelByPoints(newPoints);

  return newLevel.level > previousLevel.level;
}

/**
 * Get all levels
 */
export function getAllLevels() {
  return LEVELS;
}

/**
 * Get level by number
 */
export function getLevelByNumber(levelNumber: number) {
  return LEVELS.find(level => level.level === levelNumber) || LEVELS[0];
}
