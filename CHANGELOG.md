# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-15

### Added
- Initial release of Octopus Progress Components
- **ProgressBar** component with:
  - Horizontal and vertical orientations
  - Determinate, indeterminate, and buffer variants
  - Segmented progress bars (up to 12+ segments)
  - Customizable thickness (thin, normal, thick, or custom px)
  - Label positioning (top/bottom, left/center/right)
  - Message display with animations (dots-wave, dots-pulse, ellipsis)
  - Segment completion callbacks
  - Support for graphic equalizer layouts
- **CircularProgress** component with:
  - Determinate and indeterminate variants
  - Customizable size and stroke width (16px default)
  - Clockwise and counter-clockwise directions
  - Optional center labels
  - Smooth indeterminate animations
- **Countdown** component with:
  - Flexible time formats (days, hours, minutes, seconds)
  - Custom labels for time units
  - Compact, optimized spacing
  - Auto-start and manual control
  - Tick and completion callbacks
- **Theme System** with 7 pre-built themes:
  - Default (blue and neutral grays)
  - Dark (optimized for dark backgrounds)
  - Ocean (cool blues and teals)
  - Sunset (warm oranges and reds)
  - Forest (natural greens)
  - Neon (cyberpunk cyan with glow effects)
  - Minimal (lightweight styling)
- **CSS Custom Properties** for easy theming
- **TypeScript** support with full type definitions
- **Accessibility** features (ARIA labels, semantic HTML)
- **ComponentRegistry** for CROW grid integration
- **Utility functions** for time and progress calculations
- **Zero runtime dependencies** (React as peer dependency only)

### Build & Publishing
- ESM and CommonJS module formats
- Tree-shakeable exports for individual components
- Theme CSS files as separate imports
- Comprehensive TypeScript declarations
- Proper npm package configuration with `.npmignore`
- MIT License

### Documentation
- Complete README with quick start and examples
- COMPONENTS.md with full API reference
- THEMES.md with theming guide
- PUBLISHING.md with publishing checklist
- Interactive demo page with all components

### Testing
- 49 test cases with Vitest
- >80% code coverage
- React Testing Library integration
- Component interaction tests
- Accessibility validation

[0.1.0]: https://github.com/CharlesAMoss/OCTOPUS/releases/tag/v0.1.0
