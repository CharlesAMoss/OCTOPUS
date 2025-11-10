/**
 * Time formatting utilities
 */

export interface TimeComponents {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Format milliseconds into time components
 */
export function formatMilliseconds(ms: number): TimeComponents {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return { days, hours, minutes, seconds };
}

/**
 * Pad a number with leading zeros
 */
export function padZero(num: number, length: number = 2): string {
  return String(num).padStart(length, '0');
}

/**
 * Format time components to string
 */
export function formatTime(
  components: TimeComponents,
  format: string = 'HH:mm:ss'
): string {
  const { days, hours, minutes, seconds } = components;
  
  return format
    .replace('DD', padZero(days))
    .replace('D', String(days))
    .replace('HH', padZero(hours))
    .replace('H', String(hours))
    .replace('mm', padZero(minutes))
    .replace('m', String(minutes))
    .replace('ss', padZero(seconds))
    .replace('s', String(seconds));
}

/**
 * Calculate time difference between two dates
 */
export function getTimeDifference(target: Date, current: Date = new Date()): number {
  return Math.max(0, target.getTime() - current.getTime());
}
