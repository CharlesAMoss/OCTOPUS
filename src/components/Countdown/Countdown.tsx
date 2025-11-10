import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Countdown.module.css';
import type { CountdownProps, TimeRemaining, CountdownRenderProps } from './types';

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const total = Math.max(0, targetDate.getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return { days, hours, minutes, seconds, total };
}

export function Countdown({
  targetDate,
  format = 'DHms',
  showLabels = false,
  labels = {},
  autoStart = true,
  onComplete,
  onTick,
  children,
  className,
  ariaLabel,
}: CountdownProps) {
  const target = new Date(targetDate);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => 
    calculateTimeRemaining(target)
  );
  const [isPaused, setIsPaused] = useState(!autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);
  
  // Keep refs updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);
  
  const pause = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);
  
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);
  
  const reset = useCallback(() => {
    setTimeRemaining(calculateTimeRemaining(target));
    setIsComplete(false);
    setIsPaused(!autoStart);
  }, [target, autoStart]);
  
  useEffect(() => {
    if (isPaused || isComplete) {
      return;
    }
    
    intervalRef.current = window.setInterval(() => {
      const remaining = calculateTimeRemaining(target);
      setTimeRemaining(remaining);
      onTickRef.current?.(remaining);
      
      if (remaining.total === 0) {
        setIsComplete(true);
        clearInterval(intervalRef.current);
        onCompleteRef.current?.();
      }
    }, 1000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isComplete, target]);
  
  const defaultLabels = {
    days: labels.days || 'd',
    hours: labels.hours || 'h',
    minutes: labels.minutes || 'm',
    seconds: labels.seconds || 's',
  };
  
  const renderProps: CountdownRenderProps = {
    ...timeRemaining,
    isPaused,
    isComplete,
    pause,
    resume,
    reset,
  };
  
  if (children) {
    return (
      <div
        className={`${styles.countdown} ${className || ''}`}
        style={{ aspectRatio: '1 / 1' }}
        aria-label={ariaLabel || 'Countdown timer'}
      >
        {children(renderProps)}
      </div>
    );
  }
  
  const formatParts = format.split('');
  
  return (
    <div
      className={`${styles.countdown} ${className || ''}`}
      style={{ aspectRatio: '1 / 1' }}
      role="timer"
      aria-label={ariaLabel || 'Countdown timer'}
    >
      <div className={styles.display}>
        {formatParts.includes('D') && (
          <div className={styles.unit}>
            <span className={styles.value}>{String(timeRemaining.days).padStart(2, '0')}</span>
            {showLabels && <span className={styles.label}>{defaultLabels.days}</span>}
          </div>
        )}
        {formatParts.includes('H') && (
          <div className={styles.unit}>
            <span className={styles.value}>{String(timeRemaining.hours).padStart(2, '0')}</span>
            {showLabels && <span className={styles.label}>{defaultLabels.hours}</span>}
          </div>
        )}
        {(formatParts.includes('M') || formatParts.includes('m')) && (
          <div className={styles.unit}>
            <span className={styles.value}>{String(timeRemaining.minutes).padStart(2, '0')}</span>
            {showLabels && <span className={styles.label}>{defaultLabels.minutes}</span>}
          </div>
        )}
        {(formatParts.includes('S') || formatParts.includes('s')) && (
          <div className={styles.unit}>
            <span className={styles.value}>{String(timeRemaining.seconds).padStart(2, '0')}</span>
            {showLabels && <span className={styles.label}>{defaultLabels.seconds}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
