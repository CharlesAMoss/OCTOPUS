# Octopus Component Catalog

Complete API reference for all Octopus components.

## Table of Contents

- [ProgressBar](#progressbar)
- [CircularProgress](#circularprogress)
- [Countdown](#countdown)
- [ComponentRegistry](#componentregistry)
- [Utilities](#utilities)

---

## ProgressBar

Linear progress indicator with support for horizontal/vertical orientations and multiple variants.

### Props

```typescript
interface ProgressBarProps {
  value: number;                    // Current progress (0-100)
  max?: number;                     // Maximum value (default: 100)
  orientation?: 'horizontal' | 'vertical';
  variant?: 'determinate' | 'indeterminate' | 'buffer';
  bufferValue?: number;             // Buffer value for buffer variant
  color?: string;                   // Custom progress color
  showLabel?: boolean;              // Display percentage label
  labelFormatter?: (value: number, max: number) => string;
  onChange?: (value: number) => void;
  onComplete?: () => void;
  className?: string;
  ariaLabel?: string;
}
```

### Examples

```tsx
// Basic usage
<ProgressBar value={75} />

// With label and custom color
<ProgressBar value={60} showLabel color="#10b981" />

// Vertical orientation
<ProgressBar value={80} orientation="vertical" />

// Buffer variant
<ProgressBar value={50} variant="buffer" bufferValue={75} />

// Indeterminate loading
<ProgressBar value={0} variant="indeterminate" />

// Custom label formatter
<ProgressBar 
  value={30} 
  max={50}
  showLabel 
  labelFormatter={(v, max) => `${v}/${max} tasks`}
/>
```

### CSS Custom Properties

```css
--octopus-primary-color: #3b82f6;
--octopus-track-color: #e5e7eb;
--octopus-buffer-color: #cbd5e1;
--octopus-bar-height: 8px;
--octopus-border-radius: 4px;
--octopus-transition-speed: 300ms;
```

---

## CircularProgress

SVG-based circular/radial progress indicator.

### Props

```typescript
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;                    // Circle diameter in pixels (default: 100)
  strokeWidth?: number;             // Stroke thickness (default: 8)
  direction?: 'clockwise' | 'counter-clockwise';
  variant?: 'determinate' | 'indeterminate';
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  labelFormatter?: (value: number, max: number) => string;
  children?: React.ReactNode;       // Custom center content
  onChange?: (value: number) => void;
  onComplete?: () => void;
  className?: string;
  ariaLabel?: string;
}
```

### Examples

```tsx
// Basic usage
<CircularProgress value={75} />

// Custom size and stroke
<CircularProgress value={60} size={150} strokeWidth={12} />

// With label
<CircularProgress value={80} showLabel />

// Custom center content
<CircularProgress value={90}>
  <div style={{ fontSize: 24 }}>90%</div>
</CircularProgress>

// Counter-clockwise
<CircularProgress value={50} direction="counter-clockwise" />

// Indeterminate spinner
<CircularProgress value={0} variant="indeterminate" />
```

### CSS Custom Properties

```css
--octopus-primary-color: #3b82f6;
--octopus-track-color: #e5e7eb;
--octopus-label-font-size: 14px;
--octopus-transition-speed: 300ms;
```

---

## Countdown

Timer that counts down to a target date/time with pause/resume/reset controls.

### Props

```typescript
interface CountdownProps {
  targetDate: Date | string | number;
  format?: string;                  // Display format (default: 'DHms')
  showLabels?: boolean;
  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
  autoStart?: boolean;              // Default: true
  onComplete?: () => void;
  onTick?: (timeRemaining: TimeRemaining) => void;
  children?: (props: CountdownRenderProps) => React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;                    // Total milliseconds remaining
}

interface CountdownRenderProps extends TimeRemaining {
  isPaused: boolean;
  isComplete: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}
```

### Examples

```tsx
// Basic usage
<Countdown targetDate="2025-12-31T23:59:59" />

// With labels
<Countdown 
  targetDate={new Date('2025-12-31')} 
  showLabels 
/>

// Custom labels
<Countdown
  targetDate="2025-12-31"
  showLabels
  labels={{ days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec' }}
/>

// Custom format (hours and minutes only)
<Countdown targetDate="2025-12-31" format="Hm" />

// With callbacks
<Countdown
  targetDate="2025-12-31"
  onTick={(time) => console.log('Remaining:', time.total)}
  onComplete={() => alert('Countdown complete!')}
/>

// Custom render function
<Countdown targetDate="2025-12-31">
  {({ days, hours, minutes, seconds, pause, resume, isPaused }) => (
    <div>
      <div>{days}d {hours}h {minutes}m {seconds}s</div>
      <button onClick={isPaused ? resume : pause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  )}
</Countdown>
```

### CSS Custom Properties

```css
--octopus-countdown-value-size: 24px;
--octopus-countdown-value-weight: 700;
--octopus-countdown-value-color: #1f2937;
--octopus-countdown-label-size: 10px;
--octopus-countdown-label-color: #6b7280;
--octopus-countdown-gap: 12px;
```

---

## ComponentRegistry

Registry for CROW grid integration. Allows registering components for use as custom grid cells.

### API

```typescript
class ComponentRegistry {
  register(marker: string, component: React.ComponentType<any>): void;
  unregister(marker: string): void;
  get(marker: string): React.ComponentType<any> | undefined;
  has(marker: string): boolean;
  getMarkers(): string[];
  clear(): void;
}
```

### Example

```tsx
import { ComponentRegistry, ProgressBar, Countdown } from '@octopus/progress';

// Register components
ComponentRegistry.register('__PROGRESS__', ProgressBar);
ComponentRegistry.register('__COUNTDOWN__', Countdown);

// Check registration
if (ComponentRegistry.has('__PROGRESS__')) {
  const Component = ComponentRegistry.get('__PROGRESS__');
}

// Get all markers
const markers = ComponentRegistry.getMarkers();
// ['__PROGRESS__', '__COUNTDOWN__']

// Clear all
ComponentRegistry.clear();
```

---

## Utilities

Utility functions for time and progress calculations.

### Time Utilities

```typescript
// Format milliseconds into time components
function formatMilliseconds(ms: number): TimeComponents;

// Pad number with leading zeros
function padZero(num: number, length?: number): string;

// Format time components to string
function formatTime(components: TimeComponents, format?: string): string;

// Calculate time difference
function getTimeDifference(target: Date, current?: Date): number;
```

### Progress Utilities

```typescript
// Calculate percentage
function calculatePercentage(value: number, max?: number): number;

// Clamp value between min and max
function clamp(value: number, min: number, max: number): number;

// Check if progress is complete
function isComplete(value: number, max?: number): boolean;

// Normalize value to valid range
function normalizeValue(value: number, min?: number, max?: number): number;

// Calculate stroke offset for circular progress
function calculateStrokeOffset(percentage: number, circumference: number): number;

// Calculate circle circumference
function calculateCircumference(radius: number): number;
```

### Usage

```tsx
import { 
  formatMilliseconds, 
  calculatePercentage,
  clamp 
} from '@octopus/progress';

const time = formatMilliseconds(125000);
// { days: 0, hours: 0, minutes: 2, seconds: 5 }

const percentage = calculatePercentage(75, 100);
// 75

const clamped = clamp(150, 0, 100);
// 100
```

---

## Accessibility

All components include proper ARIA attributes:

- **ProgressBar**: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **CircularProgress**: `role="progressbar"` with ARIA value attributes
- **Countdown**: `role="timer"` with appropriate labels

Custom ARIA labels can be provided via the `ariaLabel` prop.

## Grid Compatibility

All components maintain `aspect-ratio: 1/1` by default, making them perfect for grid layouts and CROW grid integration.
