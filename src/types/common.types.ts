/**
 * Common types shared across all components
 */

export type Orientation = 'horizontal' | 'vertical';

export type ProgressVariant = 'determinate' | 'indeterminate' | 'buffer';

export interface BaseComponentProps {
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label */
  ariaLabel?: string;
}

export interface ProgressComponentProps extends BaseComponentProps {
  /** Current progress value */
  value: number;
  
  /** Maximum value (default: 100) */
  max?: number;
  
  /** Callback on value change */
  onChange?: (value: number) => void;
  
  /** Callback on completion (value === max) */
  onComplete?: () => void;
}
