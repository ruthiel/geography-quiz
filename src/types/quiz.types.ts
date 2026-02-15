/**
 * Quiz-related types for game logic and session management
 */

export type QuizMode = 'flags' | 'capitals' | 'currencies' | 'mixed';

export interface QuizQuestion {
  id: string;
  mode: QuizMode;
  countryCode: string;
  countryName: string;
  question: string; // e.g., "Which country does this flag belong to?"
  imageUrl?: string; // For flag mode
  correctAnswer: string;
  options: string[]; // 4 options including correct answer (shuffled)
  timeLimit?: number; // Optional time limit in seconds
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number; // Seconds taken to answer
  pointsEarned: number;
}

export interface QuizSession {
  id: string;
  mode: QuizMode;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  startedAt: number; // Timestamp
  completedAt?: number; // Timestamp
  totalPoints: number;
}

export interface QuizStats {
  mode: QuizMode;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number; // Percentage
  totalPoints: number;
  averageTimePerQuestion: number;
  fastestAnswer: number;
  completedAt: number;
}
