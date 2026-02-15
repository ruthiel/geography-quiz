/**
 * Quiz result feedback component
 * Shows correct/incorrect feedback after answer submission
 */

import './QuizResult.css';

export interface QuizResultProps {
  isCorrect: boolean;
  pointsEarned: number;
  correctAnswer: string;
  selectedAnswer: string;
}

export function QuizResult({
  isCorrect,
  pointsEarned,
  correctAnswer,
  selectedAnswer,
}: QuizResultProps) {
  return (
    <div className={`quiz-result quiz-result--${isCorrect ? 'correct' : 'incorrect'}`}>
      <div className="quiz-result__icon">
        {isCorrect ? '✓' : '✗'}
      </div>
      <div className="quiz-result__content">
        <h3 className="quiz-result__title">
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </h3>
        {isCorrect ? (
          <p className="quiz-result__message">
            You earned <strong>{pointsEarned} points</strong>!
          </p>
        ) : (
          <p className="quiz-result__message">
            The correct answer is <strong>{correctAnswer}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
