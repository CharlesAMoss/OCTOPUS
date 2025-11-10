import { ComponentRegistry, ProgressBar, CircularProgress, Countdown } from '@octopus/progress';
import '@octopus/progress/themes/default.css';

// Register Octopus components for CROW grid
ComponentRegistry.register('__PROGRESS__', ProgressBar);
ComponentRegistry.register('__CIRCULAR__', CircularProgress);
ComponentRegistry.register('__COUNTDOWN__', Countdown);

// Example grid data using Octopus components
export const gridDataWithProgress = [
  {
    id: 1,
    name: 'Task Progress',
    imageUrl: '__PROGRESS__',
    value: 75,
    showLabel: true,
  },
  {
    id: 2,
    name: 'Circular Status',
    imageUrl: '__CIRCULAR__',
    value: 60,
    size: 80,
    showLabel: true,
    color: '#10b981',
  },
  {
    id: 3,
    name: 'Deadline',
    imageUrl: '__COUNTDOWN__',
    targetDate: '2025-12-31T23:59:59',
    showLabels: true,
  },
  {
    id: 4,
    name: 'Loading State',
    imageUrl: '__PROGRESS__',
    value: 0,
    variant: 'indeterminate',
  },
  {
    id: 5,
    name: 'Upload Progress',
    imageUrl: '__PROGRESS__',
    value: 45,
    variant: 'buffer',
    bufferValue: 70,
    showLabel: true,
  },
];

// Example of using with CROW grid cell renderer
export function renderProgressCell(item: any) {
  const Component = ComponentRegistry.get(item.imageUrl);
  
  if (!Component) {
    return <div>{item.name}</div>;
  }
  
  return <Component {...item} />;
}
