# 🌍 Geography Quiz

An engaging, mobile-first geography quiz game that tests your knowledge of countries, flags, capitals, and currencies. Built with React 19, TypeScript, and modern web technologies.

![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)

## 🎯 Live Demo

**[Play Now: https://ruthiel.github.io/geography-quiz/](https://ruthiel.github.io/geography-quiz/)**

**Repository**: [github.com/ruthiel/geography-quiz](https://github.com/ruthiel/geography-quiz)

## 🎮 About The Game

Geography Quiz is an interactive learning application designed to help you master world geography through gamification. Challenge yourself across multiple quiz modes, build streaks, level up, and track your progress as you explore countries from around the world.

### ✨ Key Features

#### 📚 Multiple Quiz Modes
- **Flags**: Identify countries by their flags
- **Capitals**: Name the capital cities of countries
- **Currencies**: Identify national currencies
- **Mixed**: Random combination of all quiz types

#### 🎯 Gamification System
- **6 Level Progression**: Rise from Geography Novice to World Champion
  - Level 1: Geography Novice (0-999 points)
  - Level 2: World Explorer (1,000-2,499 points)
  - Level 3: Globe Trotter (2,500-4,999 points)
  - Level 4: Cartographer (5,000-9,999 points)
  - Level 5: Geography Master (10,000-19,999 points)
  - Level 6: World Champion (20,000+ points)

- **Streak System**: Build consecutive correct answer streaks
  - 🔥 5+ streak: 2x point multiplier
  - 🔥🔥 10+ streak: 3x point multiplier
  - 🔥🔥🔥 15+ streak: 4x point multiplier
  - 🔥🔥🔥 20+ streak: 5x point multiplier

- **Smart Scoring**: Earn points based on accuracy and speed
  - Base points: 100 per correct answer
  - Speed bonus: +50 points (<5 seconds), +25 points (<10 seconds)
  - Streak multipliers apply to total score

#### 💾 Progress Tracking
- Persistent user progress across sessions
- Per-mode statistics and best scores
- Level progression with visual progress bars
- Daily play streak tracking (36-hour grace period)

#### 📱 Mobile-First Design
- Optimized for mobile devices
- Touch-friendly interface (44x44px minimum tap targets)
- Responsive layouts for tablet and desktop
- Smooth animations and transitions

## 🚀 Getting Started

### Play Online

No installation required! Just visit **[https://ruthiel.github.io/geography-quiz/](https://ruthiel.github.io/geography-quiz/)** to start playing.

### Local Development

#### Prerequisites
- Node.js 16.x or higher
- npm 7.x or higher

#### Installation

```bash
# Clone the repository
git clone https://github.com/ruthiel/geography-quiz.git
cd geography-quiz

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Available Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Deployment

The app is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `master` branch.

**Live URL**: [https://ruthiel.github.io/geography-quiz/](https://ruthiel.github.io/geography-quiz/)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🎲 How to Play

1. **Choose a Quiz Mode**: Select from Flags, Capitals, Currencies, or Mixed mode
2. **Answer Questions**: You'll get 10 questions per quiz with 4 options each
3. **Build Streaks**: Answer correctly in a row to activate multipliers
4. **Earn Points**: Quick and correct answers earn maximum points
5. **Level Up**: Accumulate points to progress through 6 levels
6. **Track Progress**: View your stats and best scores on the home screen

### Scoring Strategy

To maximize your score:
- **Answer quickly** for time bonuses
- **Build streaks** for multiplier bonuses
- **Stay consistent** to maintain your streak
- **Practice different modes** to improve overall knowledge

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: React 19.2 with TypeScript 5.9
- **Build Tool**: Vite 7.3 for fast builds and HMR
- **Styling**: Custom CSS with CSS Variables (mobile-first)
- **Data Source**: REST Countries API (https://restcountries.com/)
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Storage**: LocalStorage for progress persistence

### Project Structure

```
src/
├── components/          # React components
│   ├── gamification/   # Level, streak, and score components
│   ├── layout/         # App layout and header
│   ├── quiz/           # Quiz-specific components
│   ├── screens/        # Main screen components
│   └── ui/             # Reusable UI components
├── constants/          # App constants (levels, etc.)
├── hooks/              # Custom React hooks
├── services/           # API and business logic
│   ├── api/           # REST Countries API integration
│   ├── gamification/  # Scoring and level systems
│   └── storage/       # LocalStorage utilities
├── styles/            # Global styles and variables
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

### Key Design Decisions

- **Offline-First**: Country data is cached for 7 days with stale fallback
- **Type Safety**: Full TypeScript coverage for reliability
- **Component Architecture**: Reusable, composable components
- **Mobile-First**: Default styles for mobile, progressive enhancement
- **Performance**: Optimized rendering with React.memo (where needed)

## 🎨 Design System

The app uses a custom CSS design system with:
- CSS Custom Properties for theming
- 8px spacing scale
- Mobile-first breakpoints (640px, 768px, 1024px)
- Consistent color palette with semantic naming
- Touch-friendly interaction targets

## 📊 Feature Status

- ✅ Core quiz functionality
- ✅ Multiple quiz modes (Flags, Capitals, Currencies, Mixed)
- ✅ 6-level progression system
- ✅ Streak tracking with multipliers
- ✅ Achievement system (16 achievements)
- ✅ Local leaderboard (top 100 scores)
- ✅ Advanced animations and transitions
- ✅ Accessibility features (ARIA, keyboard nav, reduced motion)
- ✅ Deployed to GitHub Pages

## 🌐 Data Source

Country data is sourced from the [REST Countries API](https://restcountries.com/), providing:
- 250+ countries
- High-quality flag images (SVG format)
- Capital cities
- Currency information
- Automatic caching with 7-day TTL

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Country data provided by [REST Countries API](https://restcountries.com/)
- Built with [React](https://react.dev/) and [Vite](https://vite.dev/)
- Inspired by geography learning and gamification principles

---

**Happy Quizzing! 🌍🎉**
