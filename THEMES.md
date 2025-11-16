# Octopus Themes

Beautiful, ready-to-use color schemes for Octopus progress components.

## 🎨 Available Themes

### Default
**Clean and professional** - Blue primary with neutral grays
```tsx
import '@octopus/progress/themes/default.css';
```
- Primary: `#3b82f6` (Blue)
- Track: `#e5e7eb` (Light Gray)
- Best for: General purpose applications, professional UIs

### Dark
**Dark mode ready** - Lighter colors optimized for dark backgrounds
```tsx
import '@octopus/progress/themes/dark.css';
```
- Primary: `#60a5fa` (Light Blue)
- Track: `#374151` (Dark Gray)
- Best for: Dark mode applications, reduced eye strain

### Ocean
**Cool and calm** - Blue and teal palette
```tsx
import '@octopus/progress/themes/ocean.css';
```
- Primary: `#0891b2` (Cyan)
- Track: `#cffafe` (Light Cyan)
- Best for: Data dashboards, analytics, scientific apps

### Sunset
**Warm and inviting** - Orange, red, and yellow tones
```tsx
import '@octopus/progress/themes/sunset.css';
```
- Primary: `#f97316` (Orange)
- Track: `#fee2e2` (Light Pink)
- Best for: Creative applications, notifications, alerts

### Forest
**Natural and organic** - Green and earth tones
```tsx
import '@octopus/progress/themes/forest.css';
```
- Primary: `#16a34a` (Green)
- Track: `#dcfce7` (Light Green)
- Best for: Health apps, environmental tracking, progress indicators

### Neon
**Bold and vibrant** - Cyberpunk-inspired high contrast
```tsx
import '@octopus/progress/themes/neon.css';
```
- Primary: `#00ffff` (Cyan)
- Track: `#0a0a0a` (Near Black)
- Best for: Gaming interfaces, entertainment, modern/futuristic UIs

### Minimal
**Lightweight** - Simplified styling with reduced visual weight
```tsx
import '@octopus/progress/themes/minimal.css';
```
- Streamlined design
- Best for: Minimalist applications, fast load times

## 🛠️ Customization

### Override Individual Colors

```tsx
import '@octopus/progress/themes/ocean.css';

// In your CSS:
:root {
  --octopus-primary-color: #0284c7; // Custom blue
}
```

### Component-Level Colors

```tsx
<ProgressBar 
  value={75} 
  color="#8b5cf6"  // Override theme color
  trackColor="#f3e8ff"
/>
```

### Create Your Own Theme

```css
/* my-theme.css */
:root {
  --octopus-primary-color: #8b5cf6;
  --octopus-success-color: #a855f7;
  --octopus-track-color: #f3e8ff;
  --octopus-label-color: #5b21b6;
  --octopus-message-color: #7c3aed;
  --octopus-border-radius: 8px;
  --octopus-transition-speed: 400ms;
}
```

## 📱 Responsive Dark Mode

```css
/* Auto-switch based on system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --octopus-primary-color: #60a5fa;
    --octopus-track-color: #374151;
    --octopus-label-color: #f3f4f6;
  }
}
```

## 🎯 Theme Switching

```tsx
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('default');
  
  useEffect(() => {
    // Dynamically load theme
    import(`@octopus/progress/themes/${theme}.css`);
  }, [theme]);
  
  return (
    <div>
      <select onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="dark">Dark</option>
        <option value="ocean">Ocean</option>
        <option value="sunset">Sunset</option>
        <option value="forest">Forest</option>
        <option value="neon">Neon</option>
      </select>
      
      <ProgressBar value={75} showLabel />
    </div>
  );
}
```

## 📦 All CSS Variables

```css
/* Colors */
--octopus-primary-color
--octopus-success-color
--octopus-warning-color
--octopus-error-color
--octopus-track-color
--octopus-buffer-color

/* Typography */
--octopus-label-color
--octopus-label-font-size
--octopus-label-font-weight
--octopus-message-color

/* Sizing */
--octopus-bar-height
--octopus-border-radius

/* Countdown */
--octopus-countdown-value-size
--octopus-countdown-value-weight
--octopus-countdown-value-color
--octopus-countdown-label-size
--octopus-countdown-label-weight
--octopus-countdown-label-color
--octopus-countdown-gap
--octopus-unit-gap

/* Animation */
--octopus-transition-speed
```
