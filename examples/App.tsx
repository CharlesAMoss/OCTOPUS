import React from 'react';
import { ProgressBar, CircularProgress, Countdown } from '../src';
import './demo.css';

export function App() {
  const [progress, setProgress] = React.useState(0);
  const [months, setMonths] = React.useState(3); // For 12-segment demo
  const [eqLevels, setEqLevels] = React.useState(Array(20).fill(0).map(() => Math.random() * 100));
  const [theme, setTheme] = React.useState('default');
  const targetDate = React.useMemo(() => new Date(Date.now() + 300000), []); // 5 minutes from now

  // Load theme dynamically
  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        await import(`../src/themes/${theme}.css`);
        // Update body data-theme attribute for theme-specific styling
        document.body.setAttribute('data-theme', theme);
      } catch (error) {
        console.error(`Failed to load theme: ${theme}`, error);
      }
    };
    loadTheme();
  }, [theme]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      setMonths((prev) => (prev >= 12 ? 0 : prev + 0.1));
      // Randomize equalizer levels
      setEqLevels(prev => prev.map(() => Math.random() * 100));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="demo-container">
      <h1>Octopus Progress Components Demo</h1>
      
      {/* Theme Selector */}
      <div className="theme-selector">
        <label htmlFor="theme-select">Theme:</label>
        <select 
          id="theme-select"
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
          className="theme-dropdown"
        >
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="ocean">Ocean</option>
          <option value="sunset">Sunset</option>
          <option value="forest">Forest</option>
          <option value="neon">Neon</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>
      
      {/* NEW: Segmented Progress Bars */}
      <section className="demo-section">
        <h2>Segmented Progress Bars</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>12 Segments (Months)</h3>
            <ProgressBar 
              value={months} 
              max={12} 
              segments={12}
              thickness="thick"
              showLabel
              labelPosition="top-right"
              message="Loading yearly data"
              onSegmentComplete={(idx) => console.log(`Month ${idx + 1} complete!`)}
            />
            <p>Completed: {Math.floor(months)} / 12 months</p>
          </div>
          
          <div className="demo-item">
            <h3>4 Segments with Spacing</h3>
            <ProgressBar 
              value={progress} 
              max={100} 
              segments={4}
              segmentSpacing={true}
              thickness="thick"
              color="#10b981"
              trackColor="#f3f4f6"
              showLabel
              labelPosition="bottom-center"
            />
          </div>
          
          <div className="demo-item">
            <h3>Vertical Segments</h3>
            <ProgressBar 
              value={progress} 
              max={100} 
              segments={8}
              segmentSpacing={true}
              orientation="vertical"
              thickness={20}
              color="#f59e0b"
            />
          </div>
        </div>
      </section>
      
      {/* Label Positioning Examples */}
      <section className="demo-section">
        <h2>Label & Message Positioning</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Label Positions</h3>
            <ProgressBar 
              value={progress} 
              max={100}
              thickness="thick"
              showLabel
              labelPosition="top-left"
              message="Top-left label"
              messagePosition="bottom-right"
              messageAnimation="ellipsis"
            />
          </div>
          
          <div className="demo-item">
            <h3>Center Label</h3>
            <ProgressBar 
              value={progress} 
              max={100}
              thickness={24}
              showLabel
              labelPosition="center"
              color="#8b5cf6"
            />
          </div>
          
          <div className="demo-item">
            <h3>Message Animations</h3>
            <ProgressBar 
              value={progress} 
              max={100}
              thickness="thick"
              showLabel
              labelPosition="top-center"
              message="uploading files"
              messagePosition="bottom-center"
              messageAnimation="dots-wave"
            />
          </div>
        </div>
      </section>

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
        <h2>Graphic Equalizer (Vertical Bars)</h2>
        <div className="equalizer-container">
          {eqLevels.map((level, idx) => (
            <div key={idx} className="equalizer-bar">
              <ProgressBar 
                value={level} 
                max={100} 
                orientation="vertical"
                thickness={16}
                segments={10}
                segmentSpacing={true}
                color={`hsl(${120 + idx * 8}, 70%, 50%)`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="demo-section">
        <h2>Circular Progress</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>With showLabel</h3>
            <CircularProgress value={progress} max={100} size={120} strokeWidth={16} showLabel />
          </div>
          
          <div className="demo-item">
            <h3>Custom Center Content</h3>
            <CircularProgress value={progress} max={100} size={120} strokeWidth={16}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
                  {progress}%
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Complete
                </div>
              </div>
            </CircularProgress>
          </div>
          
          <div className="demo-item">
            <h3>Indeterminate</h3>
            <CircularProgress value={progress} max={100} size={120} strokeWidth={16} variant="indeterminate" />
          </div>
          
          <div className="demo-item">
            <h3>Counter-clockwise</h3>
            <CircularProgress 
              value={progress} 
              max={100} 
              size={120} 
              strokeWidth={16}
              direction="counter-clockwise"
              showLabel
            />
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
