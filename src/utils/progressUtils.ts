/**
 * Progress calculation utilities
 */

/**
 * Calculate percentage from value and max
 */
export function calculatePercentage(value: number, max: number = 100): number {
  return Math.min(Math.max((value / max) * 100, 0), 100);
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if progress is complete
 */
export function isComplete(value: number, max: number = 100): boolean {
  return value >= max;
}

/**
 * Normalize value to be within valid range
 */
export function normalizeValue(value: number, min: number = 0, max: number = 100): number {
  return clamp(value, min, max);
}

/**
 * Calculate circular progress stroke offset
 */
export function calculateStrokeOffset(
  percentage: number,
  circumference: number
): number {
  return circumference - (percentage / 100) * circumference;
}

/**
 * Calculate circle circumference from radius
 */
export function calculateCircumference(radius: number): number {
  return 2 * Math.PI * radius;
}
