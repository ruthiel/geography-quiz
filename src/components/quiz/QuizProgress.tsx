/**
 * Quiz progress indicator component
 * Shows current question number and progress bar
 */

import { ProgressBar } from '../ui/ProgressBar';
import './QuizProgress.css';

export interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function QuizProgress({ currentQuestion, totalQuestions }: QuizProgressProps) {
  return (
    <div className="quiz-progress" role="status" aria-live="polite">
      <div className="quiz-progress__header">
        <h2 className="quiz-progress__title">
          Question {currentQuestion} of {totalQuestions}
        </h2>
      </div>
      <ProgressBar
        current={currentQuestion}
        total={totalQuestions}
        showLabel={false}
      />
      <span className="sr-only">
        Question {currentQuestion} of {totalQuestions}
      </span>
    </div>
  );
}
