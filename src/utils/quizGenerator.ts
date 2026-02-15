/**
 * Quiz question generation logic
 */

import type { NormalizedCountry } from '../types/country.types';
import type { QuizMode, QuizQuestion } from '../types/quiz.types';
import { shuffleArray } from './shuffleArray';

/**
 * Generate a random sample of countries
 */
function getRandomCountries(countries: NormalizedCountry[], count: number): NormalizedCountry[] {
  const shuffled = shuffleArray(countries);
  return shuffled.slice(0, count);
}

/**
 * Generate wrong options for a question (3 random countries different from correct)
 */
function generateWrongOptions(
  countries: NormalizedCountry[],
  correctCountry: NormalizedCountry,
  mode: QuizMode
): string[] {
  const options: string[] = [];
  const availableCountries = countries.filter(c => c.code !== correctCountry.code);

  while (options.length < 3 && availableCountries.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCountries.length);
    const randomCountry = availableCountries[randomIndex];

    let optionText: string | null = null;

    switch (mode) {
      case 'flags':
        optionText = randomCountry.name;
        break;
      case 'capitals':
        optionText = randomCountry.capital;
        break;
      case 'currencies':
        optionText = randomCountry.currency;
        break;
    }

    // Only add if the option has valid data and isn't duplicate
    if (optionText && !options.includes(optionText)) {
      options.push(optionText);
    }

    // Remove this country from available pool
    availableCountries.splice(randomIndex, 1);
  }

  return options;
}

/**
 * Generate a single quiz question
 */
function generateQuestion(
  country: NormalizedCountry,
  allCountries: NormalizedCountry[],
  mode: QuizMode,
  index: number
): QuizQuestion | null {
  let question = '';
  let correctAnswer = '';
  let imageUrl: string | undefined;

  switch (mode) {
    case 'flags':
      question = 'Which country does this flag belong to?';
      correctAnswer = country.name;
      imageUrl = country.flagUrl;
      break;

    case 'capitals':
      if (!country.capital) return null; // Skip countries without capitals
      question = `What is the capital of ${country.name}?`;
      correctAnswer = country.capital;
      break;

    case 'currencies':
      if (!country.currency) return null; // Skip countries without currencies
      question = `What is the currency of ${country.name}?`;
      correctAnswer = country.currency;
      break;

    default:
      return null;
  }

  // Generate 3 wrong options
  const wrongOptions = generateWrongOptions(allCountries, country, mode);

  // Need exactly 3 wrong options
  if (wrongOptions.length < 3) {
    return null;
  }

  // Combine correct and wrong options, then shuffle
  const options = shuffleArray([correctAnswer, ...wrongOptions]);

  return {
    id: `q-${mode}-${country.code}-${index}`,
    mode,
    countryCode: country.code,
    countryName: country.name,
    question,
    imageUrl,
    correctAnswer,
    options,
  };
}

/**
 * Generate a full quiz with specified number of questions
 */
export function generateQuiz(
  countries: NormalizedCountry[],
  mode: QuizMode,
  questionCount: number = 10
): QuizQuestion[] {
  // Filter countries based on mode requirements
  let eligibleCountries = countries;

  switch (mode) {
    case 'capitals':
      eligibleCountries = countries.filter(c => c.capital);
      break;
    case 'currencies':
      eligibleCountries = countries.filter(c => c.currency);
      break;
    // flags and mixed modes use all countries
  }

  if (eligibleCountries.length < questionCount + 3) {
    throw new Error(`Not enough countries available for ${mode} mode`);
  }

  // Get random countries for questions
  const selectedCountries = getRandomCountries(eligibleCountries, questionCount);

  // Generate questions
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < selectedCountries.length; i++) {
    const question = generateQuestion(selectedCountries[i], eligibleCountries, mode, i);
    if (question) {
      questions.push(question);
    }
  }

  // If we couldn't generate enough valid questions, try again with more countries
  if (questions.length < questionCount) {
    console.warn(`Only generated ${questions.length} out of ${questionCount} questions`);
  }

  return questions.slice(0, questionCount);
}
