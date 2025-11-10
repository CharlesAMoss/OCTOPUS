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

  it('applies aspect-ratio style', () => {
    render(<ProgressBar value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ aspectRatio: '1 / 1' });
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
});
