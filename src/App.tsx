/**
 * Main App component
 * Handles screen navigation and global state
 */

import { useState } from 'react';
import type { QuizMode, QuizStats } from './types/quiz.types';
import type { Achievement } from './types/gamification.types';
import { useUserProgress } from './hooks/useUserProgress';
import { useAchievements } from './hooks/useAchievements';
import { useStreak } from './hooks/useStreak';
import { useLeaderboard } from './hooks/useLeaderboard';
import { AppLayout } from './components/layout/AppLayout';
import { HomeScreen } from './components/screens/HomeScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { AchievementsScreen } from './components/screens/AchievementsScreen';
import { LeaderboardScreen } from './components/screens/LeaderboardScreen';

type Screen = 'home' | 'quiz' | 'results' | 'achievements' | 'leaderboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedMode, setSelectedMode] = useState<QuizMode>('flags');
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState<Achievement[]>([]);

  const { userProgress, updateAfterQuiz } = useUserProgress();
  const { achievements, checkAndUnlock } = useAchievements();
  const { streaks } = useStreak();
  const { entries: leaderboardEntries, addEntry: addLeaderboardEntry } = useLeaderboard();

  const handleStartQuiz = (mode: QuizMode) => {
    setSelectedMode(mode);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (stats: QuizStats) => {
    setQuizStats(stats);
    updateAfterQuiz(stats);

    // Add to leaderboard
    addLeaderboardEntry(stats, userProgress.playerName, userProgress.currentLevel);

    // Check for newly unlocked achievements
    const unlocked = checkAndUnlock(
      stats,
      userProgress,
      streaks.correct.best,
      streaks.daily.current
    );
    setNewlyUnlockedAchievements(unlocked);

    setCurrentScreen('results');
  };

  const handleRetry = () => {
    setCurrentScreen('quiz');
  };

  const handleGoHome = () => {
    setCurrentScreen('home');
    setQuizStats(null);
    setNewlyUnlockedAchievements([]);
  };

  const handleViewAchievements = () => {
    setCurrentScreen('achievements');
  };

  const handleViewLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  return (
    <AppLayout
      showHeader={currentScreen !== 'quiz'}
      totalPoints={userProgress.totalPoints}
      currentLevel={userProgress.currentLevel}
    >
      {currentScreen === 'home' && (
        <HomeScreen
          userProgress={userProgress}
          onStartQuiz={handleStartQuiz}
          onViewAchievements={handleViewAchievements}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}

      {currentScreen === 'quiz' && (
        <QuizScreen
          mode={selectedMode}
          onComplete={handleQuizComplete}
          onExit={handleGoHome}
        />
      )}

      {currentScreen === 'results' && quizStats && (
        <ResultsScreen
          stats={quizStats}
          onRetry={handleRetry}
          onHome={handleGoHome}
          onViewLeaderboard={handleViewLeaderboard}
          newlyUnlockedAchievements={newlyUnlockedAchievements}
        />
      )}

      {currentScreen === 'achievements' && (
        <AchievementsScreen
          achievements={achievements}
          onBack={handleGoHome}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen
          entries={leaderboardEntries}
          currentUserId={userProgress.id}
          onBack={handleGoHome}
        />
      )}
    </AppLayout>
  );
}

export default App;
