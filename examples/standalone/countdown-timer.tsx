import { Countdown } from '@octopus/progress';
import '@octopus/progress/themes/default.css';

export function CountdownExample() {
  const newYear = new Date('2026-01-01T00:00:00');
  const oneHourFromNow = new Date(Date.now() + 3600000);

  return (
    <div style={{ padding: 20 }}>
      {/* Basic countdown */}
      <div style={{ marginBottom: 40 }}>
        <h3>Countdown to New Year</h3>
        <Countdown 
          targetDate={newYear} 
          showLabels 
          onComplete={() => alert('Happy New Year!')}
        />
      </div>

      {/* Countdown with custom labels */}
      <div style={{ marginBottom: 40 }}>
        <h3>Custom Labels</h3>
        <Countdown 
          targetDate={newYear}
          showLabels
          labels={{ days: 'days', hours: 'hours', minutes: 'mins', seconds: 'secs' }}
        />
      </div>

      {/* Countdown with custom render */}
      <div style={{ marginBottom: 40 }}>
        <h3>Custom Render with Controls</h3>
        <Countdown targetDate={oneHourFromNow}>
          {({ days, hours, minutes, seconds, isPaused, pause, resume, reset }) => (
            <div>
              <div style={{ fontSize: 32, marginBottom: 10 }}>
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={isPaused ? resume : pause}>
                  {isPaused ? '▶ Resume' : '⏸ Pause'}
                </button>
                <button onClick={reset}>🔄 Reset</button>
              </div>
            </div>
          )}
        </Countdown>
      </div>

      {/* Time-only countdown */}
      <div>
        <h3>Hours and Minutes Only</h3>
        <Countdown 
          targetDate={oneHourFromNow}
          format="Hms"
          showLabels
        />
      </div>
    </div>
  );
}
