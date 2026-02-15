# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Geography quiz application built with React 19, TypeScript, and Vite.

**Status**: Work in progress - currently at initial Vite template scaffold stage. No git repository initialized yet.

### Design Requirements

- **Mobile-first**: Primary target is mobile devices
- **Gamification**: Include core gamification elements (points, levels, achievements, progress tracking, streaks, etc.)
- **Data Source**: REST Countries API (https://restcountries.com/) for country data

### Intended Features

Users should be tested on their knowledge of countries:

- **Flags**: Identify country flags
- **Capitals**: Know the capital city of countries
- **Currencies**: Identify the currency used in countries
- **Extensibility**: Architecture should support adding more parameters in the future (e.g., population, languages, regions)

## Tech Stack

- **Framework**: React 19.2 with TypeScript 5.9
- **Build Tool**: Vite 7.3
- **Linting**: ESLint 9 with TypeScript and React plugins
- **Package Manager**: npm

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (includes TypeScript check)
npm run build

# Lint all files
npm run lint

# Preview production build
npm run preview
```

## Project Structure

Current structure (Vite template):

- `src/main.tsx` - Application entry point with React StrictMode
- `src/App.tsx` - Main application component
- `src/index.css` - Global styles
- `src/App.css` - Component-specific styles
- `public/` - Static assets served as-is
- `dist/` - Build output (ignored by git)

Planned structure for geography quiz:

- `src/types/` - TypeScript types and interfaces (Country, Quiz, QuizQuestion)
- `src/data/` - Country data (flags, capitals, currencies)
- `src/components/` - React components (QuizCard, ScoreBoard, FlagDisplay, etc.)
- `src/hooks/` - Custom React hooks (useQuiz, useScore)
- `src/utils/` - Utility functions (shuffle, randomize questions)

## Architecture Guidelines

### Data Management

- Country data should be structured to easily add new attributes
- Consider using a consistent data format (JSON) for country information
- Design for extensibility - new quiz types should be easy to add

### Component Design

- Keep quiz logic separate from presentation components
- Use custom hooks for quiz state management
- Components should be reusable across different quiz types (flags, capitals, currencies)
- Mobile-first responsive design (use mobile breakpoints as default)

### Gamification Elements

- **Points/Scoring System**: Track correct answers and assign points
- **Levels/Progress**: User advancement through difficulty or completion
- **Achievements**: Unlock badges for milestones
- **Streaks**: Consecutive correct answers or daily play streaks
- **Progress Tracking**: Visual feedback on learning progress
- **Leaderboards**: Optional comparison with other users (local storage initially)

## TypeScript Configuration

Two separate tsconfig files:
- `tsconfig.app.json` - Application source code settings
- `tsconfig.node.json` - Vite config and build tooling settings
- `tsconfig.json` - Root config that references both

## ESLint Configuration

Uses flat config format (`eslint.config.js`) with:
- TypeScript ESLint recommended rules
- React Hooks plugin for hooks validation
- React Refresh plugin for fast refresh validation
- Browser globals
- `dist/` directory ignored

## Build Output

Production builds:
1. Run TypeScript compiler in build mode (`tsc -b`)
2. Run Vite build
3. Output to `dist/` directory
