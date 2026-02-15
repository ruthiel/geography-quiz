/**
 * Score calculation logic for quiz answers
 */

export interface ScoreParams {
  isCorrect: boolean;
  timeSpent: number; // seconds
  streakMultiplier?: number; // 1x to 5x
}

export interface ScoreResult {
  points: number;
  breakdown: {
    base: number;
    timeBonus: number;
    streakMultiplier: number;
  };
}

// Base points for correct answer
const BASE_POINTS = 100;

// Time thresholds for bonus points
const FAST_THRESHOLD = 5; // seconds
const MEDIUM_THRESHOLD = 10; // seconds

// Time bonus amounts
const FAST_BONUS = 50;
const MEDIUM_BONUS = 25;

/**
 * Calculate points earned for a quiz answer
 */
export function calculateScore(params: ScoreParams): ScoreResult {
  const { isCorrect, timeSpent, streakMultiplier = 1 } = params;

  // No points for wrong answers
  if (!isCorrect) {
    return {
      points: 0,
      breakdown: {
        base: 0,
        timeBonus: 0,
        streakMultiplier: 1,
      },
    };
  }

  // Base points
  const base = BASE_POINTS;

  // Time bonus
  let timeBonus = 0;
  if (timeSpent < FAST_THRESHOLD) {
    timeBonus = FAST_BONUS;
  } else if (timeSpent < MEDIUM_THRESHOLD) {
    timeBonus = MEDIUM_BONUS;
  }

  // Calculate subtotal before multiplier
  const subtotal = base + timeBonus;

  // Apply streak multiplier
  const finalPoints = Math.floor(subtotal * streakMultiplier);

  return {
    points: finalPoints,
    breakdown: {
      base,
      timeBonus,
      streakMultiplier,
    },
  };
}

/**
 * Get streak multiplier based on current streak
 */
export function getStreakMultiplier(streak: number): number {
  if (streak >= 20) return 5;
  if (streak >= 15) return 4;
  if (streak >= 10) return 3;
  if (streak >= 5) return 2;
  return 1;
}
