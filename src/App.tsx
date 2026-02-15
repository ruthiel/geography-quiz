/**
 * Main App component
 * Handles screen navigation and global state
 */

import { useState } from 'react';
import type { QuizMode, QuizStats } from './types/quiz.types';
import { useUserProgress } from './hooks/useUserProgress';
import { AppLayout } from './components/layout/AppLayout';
import { HomeScreen } from './components/screens/HomeScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';

type Screen = 'home' | 'quiz' | 'results';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedMode, setSelectedMode] = useState<QuizMode>('flags');
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);

  const { userProgress, updateAfterQuiz } = useUserProgress();

  const handleStartQuiz = (mode: QuizMode) => {
    setSelectedMode(mode);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (stats: QuizStats) => {
    setQuizStats(stats);
    updateAfterQuiz(stats);
    setCurrentScreen('results');
  };

  const handleRetry = () => {
    setCurrentScreen('quiz');
  };

  const handleGoHome = () => {
    setCurrentScreen('home');
    setQuizStats(null);
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
        />
      )}
    </AppLayout>
  );
}

export default App;
