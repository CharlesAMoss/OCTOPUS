import React from 'react';
import { ProgressBar, CircularProgress, Countdown } from '../src';
import '../src/themes/default.css';
import './demo.css';

export function App() {
  const [progress, setProgress] = React.useState(0);
  const targetDate = React.useMemo(() => new Date(Date.now() + 300000), []); // 5 minutes from now

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="demo-container">
      <h1>Octopus Progress Components Demo</h1>
      
      <section className="demo-section">
        <h2>Progress Bar - Horizontal</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Determinate</h3>
            <ProgressBar value={progress} max={100} showLabel />
            <p>Value: {progress}%</p>
          </div>
          
          <div className="demo-item">
            <h3>Indeterminate</h3>
            <ProgressBar value={progress} max={100} variant="indeterminate" />
          </div>
          
          <div className="demo-item">
            <h3>With Buffer</h3>
            <ProgressBar value={progress * 0.7} bufferValue={progress} max={100} variant="buffer" />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Progress Bar - Vertical</h2>
        <div className="demo-grid">
          <div className="demo-item vertical">
            <h3>Determinate</h3>
            <ProgressBar value={progress} max={100} orientation="vertical" showLabel />
          </div>
          
          <div className="demo-item vertical">
            <h3>Indeterminate</h3>
            <ProgressBar value={progress} max={100} orientation="vertical" variant="indeterminate" />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Circular Progress</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Determinate</h3>
            <CircularProgress value={progress} max={100} size={120} strokeWidth={8}>
              <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fontSize="24" fill="currentColor">
                {progress}%
              </text>
            </CircularProgress>
          </div>
          
          <div className="demo-item">
            <h3>Indeterminate</h3>
            <CircularProgress value={progress} max={100} size={120} strokeWidth={8} variant="indeterminate" />
          </div>
          
          <div className="demo-item">
            <h3>Counter-clockwise</h3>
            <CircularProgress 
              value={progress} 
              max={100} 
              size={120} 
              strokeWidth={8}
              direction="counter-clockwise"
            >
              <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fontSize="24" fill="currentColor">
                {progress}%
              </text>
            </CircularProgress>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Countdown Timer</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Default Render</h3>
            <Countdown targetDate={targetDate} showLabels />
          </div>
          
          <div className="demo-item">
            <h3>Custom Render</h3>
            <Countdown targetDate={targetDate}>
              {({ days, hours, minutes, seconds, isPaused, isComplete }) => (
                <div className="custom-countdown">
                  <div className="time-display">
                    <div className="time-unit">
                      <span className="time-value">{String(minutes).padStart(2, '0')}</span>
                      <span className="time-label">min</span>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-unit">
                      <span className="time-value">{String(seconds).padStart(2, '0')}</span>
                      <span className="time-label">sec</span>
                    </div>
                  </div>
                  <p>{isPaused ? 'Paused' : isComplete ? 'Complete!' : 'Running'}</p>
                </div>
              )}
            </Countdown>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Grid Layout (aspect-ratio: 1/1)</h2>
        <div className="demo-grid-square">
          <div className="grid-cell">
            <ProgressBar value={progress} max={100} />
          </div>
          <div className="grid-cell">
            <CircularProgress value={progress} max={100} size={100} strokeWidth={8} />
          </div>
          <div className="grid-cell">
            <ProgressBar value={progress} max={100} orientation="vertical" />
          </div>
          <div className="grid-cell">
            <Countdown targetDate={targetDate} />
          </div>
        </div>
      </section>
    </div>
  );
}
