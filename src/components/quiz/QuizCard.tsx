/**
 * Quiz question card component
 * Displays the current question with flag image or text
 */

import { QuizQuestion } from '../../types/quiz.types';
import { Card } from '../ui/Card';
import './QuizCard.css';

export interface QuizCardProps {
  question: QuizQuestion;
}

export function QuizCard({ question }: QuizCardProps) {
  return (
    <Card variant="elevated" padding="large" className="quiz-card">
      <div className="quiz-card__content">
        <p className="quiz-card__question">{question.question}</p>

        {question.imageUrl && (
          <div className="quiz-card__image-container">
            <img
              src={question.imageUrl}
              alt="Country flag"
              className="quiz-card__image"
              loading="eager"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
