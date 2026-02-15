/**
 * Achievements list component
 * Displays a grid of achievement cards
 */

import type { Achievement } from '../../types/gamification.types';
import { AchievementCard } from './AchievementCard';
import './AchievementsList.css';

export interface AchievementsListProps {
  achievements: Achievement[];
  showProgress?: boolean;
}

export function AchievementsList({ achievements, showProgress = true }: AchievementsListProps) {
  if (achievements.length === 0) {
    return (
      <div className="achievements-list-empty">
        <p>No achievements in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="achievements-list">
      {achievements.map(achievement => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          showProgress={showProgress}
        />
      ))}
    </div>
  );
}
