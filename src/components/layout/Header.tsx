/**
 * Header component
 * Top navigation bar with app title and user info
 */

import './Header.css';

export interface HeaderProps {
  title?: string;
  totalPoints?: number;
  currentLevel?: number;
}

export function Header({ title = 'Geography Quiz', totalPoints, currentLevel }: HeaderProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">{title}</h1>

        {totalPoints !== undefined && currentLevel !== undefined && (
          <div className="header__user-info">
            <div className="header__stat">
              <span className="header__stat-label">Level</span>
              <span className="header__stat-value">{currentLevel}</span>
            </div>
            <div className="header__stat">
              <span className="header__stat-label">Points</span>
              <span className="header__stat-value">{formatNumber(totalPoints)}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
