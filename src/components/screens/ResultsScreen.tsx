/**
 * Results screen component
 * Displays quiz results and statistics
 */

import { useState } from 'react';
import type { QuizStats } from '../../types/quiz.types';
import type { Achievement } from '../../types/gamification.types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { AchievementCard } from '../gamification/AchievementCard';
import './ResultsScreen.css';

export interface ResultsScreenProps {
  stats: QuizStats;
  onRetry: () => void;
  onHome: () => void;
  onViewLeaderboard?: () => void;
  newlyUnlockedAchievements?: Achievement[];
}

export function ResultsScreen({ stats, onRetry, onHome, onViewLeaderboard, newlyUnlockedAchievements = [] }: ResultsScreenProps) {
  const [showAchievementModal, setShowAchievementModal] = useState(newlyUnlockedAchievements.length > 0);
  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'var(--color-success)';
    if (accuracy >= 70) return 'var(--color-primary)';
    if (accuracy >= 50) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getPerformanceMessage = (accuracy: number) => {
    if (accuracy === 100) return '🎉 Perfect Score!';
    if (accuracy >= 90) return '🌟 Excellent!';
    if (accuracy >= 70) return '👏 Great Job!';
    if (accuracy >= 50) return '👍 Good Effort!';
    return '💪 Keep Practicing!';
  };

  return (
    <div className="results-screen">
      <div className="results-screen__container">
        {/* Header */}
        <div className="results-screen__header">
          <h1 className="results-screen__title">Quiz Complete!</h1>
          <p className="results-screen__message">
            {getPerformanceMessage(stats.accuracy)}
          </p>
        </div>

        {/* Main score card */}
        <Card variant="elevated" padding="large" className="results-screen__score-card">
          <div className="results-screen__score">
            <div className="results-screen__score-label">Your Score</div>
            <div className="results-screen__score-value">{stats.totalPoints}</div>
            <div className="results-screen__score-subtitle">points</div>
          </div>

          <div className="results-screen__accuracy">
            <div
              className="results-screen__accuracy-circle"
              style={{ borderColor: getAccuracyColor(stats.accuracy) }}
            >
              <div
                className="results-screen__accuracy-value"
                style={{ color: getAccuracyColor(stats.accuracy) }}
              >
                {Math.round(stats.accuracy)}%
              </div>
              <div className="results-screen__accuracy-label">Accuracy</div>
            </div>
          </div>
        </Card>

        {/* Stats breakdown */}
        <Card variant="outlined" padding="medium">
          <h2 className="results-screen__stats-title">Statistics</h2>
          <div className="results-screen__stats-grid">
            <div className="results-screen__stat">
              <div className="results-screen__stat-icon">✅</div>
              <div className="results-screen__stat-content">
                <div className="results-screen__stat-value">
                  {stats.correctAnswers} / {stats.totalQuestions}
                </div>
                <div className="results-screen__stat-label">Correct Answers</div>
              </div>
            </div>

            <div className="results-screen__stat">
              <div className="results-screen__stat-icon">⚡</div>
              <div className="results-screen__stat-content">
                <div className="results-screen__stat-value">
                  {formatTime(stats.fastestAnswer)}
                </div>
                <div className="results-screen__stat-label">Fastest Answer</div>
              </div>
            </div>

            <div className="results-screen__stat">
              <div className="results-screen__stat-icon">⏱️</div>
              <div className="results-screen__stat-content">
                <div className="results-screen__stat-value">
                  {formatTime(stats.averageTimePerQuestion)}
                </div>
                <div className="results-screen__stat-label">Avg. Time per Question</div>
              </div>
            </div>

            <div className="results-screen__stat">
              <div className="results-screen__stat-icon">🎯</div>
              <div className="results-screen__stat-content">
                <div className="results-screen__stat-value">
                  {stats.mode.charAt(0).toUpperCase() + stats.mode.slice(1)}
                </div>
                <div className="results-screen__stat-label">Quiz Mode</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="results-screen__actions">
          <Button variant="primary" size="large" fullWidth onClick={onRetry}>
            Play Again
          </Button>
          {onViewLeaderboard && (
            <Button variant="secondary" size="large" fullWidth onClick={onViewLeaderboard}>
              📊 View Leaderboard
            </Button>
          )}
          <Button variant="secondary" size="large" fullWidth onClick={onHome}>
            Back to Home
          </Button>
        </div>

        {/* Achievement unlock modal */}
        <Modal
          isOpen={showAchievementModal}
          onClose={() => setShowAchievementModal(false)}
          title="🎉 Achievement Unlocked!"
          size="medium"
        >
          <div className="results-screen__achievements">
            {newlyUnlockedAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                showProgress={false}
              />
            ))}
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => setShowAchievementModal(false)}
            >
              Awesome!
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
