/**
 * Progress bar component for visual progress indication
 */

import './ProgressBar.css';

export interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning';
}

export function ProgressBar({
  current,
  total,
  showLabel = true,
  variant = 'default',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="progress-bar">
      {showLabel && (
        <div className="progress-bar__label">
          <span className="progress-bar__text">
            {current} / {total}
          </span>
          <span className="progress-bar__percentage">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="progress-bar__track">
        <div
          className={`progress-bar__fill progress-bar__fill--${variant}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
    </div>
  );
}
