/**
 * Streak counter component
 * Displays current streak with fire emoji indicator
 */

import { getStreakMultiplier, getStreakTier } from '../../services/gamification/scoreCalculator';
import './StreakCounter.css';

export interface StreakCounterProps {
  streak: number;
  showMultiplier?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function StreakCounter({ streak, showMultiplier = true, size = 'medium' }: StreakCounterProps) {
  const multiplier = getStreakMultiplier(streak);
  const tier = getStreakTier(streak);

  // Get fire emoji based on streak level
  const getFireEmoji = () => {
    if (streak >= 20) return '🔥🔥🔥';
    if (streak >= 10) return '🔥🔥';
    if (streak >= 5) return '🔥';
    return '⚡';
  };

  if (streak === 0) {
    return null; // Don't show if no streak
  }

  return (
    <div className={`streak-counter streak-counter--${size} streak-counter--${tier.toLowerCase()}`}>
      <div className="streak-counter__icon">{getFireEmoji()}</div>
      <div className="streak-counter__content">
        <div className="streak-counter__count">{streak} Streak</div>
        {showMultiplier && multiplier > 1 && (
          <div className="streak-counter__multiplier">{multiplier}x Points!</div>
        )}
      </div>
    </div>
  );
}
