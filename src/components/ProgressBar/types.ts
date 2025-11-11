export type LabelPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right' 
  | 'center';

export type MessageAnimation = 
  | 'dots-wave'      // "... loading ..." → "... ... loading " → " loading ... ..."
  | 'dots-pulse'     // "loading" → "loading." → "loading.." → "loading..."
  | 'ellipsis'       // "loading" → "loading." → "loading.." → "loading..." (repeat)
  | 'none';

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
  
  /** Custom color for unfilled segments/track */
  trackColor?: string;
  
  /** Show label (percentage) */
  showLabel?: boolean;
  
  /** Label position (default: 'top-right') */
  labelPosition?: LabelPosition;
  
  /** Custom label formatter */
  labelFormatter?: (value: number, max: number) => string;
  
  /** Number of segments (if set, renders segmented progress bar) */
  segments?: number;
  
  /** Show spacing between segments (default: false) */
  segmentSpacing?: boolean;
  
  /** Bar thickness: 'thin' | 'normal' | 'thick' or pixel value (default: 'normal') */
  thickness?: 'thin' | 'normal' | 'thick' | number;
  
  /** Message text to display (optional) */
  message?: string;
  
  /** Message position (default: 'bottom-left') */
  messagePosition?: LabelPosition;
  
  /** Message animation style (default: 'dots-wave') */
  messageAnimation?: MessageAnimation;
  
  /** Callback on value change */
  onChange?: (value: number) => void;
  
  /** Callback on completion (value === max) */
  onComplete?: () => void;
  
  /** Callback when a segment completes (only for segmented variant) */
  onSegmentComplete?: (segmentIndex: number) => void;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label */
  ariaLabel?: string;
}
