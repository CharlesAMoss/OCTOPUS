import { useEffect, useRef } from 'react';
import styles from './ProgressBar.module.css';
import type { ProgressBarProps } from './types';

export function ProgressBar({
  value,
  max = 100,
  orientation = 'horizontal',
  variant = 'determinate',
  bufferValue,
  color,
  showLabel = false,
  labelFormatter,
  onChange,
  onComplete,
  className,
  ariaLabel,
}: ProgressBarProps) {
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
  const bufferPercentage = bufferValue 
    ? Math.min(Math.max((bufferValue / max) * 100, 0), 100) 
    : undefined;
  
  const defaultLabel = labelFormatter 
    ? labelFormatter(value, max) 
    : `${Math.round(percentage)}%`;
  
  return (
    <div
      className={`${styles.progressBar} ${styles[orientation]} ${styles[variant]} ${className || ''}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || 'Progress indicator'}
      style={{ aspectRatio: '1 / 1' }}
    >
      <div className={styles.track}>
        {variant === 'buffer' && bufferPercentage !== undefined && (
          <div
            className={styles.buffer}
            style={{
              [orientation === 'horizontal' ? 'width' : 'height']: `${bufferPercentage}%`,
            }}
          />
        )}
        <div
          className={styles.fill}
          style={{
            [orientation === 'horizontal' ? 'width' : 'height']: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showLabel && (
        <div className={styles.label}>{defaultLabel}</div>
      )}
    </div>
  );
}
