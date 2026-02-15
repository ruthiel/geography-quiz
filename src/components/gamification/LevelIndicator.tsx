/**
 * Level indicator component
 * Displays current level with progress bar
 */

import { getLevelByPoints, getLevelProgress, getPointsToNextLevel } from '../../constants/levels';
import './LevelIndicator.css';

export interface LevelIndicatorProps {
  totalPoints: number;
  showProgress?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function LevelIndicator({ totalPoints, showProgress = true, size = 'medium' }: LevelIndicatorProps) {
  const level = getLevelByPoints(totalPoints);
  const progress = getLevelProgress(totalPoints);
  const pointsToNext = getPointsToNextLevel(totalPoints);

  return (
    <div className={`level-indicator level-indicator--${size}`}>
      <div
        className="level-indicator__badge"
        style={{ backgroundColor: level.color }}
      >
        <div className="level-indicator__number">{level.level}</div>
      </div>

      <div className="level-indicator__info">
        <div className="level-indicator__name">{level.name}</div>

        {showProgress && (
          <>
            <div className="level-indicator__progress-bar">
              <div
                className="level-indicator__progress-fill"
                style={{
                  width: `${progress}%`,
                  backgroundColor: level.color
                }}
              />
            </div>
            {pointsToNext > 0 && (
              <div className="level-indicator__next">
                {pointsToNext.toLocaleString()} points to next level
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
