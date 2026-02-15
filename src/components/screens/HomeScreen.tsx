/**
 * Home screen / landing page
 * Displays welcome message, stats, and quiz mode selection
 */

import { QuizMode } from '../../types/quiz.types';
import { UserProgress } from '../../types/user.types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import './HomeScreen.css';

export interface HomeScreenProps {
  userProgress: UserProgress;
  onStartQuiz: (mode: QuizMode) => void;
}

export function HomeScreen({ userProgress, onStartQuiz }: HomeScreenProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="home-screen">
      <div className="home-screen__container">
        {/* Welcome section */}
        <div className="home-screen__header">
          <h1 className="home-screen__title">Geography Quiz</h1>
          <p className="home-screen__subtitle">
            Test your knowledge of countries, flags, capitals, and currencies!
          </p>
        </div>

        {/* User stats */}
        <Card variant="elevated" padding="medium">
          <div className="home-screen__stats">
            <div className="home-screen__stat">
              <div className="home-screen__stat-value">
                {formatNumber(userProgress.totalPoints)}
              </div>
              <div className="home-screen__stat-label">Total Points</div>
            </div>
            <div className="home-screen__stat">
              <div className="home-screen__stat-value">
                Level {userProgress.currentLevel}
              </div>
              <div className="home-screen__stat-label">Current Level</div>
            </div>
            <div className="home-screen__stat">
              <div className="home-screen__stat-value">
                {userProgress.totalQuizzes}
              </div>
              <div className="home-screen__stat-label">Quizzes Taken</div>
            </div>
          </div>
        </Card>

        {/* Quiz mode selection */}
        <div className="home-screen__modes">
          <h2 className="home-screen__section-title">Choose a Quiz Mode</h2>

          <div className="home-screen__mode-grid">
            <Card
              variant="outlined"
              padding="medium"
              className="home-screen__mode-card"
            >
              <div className="home-screen__mode-icon">🏴</div>
              <h3 className="home-screen__mode-title">Flags</h3>
              <p className="home-screen__mode-description">
                Identify countries by their flags
              </p>
              <div className="home-screen__mode-stats">
                <span>
                  Best: {formatNumber(userProgress.modeStats.flags.bestScore)} pts
                </span>
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={() => onStartQuiz('flags')}
              >
                Start Quiz
              </Button>
            </Card>

            <Card
              variant="outlined"
              padding="medium"
              className="home-screen__mode-card"
            >
              <div className="home-screen__mode-icon">🏛️</div>
              <h3 className="home-screen__mode-title">Capitals</h3>
              <p className="home-screen__mode-description">
                Name the capital cities
              </p>
              <div className="home-screen__mode-stats">
                <span>
                  Best: {formatNumber(userProgress.modeStats.capitals.bestScore)} pts
                </span>
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={() => onStartQuiz('capitals')}
              >
                Start Quiz
              </Button>
            </Card>

            <Card
              variant="outlined"
              padding="medium"
              className="home-screen__mode-card"
            >
              <div className="home-screen__mode-icon">💰</div>
              <h3 className="home-screen__mode-title">Currencies</h3>
              <p className="home-screen__mode-description">
                Identify national currencies
              </p>
              <div className="home-screen__mode-stats">
                <span>
                  Best: {formatNumber(userProgress.modeStats.currencies.bestScore)} pts
                </span>
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={() => onStartQuiz('currencies')}
              >
                Start Quiz
              </Button>
            </Card>

            <Card
              variant="outlined"
              padding="medium"
              className="home-screen__mode-card"
            >
              <div className="home-screen__mode-icon">🌍</div>
              <h3 className="home-screen__mode-title">Mixed</h3>
              <p className="home-screen__mode-description">
                Random combination of all modes
              </p>
              <div className="home-screen__mode-stats">
                <span>
                  Best: {formatNumber(userProgress.modeStats.mixed.bestScore)} pts
                </span>
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={() => onStartQuiz('mixed')}
              >
                Start Quiz
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
