/**
 * Animated score display component
 * Shows current score with optional animation
 */

import { useEffect, useState } from 'react';
import './ScoreDisplay.css';

export interface ScoreDisplayProps {
  score: number;
  label?: string;
  animate?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function ScoreDisplay({ score, label = 'Score', animate = false, size = 'medium' }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    // Animate score counting up
    const duration = 1000; // 1 second
    const steps = 30;
    const increment = score / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;

      if (step >= steps) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, animate]);

  return (
    <div className={`score-display score-display--${size}`}>
      <div className="score-display__label">{label}</div>
      <div className="score-display__value">
        {displayScore.toLocaleString()}
      </div>
    </div>
  );
}
