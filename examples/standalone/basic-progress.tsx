import { ProgressBar, CircularProgress } from '@octopus/progress';
import '@octopus/progress/themes/default.css';

export function BasicProgressExample() {
  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      {/* Basic horizontal progress bar */}
      <div style={{ width: 200 }}>
        <h3>Horizontal Progress</h3>
        <ProgressBar value={75} showLabel />
      </div>

      {/* Vertical progress bar */}
      <div style={{ height: 200 }}>
        <h3>Vertical Progress</h3>
        <ProgressBar value={60} orientation="vertical" showLabel />
      </div>

      {/* Circular progress */}
      <div>
        <h3>Circular Progress</h3>
        <CircularProgress value={80} size={120} showLabel color="#10b981" />
      </div>

      {/* Buffer variant */}
      <div style={{ width: 200 }}>
        <h3>Buffer Progress</h3>
        <ProgressBar value={50} variant="buffer" bufferValue={75} />
      </div>

      {/* Indeterminate loading */}
      <div style={{ width: 200 }}>
        <h3>Loading...</h3>
        <ProgressBar value={0} variant="indeterminate" />
      </div>
    </div>
  );
}
