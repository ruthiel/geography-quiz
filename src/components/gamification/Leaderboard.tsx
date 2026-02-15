/**
 * Leaderboard component
 * Displays ranked list of scores
 */

import type { LeaderboardEntry } from '../../types/gamification.types';
import { Card } from '../ui/Card';
import './Leaderboard.css';

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  showMode?: boolean;
  limit?: number;
}

export function Leaderboard({ entries, currentUserId, showMode = true, limit }: LeaderboardProps) {
  const displayEntries = limit ? entries.slice(0, limit) : entries;

  if (displayEntries.length === 0) {
    return (
      <Card variant="outlined" padding="large">
        <div className="leaderboard-empty">
          <p>No scores yet. Be the first to set a record!</p>
        </div>
      </Card>
    );
  }

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="leaderboard">
      {displayEntries.map((entry, index) => {
        const rank = index + 1;
        const medal = getRankMedal(rank);
        const isCurrentUser = entry.id === currentUserId;

        return (
          <Card
            key={entry.id}
            variant={isCurrentUser ? 'elevated' : 'outlined'}
            padding="medium"
            className={`leaderboard-entry ${isCurrentUser ? 'leaderboard-entry--current' : ''}`}
          >
            <div className="leaderboard-entry__rank">
              {medal || `#${rank}`}
            </div>

            <div className="leaderboard-entry__content">
              <div className="leaderboard-entry__player">
                {entry.playerName}
                {isCurrentUser && <span className="leaderboard-entry__you">You</span>}
              </div>
              <div className="leaderboard-entry__details">
                {showMode && (
                  <span className="leaderboard-entry__mode">
                    {entry.mode.charAt(0).toUpperCase() + entry.mode.slice(1)}
                  </span>
                )}
                <span className="leaderboard-entry__accuracy">
                  {Math.round(entry.accuracy)}% accuracy
                </span>
                <span className="leaderboard-entry__date">
                  {formatDate(entry.date)}
                </span>
              </div>
            </div>

            <div className="leaderboard-entry__score">
              <div className="leaderboard-entry__score-value">
                {entry.score.toLocaleString()}
              </div>
              <div className="leaderboard-entry__score-label">pts</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
