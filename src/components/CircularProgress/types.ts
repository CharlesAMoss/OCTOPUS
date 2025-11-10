export interface CircularProgressProps {
  /** Current progress value (0-100) */
  value: number;
  
  /** Maximum value (default: 100) */
  max?: number;
  
  /** Size of the circle in pixels (default: 100) */
  size?: number;
  
  /** Stroke width in pixels (default: 8) */
  strokeWidth?: number;
  
  /** Direction (default: 'clockwise') */
  direction?: 'clockwise' | 'counter-clockwise';
  
  /** Variant (default: 'determinate') */
  variant?: 'determinate' | 'indeterminate';
  
  /** Custom color for progress stroke */
  color?: string;
  
  /** Custom color for track stroke */
  trackColor?: string;
  
  /** Show label in center */
  showLabel?: boolean;
  
  /** Custom label formatter */
  labelFormatter?: (value: number, max: number) => string;
  
  /** Custom content to display in center */
  children?: React.ReactNode;
  
  /** Callback on value change */
  onChange?: (value: number) => void;
  
  /** Callback on completion (value === max) */
  onComplete?: () => void;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label */
  ariaLabel?: string;
}
