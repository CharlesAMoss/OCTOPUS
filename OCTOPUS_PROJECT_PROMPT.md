# Octopus - React Progress Components Library

## Project Initialization Prompt

I want to create **Octopus**, a React component library for versatile, composable progress indicators (bars, trackers, timers, countdowns). This will be a **standalone NPM package** designed to integrate seamlessly with projects like CROW grid, but also work independently.

### Project Goals

**What it is:**
- React component library (TypeScript-first)
- Focused on progress visualization components
- Composable building blocks (like Lego pieces)
- Works standalone OR as CROW grid custom cells
- Zero runtime dependencies (except React peer dependency)

**What it provides:**
- Progress bars (linear, circular, segmented)
- Timers (countdown, stopwatch, pomodoro)
- Trackers (step indicators, milestones, workflows)
- Loading states (skeleton, spinner, pulse)
- All components maintain `aspect-ratio: 1/1` for grid compatibility

### Technical Stack

```
octopus/
├── Stack: React 19, TypeScript 5.9, Vite 7, Vitest 4
├── Build: Vite library mode (ESM + CJS)
├── Testing: Vitest + Testing Library + jsdom
├── Styling: CSS Modules (scoped, themeable)
├── Distribution: NPM package (@octopus/progress)
└── Compatibility: React 18/19, works with CROW grid
```

### Project Structure

```
octopus/
├── src/
│   ├── components/
│   │   ├── ProgressBar/
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ProgressBar.module.css
│   │   │   ├── ProgressBar.test.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── CircularProgress/
│   │   │   ├── CircularProgress.tsx
│   │   │   ├── CircularProgress.module.css
│   │   │   ├── CircularProgress.test.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── Countdown/
│   │   │   ├── Countdown.tsx
│   │   │   ├── Countdown.module.css
│   │   │   ├── Countdown.test.tsx
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── StepTracker/
│   │   │   └── ... (same pattern)
│   │   └── index.ts
│   ├── registry/
│   │   ├── ComponentRegistry.ts    # For CROW grid integration
│   │   └── ComponentRegistry.test.ts
│   ├── types/
│   │   ├── common.types.ts         # Shared interfaces
│   │   └── index.ts
│   ├── utils/
│   │   ├── timeUtils.ts            # Time formatting helpers
│   │   ├── progressUtils.ts        # Percentage calculations
│   │   └── index.ts
│   ├── themes/
│   │   ├── default.css             # CSS custom properties
│   │   └── minimal.css
│   └── index.ts                    # Main entry point
├── examples/
│   ├── standalone/
│   │   ├── basic-progress.tsx
│   │   ├── countdown-timer.tsx
│   │   └── step-tracker.tsx
│   └── crow-integration/
│       ├── progress-cells.tsx
│       └── timer-dashboard.tsx
├── dist/                           # Build output (gitignored)
├── package.json
├── tsconfig.json
├── vite.config.ts                  # Library build config
├── vitest.config.ts
├── README.md
├── COMPONENTS.md                   # Component catalog
└── .github/
    └── copilot-instructions.md     # Agent instructions
```

### Core Component Requirements

**All components must:**
1. ✅ Accept `aspect-ratio: 1/1` style (grid compatibility)
2. ✅ Use TypeScript strict mode
3. ✅ Use CSS Modules (scoped styling)
4. ✅ Have comprehensive test coverage (>80%)
5. ✅ Support controlled/uncontrolled modes where applicable
6. ✅ Emit events via CustomEvent pattern (decoupled architecture)
7. ✅ Accept theme customization via CSS custom properties
8. ✅ Be accessible (ARIA labels, keyboard navigation)

### Initial Components (Phase 0)

**Phase 0 Components:**
1. **ProgressBar** - Linear progress indicator
   - Horizontal/vertical orientation
   - Animated transitions
   - Custom colors, labels
   - Variants: determinate, indeterminate, buffer

2. **CircularProgress** - Circular/radial progress
   - SVG-based rendering
   - Clockwise/counter-clockwise
   - Custom stroke width, colors
   - Center label/icon support

3. **Countdown** - Timer counting down to zero
   - Days/hours/minutes/seconds display
   - Pause/resume/reset controls
   - Event on completion
   - Custom format strings

### package.json Template

```json
{
  "name": "@octopus/progress",
  "version": "0.1.0",
  "description": "Versatile React progress components - bars, trackers, timers",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./components/*": {
      "import": "./dist/components/*/index.js",
      "types": "./dist/components/*/index.d.ts"
    },
    "./themes/*": {
      "import": "./dist/themes/*.css"
    }
  },
  "files": [
    "dist",
    "README.md",
    "COMPONENTS.md"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build && tsc --emitDeclarationOnly",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint . --ext ts,tsx",
    "typecheck": "tsc -b",
    "prepublishOnly": "npm run typecheck && npm run test && npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.36.0",
    "jsdom": "^27.0.1",
    "typescript": "^5.9.3",
    "vite": "^7.1.7",
    "vitest": "^4.0.3"
  },
  "keywords": [
    "react",
    "progress",
    "progress-bar",
    "timer",
    "countdown",
    "tracker",
    "loading",
    "components",
    "typescript"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/octopus.git"
  },
  "license": "MIT"
}
```

### Build Configuration (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OctopusProgress',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": true,
    "outDir": "./dist",
    "strict": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "composite": true
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules", "**/*.test.ts", "**/*.test.tsx"]
}
```

### Validation Commands (Same as CROW)

```bash
# 1. TypeScript compilation (fastest)
npx tsc -b

# 2. Tests (comprehensive)
npx vitest run

# 3. Linting
npm run lint

# 4. Production build
npm run build

# 5. Development server (for examples)
npm run dev
```

### Design Principles

**Composability:**
```typescript
// Components can be nested/composed
<ProgressBar value={60}>
  <ProgressLabel>{value}%</ProgressLabel>
  <ProgressIcon icon="check" />
</ProgressBar>

// Or used standalone
<CircularProgress value={75} size={100} color="blue" />
```

**Theming via CSS Custom Properties:**
```css
/* themes/default.css */
:root {
  --octopus-primary-color: #3b82f6;
  --octopus-success-color: #10b981;
  --octopus-error-color: #ef4444;
  --octopus-bar-height: 8px;
  --octopus-transition-speed: 300ms;
}
```

**CROW Grid Integration:**
```typescript
import { ComponentRegistry } from '@octopus/progress';
import { ProgressBar, Countdown } from '@octopus/progress';

// Register for CROW grid
ComponentRegistry.register('__PROGRESS__', ProgressBar);
ComponentRegistry.register('__COUNTDOWN__', Countdown);

// Use in grid data
const data = [
  { id: 1, imageUrl: '__PROGRESS__', value: 75, label: 'Task Progress' },
  { id: 2, imageUrl: '__COUNTDOWN__', targetDate: '2025-12-31' },
];
```

### First Component: ProgressBar

**types.ts:**
```typescript
export interface ProgressBarProps {
  /** Current progress value (0-100) */
  value: number;
  
  /** Maximum value (default: 100) */
  max?: number;
  
  /** Orientation (default: 'horizontal') */
  orientation?: 'horizontal' | 'vertical';
  
  /** Variant (default: 'determinate') */
  variant?: 'determinate' | 'indeterminate' | 'buffer';
  
  /** Buffer value for buffer variant (0-100) */
  bufferValue?: number;
  
  /** Custom color */
  color?: string;
  
  /** Show label inside bar */
  showLabel?: boolean;
  
  /** Custom label formatter */
  labelFormatter?: (value: number, max: number) => string;
  
  /** Callback on value change */
  onChange?: (value: number) => void;
  
  /** Callback on completion (value === max) */
  onComplete?: () => void;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label */
  ariaLabel?: string;
}
```

**ProgressBar.tsx:**
```typescript
import { useEffect, useRef } from 'react';
import styles from './ProgressBar.module.css';
import type { ProgressBarProps } from './types';

export function ProgressBar({
  value,
  max = 100,
  orientation = 'horizontal',
  variant = 'determinate',
  bufferValue,
  color,
  showLabel = false,
  labelFormatter,
  onChange,
  onComplete,
  className,
  ariaLabel,
}: ProgressBarProps) {
  const prevValueRef = useRef(value);
  
  useEffect(() => {
    if (value !== prevValueRef.current) {
      onChange?.(value);
      
      if (value >= max && prevValueRef.current < max) {
        onComplete?.();
      }
      
      prevValueRef.current = value;
    }
  }, [value, max, onChange, onComplete]);
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const bufferPercentage = bufferValue 
    ? Math.min(Math.max((bufferValue / max) * 100, 0), 100) 
    : undefined;
  
  const defaultLabel = labelFormatter 
    ? labelFormatter(value, max) 
    : `${Math.round(percentage)}%`;
  
  return (
    <div
      className={`${styles.progressBar} ${styles[orientation]} ${styles[variant]} ${className || ''}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || 'Progress indicator'}
      style={{ aspectRatio: '1 / 1' }}
    >
      <div className={styles.track}>
        {variant === 'buffer' && bufferPercentage !== undefined && (
          <div
            className={styles.buffer}
            style={{
              [orientation === 'horizontal' ? 'width' : 'height']: `${bufferPercentage}%`,
            }}
          />
        )}
        <div
          className={styles.fill}
          style={{
            [orientation === 'horizontal' ? 'width' : 'height']: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showLabel && (
        <div className={styles.label}>{defaultLabel}</div>
      )}
    </div>
  );
}
```

### Action Items to Start

**Please create the Octopus project with:**

1. ✅ Initialize project directory `octopus/`
2. ✅ Create `package.json` with dependencies listed above
3. ✅ Create `vite.config.ts` (library mode)
4. ✅ Create `vitest.config.ts` (jsdom environment)
5. ✅ Create `tsconfig.json` (strict mode)
6. ✅ Create `.gitignore` (node_modules, dist, coverage)
7. ✅ Create directory structure:
   - `src/components/ProgressBar/`
   - `src/components/CircularProgress/`
   - `src/components/Countdown/`
   - `src/types/`
   - `src/utils/`
   - `src/registry/`
   - `src/themes/`
   - `examples/`
8. ✅ Create first component: **ProgressBar** with tests
9. ✅ Create `src/index.ts` (main entry point)
10. ✅ Verify build works: `npm run build`
11. ✅ Verify tests pass: `npm test`
12. ✅ Create `README.md` with installation/usage
13. ✅ Create `.github/copilot-instructions.md` (like CROW's)

**Validation Checklist:**
- [ ] `npx tsc -b` → 0 errors
- [ ] `npm test` → All tests passing
- [ ] `npm run build` → dist/ created with index.js, index.cjs, index.d.ts
- [ ] ProgressBar component renders with aspect-ratio: 1/1
- [ ] Component accepts all props from ProgressBarProps interface
- [ ] Tests cover value changes, completion callback, variants

Start with **ProgressBar** as the foundation, then we'll add CircularProgress and Countdown in subsequent phases.

---

## Context for AI Agents

This project follows the same patterns as CROW:
- **React 19** with TypeScript strict mode
- **Vite** for building (library mode, not app mode)
- **Vitest** for testing with jsdom
- **CSS Modules** for scoped styling
- **Peer dependencies**: React is provided by consumer, not bundled
- **Distribution**: NPM package with ESM + CJS outputs
- **Validation order**: TypeScript → Tests → Lint → Build

The key difference: Octopus is a **component library** (published to NPM), not a demo application. All components must work both standalone and as CROW grid custom cells (via `aspect-ratio: 1/1`).
