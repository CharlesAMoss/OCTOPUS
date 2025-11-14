import { useEffect, useRef } from 'react';
import styles from './CircularProgress.module.css';
import type { CircularProgressProps } from './types';

export function CircularProgress({
  value,
  max = 100,
  size = 100,
  strokeWidth = 8,
  direction = 'clockwise',
  variant = 'determinate',
  color,
  trackColor,
  showLabel = false,
  labelFormatter,
  children,
  onChange,
  onComplete,
  className,
  ariaLabel,
}: CircularProgressProps) {
  const prevValueRef = useRef(value);
  
  useEffect(() => {
    if (value !== prevValueRef.current) {
      onChange?.(value);
      
      if (value >= max && prevValueRef.current < max) {
        onComplete?.();
      }
      
      prevValueRef.current = value;
    }
  }, [value, max, onChange, onComplete]);
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  const defaultLabel = labelFormatter 
    ? labelFormatter(value, max) 
    : `${Math.round(percentage)}%`;
  
  return (
    <div
      className={`${styles.circularProgress} ${styles[variant]} ${className || ''}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || 'Circular progress indicator'}
      style={{ 
        aspectRatio: '1 / 1',
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        className={styles.svg}
      >
        {/* Track circle */}
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={trackColor}
        />
        
        {/* Progress circle */}
        <circle
          className={`${styles.progress} ${styles[direction]}`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={variant === 'indeterminate' ? undefined : circumference}
          strokeDashoffset={variant === 'indeterminate' ? undefined : offset}
          transform={variant === 'indeterminate' ? undefined : `rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      
      {(showLabel || children) && (
        <div className={styles.content}>
          {children || (showLabel && <span className={styles.label}>{defaultLabel}</span>)}
        </div>
      )}
    </div>
  );
}
