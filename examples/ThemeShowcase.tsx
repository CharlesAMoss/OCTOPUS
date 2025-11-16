import React from 'react';
import { ProgressBar, CircularProgress } from '../src';
import '../src/themes/default.css';
import './theme-showcase.css';

const themes = [
  { name: 'Default', file: 'default.css' },
  { name: 'Dark', file: 'dark.css' },
  { name: 'Ocean', file: 'ocean.css' },
  { name: 'Sunset', file: 'sunset.css' },
  { name: 'Forest', file: 'forest.css' },
  { name: 'Neon', file: 'neon.css' },
];

export function ThemeShowcase() {
  const [progress, setProgress] = React.useState(65);

  return (
    <div className="theme-showcase">
      <h1>Octopus Theme Gallery</h1>
      <p className="subtitle">Preview all available color themes</p>

      <div className="themes-grid">
        {themes.map((theme) => (
          <div key={theme.name} className="theme-card">
            <h2>{theme.name}</h2>
            <div className="theme-preview" data-theme={theme.name.toLowerCase()}>
              <div className="component-group">
                <ProgressBar 
                  value={progress} 
                  showLabel 
                  thickness="thick"
                />
                <ProgressBar 
                  value={45} 
                  segments={8}
                  segmentSpacing
                  thickness="thick"
                  message="Loading"
                  messageAnimation="dots-wave"
                />
                <div className="circular-group">
                  <CircularProgress 
                    value={progress} 
                    size={80} 
                    strokeWidth={12} 
                    showLabel 
                  />
                </div>
              </div>
            </div>
            <code className="import-code">
              import '@octopus/progress/themes/{theme.file}';
            </code>
          </div>
        ))}
      </div>

      <div className="controls">
        <label>
          Progress: {progress}%
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
