import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Countdown } from './Countdown';

describe('Countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with default props', () => {
    const futureDate = new Date(Date.now() + 60000); // 1 minute from now
    render(<Countdown targetDate={futureDate} />);
    const timer = screen.getByRole('timer');
    expect(timer).toBeInTheDocument();
  });

  it('applies aspect-ratio style', () => {
    const futureDate = new Date(Date.now() + 60000);
    render(<Countdown targetDate={futureDate} />);
    const timer = screen.getByRole('timer');
    expect(timer).toHaveStyle({ aspectRatio: '1 / 1' });
  });

  it('displays time remaining correctly', () => {
    const futureDate = new Date(Date.now() + 125000); // 2:05 from now
    render(<Countdown targetDate={futureDate} />);
    
    expect(screen.getByText('02')).toBeInTheDocument(); // minutes
    expect(screen.getByText('05')).toBeInTheDocument(); // seconds
  });

  it('shows labels when showLabels is true', () => {
    const futureDate = new Date(Date.now() + 125000);
    render(<Countdown targetDate={futureDate} showLabels />);
    
    expect(screen.getByText('m')).toBeInTheDocument();
    expect(screen.getByText('s')).toBeInTheDocument();
  });

  it('uses custom labels', () => {
    const futureDate = new Date(Date.now() + 125000);
    render(
      <Countdown 
        targetDate={futureDate} 
        showLabels 
        labels={{ minutes: 'min', seconds: 'sec' }}
      />
    );
    
    expect(screen.getByText('min')).toBeInTheDocument();
    expect(screen.getByText('sec')).toBeInTheDocument();
  });

  it('calls onTick callback every second', () => {
    const onTick = vi.fn();
    const futureDate = new Date(Date.now() + 5000);
    render(<Countdown targetDate={futureDate} onTick={onTick} />);
    
    vi.advanceTimersByTime(1000);
    expect(onTick).toHaveBeenCalled();
  });

  it('calls onComplete when countdown reaches zero', () => {
    const onComplete = vi.fn();
    const futureDate = new Date(Date.now() + 2000);
    render(<Countdown targetDate={futureDate} onComplete={onComplete} />);
    
    vi.advanceTimersByTime(3000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('respects autoStart=false', () => {
    const onTick = vi.fn();
    const futureDate = new Date(Date.now() + 5000);
    render(<Countdown targetDate={futureDate} autoStart={false} onTick={onTick} />);
    
    vi.advanceTimersByTime(1000);
    expect(onTick).not.toHaveBeenCalled();
  });

  it('renders custom children function', () => {
    const futureDate = new Date(Date.now() + 60000);
    render(
      <Countdown targetDate={futureDate}>
        {({ minutes, seconds }) => (
          <div>Custom: {minutes}:{seconds}</div>
        )}
      </Countdown>
    );
    
    expect(screen.getByText(/Custom:/)).toBeInTheDocument();
  });

  it('formats time correctly with different format strings', () => {
    const futureDate = new Date(Date.now() + 90061000); // 1 day, 1 hour, 1 minute, 1 second
    render(<Countdown targetDate={futureDate} format="DHms" showLabels />);
    
    expect(screen.getByText('d')).toBeInTheDocument();
    expect(screen.getByText('h')).toBeInTheDocument();
    expect(screen.getByText('m')).toBeInTheDocument();
    expect(screen.getByText('s')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const futureDate = new Date(Date.now() + 60000);
    render(<Countdown targetDate={futureDate} className="custom-class" />);
    const timer = screen.getByRole('timer');
    expect(timer.className).toContain('custom-class');
  });
});
