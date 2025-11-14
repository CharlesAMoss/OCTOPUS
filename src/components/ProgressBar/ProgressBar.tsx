import { useEffect, useRef, useState } from 'react';
import styles from './ProgressBar.module.css';
import type { ProgressBarProps } from './types';

export function ProgressBar({
  value,
  max = 100,
  orientation = 'horizontal',
  variant = 'determinate',
  bufferValue,
  color,
  trackColor,
  showLabel = false,
  labelPosition = 'top-right',
  labelFormatter,
  segments,
  segmentSpacing = false,
  thickness = 'normal',
  message,
  messagePosition = 'bottom-left',
  messageAnimation = 'dots-wave',
  onChange,
  onComplete,
  onSegmentComplete,
  className,
  ariaLabel,
}: ProgressBarProps) {
  const prevValueRef = useRef(value);
  const prevSegmentRef = useRef(0);
  const [animationFrame, setAnimationFrame] = useState(0);
  
  // Message animation cycle
  useEffect(() => {
    if (!message || messageAnimation === 'none') return;
    
    const interval = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % 3);
    }, 500);
    
    return () => clearInterval(interval);
  }, [message, messageAnimation]);
  
  // Value change and completion tracking
  useEffect(() => {
    if (value !== prevValueRef.current) {
      onChange?.(value);
      
      if (value >= max && prevValueRef.current < max) {
        onComplete?.();
      }
      
      // Segment completion tracking
      if (segments && onSegmentComplete) {
        const currentSegment = Math.floor((value / max) * segments);
        const prevSegment = Math.floor((prevValueRef.current / max) * segments);
        
        if (currentSegment > prevSegment) {
          // Fire for each newly completed segment
          for (let i = prevSegment; i < currentSegment; i++) {
            onSegmentComplete(i);
          }
        }
      }
      
      prevValueRef.current = value;
    }
  }, [value, max, segments, onChange, onComplete, onSegmentComplete]);
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const bufferPercentage = bufferValue 
    ? Math.min(Math.max((bufferValue / max) * 100, 0), 100) 
    : undefined;
  
  const defaultLabel = labelFormatter 
    ? labelFormatter(value, max) 
    : `${Math.round(percentage)}%`;
  
  // Calculate thickness in pixels
  const getThickness = () => {
    if (typeof thickness === 'number') return thickness;
    const baseThickness = 40; // Increased from 8px to 40px
    switch (thickness) {
      case 'thin': return baseThickness / 2; // 20px
      case 'thick': return baseThickness * 1.5; // 60px
      default: return baseThickness; // 40px
    }
  };
  
  const thicknessPx = getThickness();
  
  // Animate message text
  const getAnimatedMessage = () => {
    if (!message) return '';
    
    switch (messageAnimation) {
      case 'dots-wave': {
        const patterns = [
          `... ${message} ...`,
          `... ... ${message} `,
          ` ${message} ... ...`,
        ];
        return patterns[animationFrame];
      }
      case 'dots-pulse': {
        const dots = '.'.repeat(animationFrame + 1);
        return `${message}${dots}`;
      }
      case 'ellipsis': {
        const dots = '.'.repeat(animationFrame + 1);
        return `${message}${dots}`;
      }
      default:
        return message;
    }
  };
  
  // Render segmented progress bar
  const renderSegmented = () => {
    if (!segments) return null;
    
    const filledSegments = Math.floor((percentage / 100) * segments);
    const partialFill = ((percentage / 100) * segments) % 1;
    
    return (
      <div className={styles.segments} data-spacing={segmentSpacing}>
        {Array.from({ length: segments }, (_, i) => {
          const isFilled = i < filledSegments;
          const isPartial = i === filledSegments && partialFill > 0;
          const fillPercentage = isFilled ? 100 : isPartial ? partialFill * 100 : 0;
          
          return (
            <div
              key={i}
              className={`${styles.segment} ${isFilled ? styles.segmentFilled : ''}`}
              style={{
                backgroundColor: trackColor,
              }}
            >
              <div
                className={styles.segmentFill}
                style={{
                  [orientation === 'horizontal' ? 'width' : 'height']: `${fillPercentage}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render continuous progress bar
  const renderContinuous = () => (
    <div className={styles.track} style={{ backgroundColor: trackColor }}>
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
  );
  
  return (
    <div
      className={`${styles.progressBar} ${styles[orientation]} ${styles[variant]} ${segments ? styles.segmented : ''} ${className || ''}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || 'Progress indicator'}
      style={{ 
        '--bar-thickness': `${thicknessPx}px`,
      } as React.CSSProperties}
    >
      <div className={styles.barContainer}>
        {showLabel && (
          <div 
            className={styles.label} 
            data-position={labelPosition}
          >
            {defaultLabel}
          </div>
        )}
        {segments ? renderSegmented() : renderContinuous()}
        {message && (
          <div 
            className={styles.message} 
            data-position={messagePosition}
          >
            {getAnimatedMessage()}
          </div>
        )}
      </div>
    </div>
  );
}
