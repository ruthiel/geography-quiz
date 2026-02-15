/**
 * Quiz answer options component
 * Displays 4 answer choices with selection handling
 */

import { Button } from '../ui/Button';
import './QuizOptions.css';

export interface QuizOptionsProps {
  options: string[];
  selectedOption: string | null;
  correctAnswer?: string; // Only provided after answer is submitted
  onSelectOption: (option: string) => void;
  disabled?: boolean;
}

export function QuizOptions({
  options,
  selectedOption,
  correctAnswer,
  onSelectOption,
  disabled = false,
}: QuizOptionsProps) {
  const getOptionVariant = (option: string) => {
    if (!selectedOption) {
      return 'secondary';
    }

    // After answer submitted
    if (correctAnswer) {
      if (option === correctAnswer) {
        return 'success';
      }
      if (option === selectedOption && option !== correctAnswer) {
        return 'error';
      }
    }

    return 'secondary';
  };

  const isOptionDisabled = (option: string) => {
    return disabled || (selectedOption !== null && option !== selectedOption);
  };

  return (
    <div className="quiz-options">
      {options.map((option, index) => (
        <Button
          key={`${option}-${index}`}
          variant={getOptionVariant(option)}
          size="large"
          fullWidth
          onClick={() => onSelectOption(option)}
          disabled={isOptionDisabled(option)}
          className="quiz-options__button"
        >
          <span className="quiz-options__letter">
            {String.fromCharCode(65 + index)}
          </span>
          <span className="quiz-options__text">{option}</span>
        </Button>
      ))}
    </div>
  );
}
