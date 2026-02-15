/**
 * Leaderboard screen component
 * Full leaderboard view with filters
 */

import { useState } from 'react';
import type { LeaderboardEntry } from '../../types/gamification.types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Leaderboard } from '../gamification/Leaderboard';
import './LeaderboardScreen.css';

export interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  onBack: () => void;
}

type ModeFilter = 'all' | 'flags' | 'capitals' | 'currencies' | 'mixed';
type TimeFilter = 'all' | 'week' | 'month';

const MODE_FILTERS: { value: ModeFilter; label: string }[] = [
  { value: 'all', label: 'All Modes' },
  { value: 'flags', label: 'Flags' },
  { value: 'capitals', label: 'Capitals' },
  { value: 'currencies', label: 'Currencies' },
  { value: 'mixed', label: 'Mixed' },
];

const TIME_FILTERS: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];

export function LeaderboardScreen({ entries, currentUserId, onBack }: LeaderboardScreenProps) {
  const [modeFilter, setModeFilter] = useState<ModeFilter>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  // Apply filters
  let filteredEntries = [...entries];

  // Filter by mode
  if (modeFilter !== 'all') {
    filteredEntries = filteredEntries.filter(entry => entry.mode === modeFilter);
  }

  // Filter by time
  if (timeFilter !== 'all') {
    const now = Date.now();
    const cutoff = timeFilter === 'week'
      ? now - (7 * 24 * 60 * 60 * 1000)
      : now - (30 * 24 * 60 * 60 * 1000);

    filteredEntries = filteredEntries.filter(entry => entry.date >= cutoff);
  }

  // Sort by score descending
  filteredEntries.sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-screen">
      <div className="leaderboard-screen__container">
        {/* Header */}
        <div className="leaderboard-screen__header">
          <Button variant="secondary" size="small" onClick={onBack}>
            ← Back
          </Button>
          <h1 className="leaderboard-screen__title">Leaderboard</h1>
          <div className="leaderboard-screen__count">
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
          </div>
        </div>

        {/* Filters */}
        <Card variant="outlined" padding="medium">
          <div className="leaderboard-screen__filters">
            {/* Mode filter */}
            <div className="leaderboard-screen__filter-group">
              <label className="leaderboard-screen__filter-label">Mode:</label>
              <div className="leaderboard-screen__filter-buttons">
                {MODE_FILTERS.map(filter => (
                  <button
                    key={filter.value}
                    className={`leaderboard-screen__filter-button ${
                      modeFilter === filter.value ? 'leaderboard-screen__filter-button--active' : ''
                    }`}
                    onClick={() => setModeFilter(filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time filter */}
            <div className="leaderboard-screen__filter-group">
              <label className="leaderboard-screen__filter-label">Period:</label>
              <div className="leaderboard-screen__filter-buttons">
                {TIME_FILTERS.map(filter => (
                  <button
                    key={filter.value}
                    className={`leaderboard-screen__filter-button ${
                      timeFilter === filter.value ? 'leaderboard-screen__filter-button--active' : ''
                    }`}
                    onClick={() => setTimeFilter(filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Leaderboard */}
        <Leaderboard
          entries={filteredEntries}
          currentUserId={currentUserId}
          showMode={modeFilter === 'all'}
        />
      </div>
    </div>
  );
}
