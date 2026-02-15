/**
 * Main quiz screen component
 * Orchestrates the quiz flow and manages state
 */

import { useState, useEffect } from 'react';
import type { QuizMode } from '../../types/quiz.types';
import { useQuiz } from '../../hooks/useQuiz';
import { useCountries } from '../../hooks/useCountries';
import { useStreak } from '../../hooks/useStreak';
import { QuizCard } from '../quiz/QuizCard';
import { QuizOptions } from '../quiz/QuizOptions';
import { QuizProgress } from '../quiz/QuizProgress';
import { QuizResult } from '../quiz/QuizResult';
import { StreakCounter } from '../gamification/StreakCounter';
import { ScoreDisplay } from '../gamification/ScoreDisplay';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import './QuizScreen.css';

export interface QuizScreenProps {
  mode: QuizMode;
  onComplete?: (stats: any) => void;
  onExit?: () => void;
}

export function QuizScreen({ mode, onComplete, onExit }: QuizScreenProps) {
  const { countries, loading: loadingCountries, error } = useCountries();
  const { streaks, updateCorrectStreak, updateDailyStreak, resetCorrectStreak } = useStreak();

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isComplete,
    submitAnswer,
    nextQuestion,
    stats,
    session,
  } = useQuiz({ countries, mode, questionCount: 10, currentStreak: streaks.correct.current });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answerStartTime, setAnswerStartTime] = useState(Date.now());

  // Initialize daily streak on mount
  useEffect(() => {
    updateDailyStreak();
    resetCorrectStreak();
  }, [updateDailyStreak, resetCorrectStreak]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setAnswerStartTime(Date.now());
  }, [currentQuestionIndex]);

  // Handle quiz completion
  useEffect(() => {
    if (isComplete && stats && onComplete) {
      onComplete(stats);
    }
  }, [isComplete, stats, onComplete]);

  const handleSelectOption = (option: string) => {
    if (selectedOption || !currentQuestion) {
      return;
    }

    setSelectedOption(option);

    // Calculate time spent
    const timeSpent = (Date.now() - answerStartTime) / 1000; // Convert to seconds

    // Check if answer is correct
    const isCorrect = option === currentQuestion.correctAnswer;

    // Update streak
    updateCorrectStreak(isCorrect);

    // Submit answer
    submitAnswer(option, timeSpent);

    // Show result
    setShowResult(true);
  };

  const handleNext = () => {
    nextQuestion();
  };

  if (loadingCountries) {
    return (
      <div className="quiz-screen">
        <LoadingSpinner size="large" text="Loading countries..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-screen">
        <div className="quiz-screen__error">
          <h2>Error Loading Countries</h2>
          <p>{error.message}</p>
          {onExit && (
            <Button variant="primary" onClick={onExit}>
              Go Back
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion || isComplete) {
    return null; // Results will be shown by parent component
  }

  // Find current answer if submitted
  const currentAnswer = showResult && session
    ? session.answers[session.answers.length - 1]
    : null;

  return (
    <div className="quiz-screen">
      <div className="quiz-screen__container">
        {/* Gamification stats */}
        <div className="quiz-screen__stats">
          <ScoreDisplay score={session?.totalPoints || 0} label="Score" size="small" />
          {streaks.correct.current > 0 && (
            <StreakCounter streak={streaks.correct.current} size="small" />
          )}
        </div>

        {/* Progress indicator */}
        <QuizProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />

        {/* Question card */}
        <div className="quiz-screen__question">
          <QuizCard question={currentQuestion} />
        </div>

        {/* Answer options */}
        <div className="quiz-screen__options">
          <QuizOptions
            options={currentQuestion.options}
            selectedOption={selectedOption}
            correctAnswer={showResult ? currentQuestion.correctAnswer : undefined}
            onSelectOption={handleSelectOption}
            disabled={showResult}
          />
        </div>

        {/* Result feedback */}
        {showResult && selectedOption && currentAnswer && (
          <QuizResult
            isCorrect={currentAnswer.isCorrect}
            pointsEarned={currentAnswer.pointsEarned}
            correctAnswer={currentQuestion.correctAnswer}
            selectedAnswer={selectedOption}
          />
        )}

        {/* Next button */}
        {showResult && (
          <div className="quiz-screen__actions">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleNext}
            >
              {currentQuestionIndex + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        )}

        {/* Exit button */}
        {onExit && (
          <div className="quiz-screen__exit">
            <Button variant="secondary" size="small" onClick={onExit}>
              Exit Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
