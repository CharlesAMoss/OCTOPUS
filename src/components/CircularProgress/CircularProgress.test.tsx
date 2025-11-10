import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircularProgress } from './CircularProgress';

describe('CircularProgress', () => {
  it('renders with default props', () => {
    render(<CircularProgress value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('applies aspect-ratio style', () => {
    render(<CircularProgress value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ aspectRatio: '1 / 1' });
  });

  it('displays label when showLabel is true', () => {
    render(<CircularProgress value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('uses custom label formatter', () => {
    const formatter = (value: number, max: number) => `${value}/${max}`;
    render(<CircularProgress value={30} max={100} showLabel labelFormatter={formatter} />);
    expect(screen.getByText('30/100')).toBeInTheDocument();
  });

  it('renders custom children content', () => {
    render(<CircularProgress value={50}><div>Custom</div></CircularProgress>);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    const { rerender } = render(<CircularProgress value={50} onChange={onChange} />);
    
    rerender(<CircularProgress value={60} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it('calls onComplete when value reaches max', () => {
    const onComplete = vi.fn();
    const { rerender } = render(<CircularProgress value={50} onComplete={onComplete} />);
    
    rerender(<CircularProgress value={100} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('renders SVG with correct size', () => {
    render(<CircularProgress value={50} size={150} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('width', '150');
    expect(svg).toHaveAttribute('height', '150');
  });

  it('applies custom className', () => {
    render(<CircularProgress value={50} className="custom-class" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.className).toContain('custom-class');
  });

  it('renders indeterminate variant', () => {
    render(<CircularProgress value={0} variant="indeterminate" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.className).toContain('indeterminate');
  });

  it('applies custom max value', () => {
    render(<CircularProgress value={50} max={200} showLabel />);
    expect(screen.getByText('25%')).toBeInTheDocument();
  });
});
