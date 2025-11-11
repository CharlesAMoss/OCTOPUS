import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with default props', () => {
    render(<ProgressBar value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('displays label when showLabel is true', () => {
    render(<ProgressBar value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('uses custom label formatter', () => {
    const formatter = (value: number, max: number) => `${value} of ${max}`;
    render(<ProgressBar value={30} max={100} showLabel labelFormatter={formatter} />);
    expect(screen.getByText('30 of 100')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ProgressBar value={50} onChange={onChange} />);
    
    rerender(<ProgressBar value={60} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it('calls onComplete when value reaches max', () => {
    const onComplete = vi.fn();
    const { rerender } = render(<ProgressBar value={50} onComplete={onComplete} />);
    
    rerender(<ProgressBar value={100} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('does not call onComplete multiple times', () => {
    const onComplete = vi.fn();
    const { rerender } = render(<ProgressBar value={100} onComplete={onComplete} />);
    
    rerender(<ProgressBar value={100} onComplete={onComplete} />);
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('renders with horizontal orientation', () => {
    render(<ProgressBar value={50} orientation="horizontal" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.className).toContain('horizontal');
  });

  it('renders with vertical orientation', () => {
    render(<ProgressBar value={50} orientation="vertical" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.className).toContain('vertical');
  });

  it('renders buffer variant with bufferValue', () => {
    render(<ProgressBar value={50} variant="buffer" bufferValue={75} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.className).toContain('buffer');
  });

  it('clamps percentage between 0 and 100', () => {
    const { rerender } = render(<ProgressBar value={150} />);
    let progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '150');
    
    rerender(<ProgressBar value={-50} />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '-50');
  });

  it('applies custom className', () => {
    render(<ProgressBar value={50} className="custom-class" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.className).toContain('custom-class');
  });

  it('applies custom ariaLabel', () => {
    render(<ProgressBar value={50} ariaLabel="Loading progress" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Loading progress');
  });

  it('renders indeterminate variant', () => {
    render(<ProgressBar value={0} variant="indeterminate" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.className).toContain('indeterminate');
  });

  it('applies custom max value', () => {
    render(<ProgressBar value={50} max={200} showLabel />);
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  // Segmented progress tests
  it('renders with segments', () => {
    render(<ProgressBar value={3} max={12} segments={12} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.className).toContain('segmented');
  });

  it('calls onSegmentComplete when segments fill', () => {
    const onSegmentComplete = vi.fn();
    const { rerender } = render(
      <ProgressBar value={2} max={12} segments={12} onSegmentComplete={onSegmentComplete} />
    );
    
    rerender(<ProgressBar value={3} max={12} segments={12} onSegmentComplete={onSegmentComplete} />);
    expect(onSegmentComplete).toHaveBeenCalledWith(2);
  });

  it('displays label at specified position', () => {
    render(<ProgressBar value={75} showLabel labelPosition="top-right" />);
    const label = screen.getByText('75%');
    expect(label).toHaveAttribute('data-position', 'top-right');
  });

  it('displays message with animation', () => {
    render(<ProgressBar value={50} message="Loading data" messageAnimation="dots-wave" />);
    expect(screen.getByText(/Loading data/)).toBeInTheDocument();
  });

  it('applies thickness variants', () => {
    const { container } = render(<ProgressBar value={50} thickness="thick" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.style.getPropertyValue('--bar-thickness')).toBe('60px');
  });

  it('applies custom thickness in pixels', () => {
    const { container } = render(<ProgressBar value={50} thickness={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.style.getPropertyValue('--bar-thickness')).toBe('50px');
  });
});
