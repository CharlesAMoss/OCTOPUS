# GitHub Copilot Instructions for Octopus

## Project Overview

**Octopus** is a TypeScript-first React component library for progress visualization components (progress bars, circular indicators, timers, countdowns). It's designed to work standalone or integrate with CROW grid.

## Technology Stack

- **React 19** (peer dependency)
- **TypeScript 5.9** (strict mode enabled)
- **Vite 7** (library build mode)
- **Vitest 4** (testing with jsdom)
- **CSS Modules** (scoped component styling)

## Architecture Principles

1. **Library Mode**: This is a **library** (NPM package), not an application
2. **Peer Dependencies**: React is provided by the consumer, not bundled
3. **Grid Compatibility**: All components support `aspect-ratio: 1/1`
4. **Zero Runtime Dependencies**: Only React as peer dependency
5. **Type Safety**: Strict TypeScript with full type coverage
6. **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## Code Standards

### File Organization

```
src/components/ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.module.css # Scoped styles
├── ComponentName.test.tsx   # Vitest tests
├── types.ts                 # Component-specific types
└── index.ts                 # Public exports
```

### TypeScript Guidelines

- Use **strict mode** (no implicit any, null checks enabled)
- Export types alongside components
- Use `interface` for props, `type` for unions/intersections
- Prefer `React.ComponentType` over `FC` or `FunctionComponent`
- Always define return types for utility functions

### Component Patterns

```typescript
// ✅ Good: Named export with explicit types
export function ProgressBar({ value, max = 100 }: ProgressBarProps) {
  // Implementation
}

// ❌ Avoid: Default exports, FC wrapper
export default React.FC<ProgressBarProps> = ({ value }) => { ... }
```

### CSS Module Conventions

```css
/* Use kebab-case for class names */
.progress-bar { }
.progress-bar-horizontal { }

/* Use CSS custom properties for theming */
background-color: var(--octopus-primary-color, blue);

/* Namespace all custom properties */
--octopus-bar-height: 8px;
```

### Testing Requirements

- **Minimum 80% coverage** for all components
- Test user interactions, not implementation details
- Use `@testing-library/react` patterns
- Mock timers for time-based components
- Test accessibility attributes (ARIA)

```typescript
// ✅ Good: Testing behavior
it('calls onComplete when value reaches max', () => {
  const onComplete = vi.fn();
  const { rerender } = render(<ProgressBar value={50} onComplete={onComplete} />);
  rerender(<ProgressBar value={100} onComplete={onComplete} />);
  expect(onComplete).toHaveBeenCalledTimes(1);
});

// ❌ Avoid: Testing implementation
it('updates internal state', () => { ... });
```

## Build and Validation

### Validation Order (Always Follow)

1. **TypeScript**: `npx tsc -b` (fastest, catches type errors)
2. **Tests**: `npm test` (comprehensive validation)
3. **Lint**: `npm run lint` (code quality)
4. **Build**: `npm run build` (produces dist/ artifacts)

### Build Outputs

The build produces:
- `dist/index.js` (ESM format)
- `dist/index.cjs` (CommonJS format)
- `dist/index.d.ts` (TypeScript declarations)
- `dist/components/*/` (Individual component exports)
- `dist/themes/*.css` (Theme files)

## Common Tasks

### Adding a New Component

1. Create component directory: `src/components/ComponentName/`
2. Implement: `ComponentName.tsx`, `types.ts`, `ComponentName.module.css`
3. Write tests: `ComponentName.test.tsx` (>80% coverage)
4. Export in: `src/components/index.ts` and `src/index.ts`
5. Document in: `COMPONENTS.md`
6. Validate: `npx tsc -b && npm test && npm run build`

### Debugging Type Errors

- Check `tsconfig.json` settings (strict mode enabled)
- Ensure React types are installed: `@types/react`, `@types/react-dom`
- CSS Modules require type declarations (handled by Vite)
- Don't use `any` - use `unknown` and type guards instead

### Working with CSS Modules

```typescript
// Import CSS Module
import styles from './Component.module.css';

// Use in JSX
<div className={styles.progressBar} />

// Combine classes
<div className={`${styles.base} ${styles.variant}`} />
```

## CROW Grid Integration

Components can be registered for CROW grid usage:

```typescript
import { ComponentRegistry } from '@octopus/progress';

ComponentRegistry.register('__PROGRESS__', ProgressBar);
```

Grid cells use `imageUrl: '__PROGRESS__'` to trigger custom component rendering.

## Accessibility Checklist

- [ ] Semantic HTML elements (`role="progressbar"`, `role="timer"`)
- [ ] ARIA attributes (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- [ ] Keyboard navigation (where applicable)
- [ ] Color contrast (WCAG AA minimum)
- [ ] Focus indicators (visible focus states)

## Anti-Patterns to Avoid

❌ **Don't**:
- Bundle React in the library
- Use default exports
- Skip TypeScript type checking
- Use inline styles instead of CSS Modules
- Ignore accessibility attributes
- Test implementation details
- Use `any` type
- Create circular dependencies

✅ **Do**:
- Use named exports
- Validate with `tsc -b` before testing
- Write tests for user-facing behavior
- Use CSS custom properties for theming
- Document component APIs
- Keep components composable
- Follow strict TypeScript

## Questions or Uncertainty?

1. Check existing components for patterns (`ProgressBar`, `CircularProgress`, `Countdown`)
2. Review `tsconfig.json` for TypeScript configuration
3. Examine `vite.config.ts` for build setup
4. Consult `COMPONENTS.md` for API documentation
5. Run validation: `npx tsc -b && npm test`

## Success Criteria

A component is complete when:
- [ ] TypeScript compiles with zero errors (`npx tsc -b`)
- [ ] All tests pass with >80% coverage (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documented in `COMPONENTS.md`
- [ ] Exports added to `src/index.ts`
- [ ] Example created in `examples/`
- [ ] Maintains `aspect-ratio: 1/1` compatibility
