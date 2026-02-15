/**
 * Core quiz session management hook
 */

import { useState, useCallback } from 'react';
import { QuizMode, QuizQuestion, QuizAnswer, QuizSession, QuizStats } from '../types/quiz.types';
import { NormalizedCountry } from '../types/country.types';
import { generateQuiz } from '../utils/quizGenerator';
import { calculateScore } from '../services/gamification/scoreCalculator';

interface UseQuizParams {
  countries: NormalizedCountry[];
  mode: QuizMode;
  questionCount?: number;
}

interface UseQuizResult {
  session: QuizSession | null;
  currentQuestion: QuizQuestion | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  isComplete: boolean;
  submitAnswer: (answer: string, timeSpent: number) => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
  stats: QuizStats | null;
}

export function useQuiz({ countries, mode, questionCount = 10 }: UseQuizParams): UseQuizResult {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [stats, setStats] = useState<QuizStats | null>(null);

  // Initialize quiz session
  const initializeQuiz = useCallback(() => {
    if (countries.length === 0) {
      return;
    }

    try {
      const questions = generateQuiz(countries, mode, questionCount);

      const newSession: QuizSession = {
        id: crypto.randomUUID(),
        mode,
        questions,
        currentQuestionIndex: 0,
        answers: [],
        startedAt: Date.now(),
        totalPoints: 0,
      };

      setSession(newSession);
      setStats(null);
    } catch (error) {
      console.error('Failed to initialize quiz:', error);
    }
  }, [countries, mode, questionCount]);

  // Initialize on mount or when dependencies change
  useState(() => {
    initializeQuiz();
  });

  const currentQuestion = session
    ? session.questions[session.currentQuestionIndex] ?? null
    : null;

  const isComplete = session
    ? session.currentQuestionIndex >= session.questions.length
    : false;

  /**
   * Submit an answer for the current question
   */
  const submitAnswer = useCallback((selectedAnswer: string, timeSpent: number) => {
    if (!session || !currentQuestion) {
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Calculate points (streak multiplier will be added later in gamification phase)
    const scoreResult = calculateScore({
      isCorrect,
      timeSpent,
      streakMultiplier: 1, // Will be dynamic in Phase 4
    });

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent,
      pointsEarned: scoreResult.points,
    };

    setSession(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        answers: [...prev.answers, answer],
        totalPoints: prev.totalPoints + scoreResult.points,
      };
    });
  }, [session, currentQuestion]);

  /**
   * Move to next question
   */
  const nextQuestion = useCallback(() => {
    if (!session) return;

    const nextIndex = session.currentQuestionIndex + 1;

    if (nextIndex >= session.questions.length) {
      // Quiz complete - generate stats
      const completedAt = Date.now();
      const correctAnswers = session.answers.filter(a => a.isCorrect).length;
      const totalQuestions = session.questions.length;
      const totalTime = session.answers.reduce((sum, a) => sum + a.timeSpent, 0);
      const fastestAnswer = session.answers.length > 0
        ? Math.min(...session.answers.map(a => a.timeSpent))
        : 0;

      const quizStats: QuizStats = {
        mode: session.mode,
        totalQuestions,
        correctAnswers,
        accuracy: (correctAnswers / totalQuestions) * 100,
        totalPoints: session.totalPoints,
        averageTimePerQuestion: totalTime / totalQuestions,
        fastestAnswer,
        completedAt,
      };

      setStats(quizStats);
      setSession(prev => prev ? { ...prev, completedAt, currentQuestionIndex: nextIndex } : prev);
    } else {
      setSession(prev => prev ? { ...prev, currentQuestionIndex: nextIndex } : prev);
    }
  }, [session]);

  /**
   * Restart quiz with same settings
   */
  const restartQuiz = useCallback(() => {
    initializeQuiz();
  }, [initializeQuiz]);

  return {
    session,
    currentQuestion,
    currentQuestionIndex: session?.currentQuestionIndex ?? 0,
    totalQuestions: session?.questions.length ?? 0,
    isComplete,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    stats,
  };
}
