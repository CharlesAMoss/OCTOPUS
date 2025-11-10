export interface CountdownProps {
  /** Target date/time to count down to */
  targetDate: Date | string | number;
  
  /** Format string for display (default: 'DHms') 
   * D = days, H = hours, M = minutes, S = seconds
   */
  format?: string;
  
  /** Show labels for units */
  showLabels?: boolean;
  
  /** Custom labels for time units */
  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
  
  /** Auto-start countdown (default: true) */
  autoStart?: boolean;
  
  /** Callback when countdown reaches zero */
  onComplete?: () => void;
  
  /** Callback on each tick (every second) */
  onTick?: (timeRemaining: TimeRemaining) => void;
  
  /** Custom render function */
  children?: (props: CountdownRenderProps) => React.ReactNode;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label */
  ariaLabel?: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export interface CountdownRenderProps extends TimeRemaining {
  isPaused: boolean;
  isComplete: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}
