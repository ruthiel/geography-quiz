/**
 * Achievements screen component
 * Displays all achievements with filtering by category
 */

import { useState } from 'react';
import type { Achievement, AchievementCategory } from '../../types/gamification.types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AchievementsList } from '../gamification/AchievementsList';
import { getAchievementCompletion } from '../../services/gamification/achievementEngine';
import './AchievementsScreen.css';

export interface AchievementsScreenProps {
  achievements: Achievement[];
  onBack: () => void;
}

const CATEGORIES: { value: AchievementCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'milestone', label: 'Milestones' },
  { value: 'streak', label: 'Streaks' },
  { value: 'mastery', label: 'Mastery' },
  { value: 'perfect', label: 'Perfect' },
  { value: 'speed', label: 'Speed' },
];

export function AchievementsScreen({ achievements, onBack }: AchievementsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const completion = getAchievementCompletion(achievements);

  return (
    <div className="achievements-screen">
      <div className="achievements-screen__container">
        {/* Header */}
        <div className="achievements-screen__header">
          <Button variant="secondary" size="small" onClick={onBack}>
            ← Back
          </Button>
          <h1 className="achievements-screen__title">Achievements</h1>
          <div className="achievements-screen__stats">
            <span className="achievements-screen__count">
              {unlockedCount} / {achievements.length}
            </span>
            <span className="achievements-screen__completion">
              {Math.round(completion)}% Complete
            </span>
          </div>
        </div>

        {/* Category filter */}
        <Card variant="outlined" padding="small">
          <div className="achievements-screen__filters">
            {CATEGORIES.map(category => (
              <button
                key={category.value}
                className={`achievements-screen__filter ${
                  selectedCategory === category.value ? 'achievements-screen__filter--active' : ''
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Achievements grid */}
        <AchievementsList achievements={filteredAchievements} />
      </div>
    </div>
  );
}
