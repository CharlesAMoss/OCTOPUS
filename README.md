# Octopus 🐙

**Versatile React progress components** - bars, trackers, timers, and more.

A TypeScript-first React component library for progress visualization, designed to work standalone or integrate seamlessly with [CROW grid](https://github.com/yourusername/crow).

## Features

✅ **Composable** - Build complex progress indicators from simple components  
✅ **TypeScript** - Full type safety with strict mode  
✅ **Themeable** - CSS custom properties for easy customization  
✅ **Accessible** - ARIA labels and keyboard navigation  
✅ **Grid-ready** - All components support `aspect-ratio: 1/1` for grid layouts  
✅ **Zero dependencies** - Only peer dependency is React  

## Installation

```bash
npm install @octopus/progress
```

**Peer dependencies:**
```bash
npm install react react-dom
```

## Quick Start

```tsx
import { ProgressBar, CircularProgress, Countdown } from '@octopus/progress';
import '@octopus/progress/themes/default.css';

function App() {
  return (
    <div>
      {/* Linear progress bar */}
      <ProgressBar value={75} showLabel />
      
      {/* Circular progress */}
      <CircularProgress value={60} size={100} showLabel />
      
      {/* Countdown timer */}
      <Countdown 
        targetDate="2025-12-31" 
        showLabels 
        onComplete={() => alert('Done!')} 
      />
    </div>
  );
}
```

## Components

### ProgressBar

Linear progress indicator with horizontal/vertical orientations.

```tsx
<ProgressBar 
  value={75}
  max={100}
  orientation="horizontal"
  variant="determinate"
  showLabel
  color="#3b82f6"
  onComplete={() => console.log('Complete!')}
/>
```

**Props:**
- `value` - Current progress (0-100)
- `max` - Maximum value (default: 100)
- `orientation` - `'horizontal'` | `'vertical'`
- `variant` - `'determinate'` | `'indeterminate'` | `'buffer'`
- `showLabel` - Display percentage label
- `color` - Custom progress color
- `onChange` - Callback on value change
- `onComplete` - Callback when value reaches max

### CircularProgress

SVG-based circular/radial progress indicator.

```tsx
<CircularProgress
  value={60}
  size={120}
  strokeWidth={10}
  direction="clockwise"
  showLabel
  color="#10b981"
/>
```

**Props:**
- `value` - Current progress (0-100)
- `size` - Circle diameter in pixels
- `strokeWidth` - Stroke thickness
- `direction` - `'clockwise'` | `'counter-clockwise'`
- `variant` - `'determinate'` | `'indeterminate'`
- `showLabel` - Display percentage in center
- `children` - Custom content in center

### Countdown

Timer counting down to a target date/time.

```tsx
<Countdown
  targetDate={new Date('2025-12-31T23:59:59')}
  format="DHms"
  showLabels
  labels={{ days: 'days', hours: 'hrs' }}
  onComplete={() => console.log('Time up!')}
/>
```

**Props:**
- `targetDate` - Target date/time (Date, string, or timestamp)
- `format` - Display format (`'D'`=days, `'H'`=hours, `'M'`=minutes, `'S'`=seconds)
- `showLabels` - Show unit labels
- `labels` - Custom labels for time units
- `autoStart` - Start immediately (default: true)
- `onTick` - Callback every second
- `onComplete` - Callback when countdown reaches zero
- `children` - Render function for custom display

## Theming

Octopus uses CSS custom properties for theming:

```tsx
// Import a built-in theme
import '@octopus/progress/themes/default.css';
// or
import '@octopus/progress/themes/minimal.css';
```

**Custom theme:**
```css
:root {
  --octopus-primary-color: #3b82f6;
  --octopus-success-color: #10b981;
  --octopus-track-color: #e5e7eb;
  --octopus-bar-height: 8px;
  --octopus-transition-speed: 300ms;
}
```

## CROW Grid Integration

Use with CROW grid via component registry:

```tsx
import { ComponentRegistry } from '@octopus/progress';
import { ProgressBar, Countdown } from '@octopus/progress';

// Register components
ComponentRegistry.register('__PROGRESS__', ProgressBar);
ComponentRegistry.register('__COUNTDOWN__', Countdown);

// Use in grid data
const data = [
  { id: 1, imageUrl: '__PROGRESS__', value: 75 },
  { id: 2, imageUrl: '__COUNTDOWN__', targetDate: '2025-12-31' },
];
```

## Examples

Check out the live demo to see all components in action:

```bash
# Start dev server
npm run dev

# Open http://localhost:5174/ in your browser
```

Or see the [examples](./examples) directory for usage patterns:
- [Interactive Demo](./examples/App.tsx) - All components with live updates
- [Basic Progress](./examples/standalone/basic-progress.tsx)
- [Countdown Timer](./examples/standalone/countdown-timer.tsx)
- [CROW Integration](./examples/crow-integration/progress-cells.tsx)

## API Reference

Full API documentation: [COMPONENTS.md](./COMPONENTS.md)

## Development

```bash
# Install dependencies
npm install

# Run dev server (serves examples at http://localhost:5174/)
npm run dev

# Run tests
npm test

# Build library
npm run build

# Type check
npm run typecheck
```

## License

MIT © [Your Name]
