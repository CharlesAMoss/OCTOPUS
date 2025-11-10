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
