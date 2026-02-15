/**
 * Achievement card component
 * Displays a single achievement with locked/unlocked states
 */

import type { Achievement } from '../../types/gamification.types';
import { ProgressBar } from '../ui/ProgressBar';
import './AchievementCard.css';

export interface AchievementCardProps {
  achievement: Achievement;
  showProgress?: boolean;
}

export function AchievementCard({ achievement, showProgress = true }: AchievementCardProps) {
  const { name, description, icon, unlocked, progress = 0, category } = achievement;

  return (
    <div className={`achievement-card achievement-card--${unlocked ? 'unlocked' : 'locked'}`}>
      <div className="achievement-card__icon-container">
        <div className={`achievement-card__icon ${!unlocked ? 'achievement-card__icon--locked' : ''}`}>
          {unlocked ? icon : '🔒'}
        </div>
        {unlocked && <div className="achievement-card__badge">✓</div>}
      </div>

      <div className="achievement-card__content">
        <h3 className="achievement-card__name">{name}</h3>
        <p className="achievement-card__description">{description}</p>

        {!unlocked && showProgress && progress > 0 && (
          <div className="achievement-card__progress">
            <ProgressBar
              current={progress}
              total={100}
              showLabel={false}
              variant="default"
            />
            <span className="achievement-card__progress-text">{Math.round(progress)}%</span>
          </div>
        )}

        <div className="achievement-card__category">{category}</div>
      </div>
    </div>
  );
}
