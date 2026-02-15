# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Geography quiz application built with React 19, TypeScript, and Vite.

**Status**: ✅ **Production Ready** - Full implementation complete with all planned features

**Live Demo**: [https://ruthiel.github.io/geography-quiz/](https://ruthiel.github.io/geography-quiz/)

**Repository**: [https://github.com/ruthiel/geography-quiz](https://github.com/ruthiel/geography-quiz)

### Implemented Features

**Quiz Modes:**
- ✅ Flags - Identify countries by their flags
- ✅ Capitals - Name capital cities
- ✅ Currencies - Identify national currencies
- ✅ Mixed - Random combination of all modes

**Gamification:**
- ✅ 6-Level progression system (Novice → World Champion)
- ✅ Streak system with 5x point multipliers
- ✅ 16 achievements across 5 categories
- ✅ Local leaderboard (top 100 scores)
- ✅ Persistent user progress

**User Experience:**
- ✅ Mobile-first responsive design
- ✅ Smooth animations and transitions
- ✅ Accessibility features (ARIA, keyboard nav)
- ✅ Error boundaries for graceful error handling

### Design Requirements

- **Mobile-first**: Primary target is mobile devices (optimized for 375px+ width)
- **Gamification**: Full implementation with points, levels, achievements, streaks
- **Data Source**: REST Countries API (https://restcountries.com/) with 7-day caching
- **Offline Support**: Stale cache fallback when API unavailable

## Tech Stack

- **Framework**: React 19.2 with TypeScript 5.9
- **Build Tool**: Vite 7.3
- **Styling**: CSS Modules with CSS Variables (mobile-first)
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Storage**: localStorage for all user data and caching
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

## Deployment

**Status**: ✅ Deployed to GitHub Pages

**Live URL**: [https://ruthiel.github.io/geography-quiz/](https://ruthiel.github.io/geography-quiz/)

**Deployment Method**: Automatic deployment via GitHub Actions on push to `master` branch

**Configuration**:
- Base path set in `vite.config.ts`: `/geography-quiz/`
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- GitHub Pages settings: Source = GitHub Actions

**Deployment Process**:
1. Push changes to `master` branch
2. GitHub Actions automatically runs build
3. Deploys to GitHub Pages (2-3 minutes)

For detailed deployment setup and troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project Structure

```
src/
├── components/
│   ├── gamification/      # Gamification components
│   │   ├── AchievementCard.tsx
│   │   ├── AchievementsList.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── LevelIndicator.tsx
│   │   ├── ScoreDisplay.tsx
│   │   └── StreakCounter.tsx
│   ├── layout/            # Layout components
│   │   ├── AppLayout.tsx
│   │   └── Header.tsx
│   ├── quiz/              # Quiz-specific components
│   │   ├── QuizCard.tsx
│   │   ├── QuizOptions.tsx
│   │   ├── QuizProgress.tsx
│   │   └── QuizResult.tsx
│   ├── screens/           # Main screen components
│   │   ├── AchievementsScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LeaderboardScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   └── ResultsScreen.tsx
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ErrorBoundary.tsx
│       ├── LoadingSpinner.tsx
│       ├── Modal.tsx
│       └── ProgressBar.tsx
├── constants/             # App constants
│   ├── achievements.ts
│   └── levels.ts
├── hooks/                 # Custom React hooks
│   ├── useAchievements.ts
│   ├── useCountries.ts
│   ├── useLeaderboard.ts
│   ├── useLocalStorage.ts
│   ├── useQuiz.ts
│   ├── useStreak.ts
│   └── useUserProgress.ts
├── services/              # Business logic and APIs
│   ├── api/
│   │   ├── apiCache.ts
│   │   └── countriesApi.ts
│   ├── gamification/
│   │   ├── achievementEngine.ts
│   │   ├── levelSystem.ts
│   │   └── scoreCalculator.ts
│   └── storage/
│       ├── storageKeys.ts
│       └── storageService.ts
├── styles/                # Global styles
│   ├── animations.css     # Animation library
│   ├── global.css         # Reset and base styles
│   └── variables.css      # CSS custom properties
├── types/                 # TypeScript definitions
│   ├── country.types.ts
│   ├── gamification.types.ts
│   ├── quiz.types.ts
│   └── user.types.ts
├── utils/                 # Utility functions
│   ├── quizGenerator.ts
│   └── shuffleArray.ts
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Style imports
```

## Architecture Guidelines

### Data Management

**API Integration:**
- Country data fetched from REST Countries API
- Cached in localStorage with 7-day TTL
- Stale cache used as fallback on network errors
- ~250 countries normalized to simplified format

**Storage Strategy:**
- All user data in localStorage (progress, achievements, streaks, leaderboard)
- Single source of truth per data type
- Auto-save after quiz completion
- Storage keys centralized in `storageKeys.ts`

**State Flow:**
1. User starts quiz → `useQuiz` initializes from `useCountries` data
2. User answers → `useQuiz` validates, `useStreak` updates, `scoreCalculator` computes
3. Quiz ends → `useUserProgress` saves, `useAchievements` checks, `useLeaderboard` updates
4. Navigate to ResultsScreen with stats and unlocked achievements

### Component Design

**Separation of Concerns:**
- Presentation components (UI) are separate from logic (hooks)
- Custom hooks handle all state management
- Services contain pure business logic
- Types provide compile-time safety

**Reusability:**
- UI components accept variants and sizes
- Quiz components work across all modes
- Hooks are mode-agnostic
- Utility functions are pure and testable

**Mobile-First:**
- Default styles for mobile (<640px)
- Progressive enhancement for tablet (640px+) and desktop (1024px+)
- Touch targets minimum 44x44px
- Bottom-aligned primary actions (thumb zone)

### Gamification System

**Level System:**
- 6 levels with progressive point thresholds
- Visual indicators with color coding
- Progress bars showing points to next level
- Auto-calculated from total points

**Streak System:**
- Correct answer streaks (resets on wrong answer)
- Daily play streaks (36-hour grace period)
- Multipliers: 1x, 2x (5+), 3x (10+), 4x (15+), 5x (20+)
- Applied to base points + time bonuses

**Scoring:**
- Base: 100 points per correct answer
- Speed bonus: +50 (<5s), +25 (<10s)
- Streak multiplier applied to total
- Formula: `(base + timeBonus) × streakMultiplier`

**Achievement System:**
- 16 achievements across 5 categories
- Progress tracking for locked achievements
- Unlock celebration modal on results screen
- Persistent unlock state

**Leaderboard:**
- Top 100 local scores
- Filterable by mode and time period
- Your entries highlighted
- Medals for top 3 (🥇🥈🥉)

## TypeScript Configuration

Three separate tsconfig files:
- `tsconfig.app.json` - Application source code settings
- `tsconfig.node.json` - Vite config and build tooling settings
- `tsconfig.json` - Root config that references both

**Important:** Uses `verbatimModuleSyntax` - all type imports must use `import type` syntax.

## ESLint Configuration

Uses flat config format (`eslint.config.js`) with:
- TypeScript ESLint recommended rules
- React Hooks plugin for hooks validation
- React Refresh plugin for fast refresh validation
- Browser globals
- `dist/` directory ignored

## Styling System

**CSS Architecture:**
- CSS Custom Properties in `variables.css`
- Global reset in `global.css`
- Animation library in `animations.css`
- Component-specific CSS files co-located with components

**Design Tokens:**
- 8px spacing scale (space-1 through space-16)
- Consistent color palette with semantic naming
- Typography scale (xs to 4xl)
- Shadow system (sm to xl)
- Border radius system (sm to full)

**Animations:**
- Comprehensive animation library (fade, slide, scale, pulse, shake, etc.)
- Utility classes for easy application
- Reduced motion support via media query
- CSS-based (GPU accelerated)

## Build Output

Production builds:
1. TypeScript compiler validates all types (`tsc -b`)
2. Vite bundles and optimizes code
3. Output to `dist/` directory
4. Target bundle size: <200KB initial

## Future Extensibility

**Easy Additions:**
- New quiz parameters (population, languages, area, regions)
- More achievements (just add to `achievements.ts`)
- Additional levels (update `levels.ts`)
- Custom quiz lengths (modify `useQuiz` params)

**Backend Migration Path:**
- API abstraction already in place (`services/api/`)
- User data format ready for sync
- Leaderboard designed for global rankings
- Authentication can be added without breaking changes

## Development Guidelines

**When Adding Features:**

1. **Types First**: Define TypeScript interfaces in `src/types/`
2. **Services**: Add business logic to appropriate service
3. **Hooks**: Create custom hooks for state management
4. **Components**: Build UI components with proper separation
5. **Styles**: Use CSS modules with design tokens
6. **Accessibility**: Add ARIA labels and keyboard navigation

**Code Style:**
- Use `type` imports for all TypeScript types
- Prefer functional components with hooks
- Use `useCallback` for functions passed as props
- Co-locate CSS files with components
- Keep components focused and single-purpose

**Testing Strategy:**
- Test on mobile viewport (375px minimum)
- Verify localStorage persistence
- Check offline behavior (Network tab)
- Test reduced motion preference
- Validate keyboard navigation

## Accessibility

**Implemented:**
- ARIA labels on interactive elements
- Live regions for dynamic updates
- Screen reader text for important info
- Enhanced focus indicators (3px outline)
- Keyboard navigation support
- Reduced motion media query

**Standards:**
- WCAG 2.1 Level AA compliance targeted
- Touch targets: 44x44px minimum (Level AAA)
- Color contrast validated
- Semantic HTML throughout

## Performance

**Optimizations:**
- Country data cached for 7 days
- Lazy loading for flag images
- CSS-based animations (GPU accelerated)
- Minimal re-renders with proper memoization
- Code organized for future splitting

**Metrics Targets:**
- Initial bundle: <200KB
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- 60fps animations

## Known Limitations

- **Local-only**: No backend, all data in localStorage
- **Single user**: No multi-user support
- **Browser-dependent**: localStorage limits vary by browser
- **No sync**: Data doesn't sync across devices

## Maintenance Notes

**Regular Updates:**
- REST Countries API may change - monitor for breaking changes
- Update dependencies regularly for security
- Test on new browser versions
- Validate mobile OS updates

**Data Migration:**
- If changing localStorage structure, implement migration logic
- Always maintain backwards compatibility
- Version your storage schema

**Future Considerations:**
- Backend integration for global leaderboards
- User authentication and profiles
- Cloud save / sync across devices
- Social features (challenges, sharing)
- More quiz modes (population, regions, languages)
