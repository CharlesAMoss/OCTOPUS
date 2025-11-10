import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentRegistry } from './ComponentRegistry';

// Mock component
const MockComponent = () => null;
const AnotherComponent = () => null;

describe('ComponentRegistry', () => {
  beforeEach(() => {
    ComponentRegistry.clear();
  });

  it('registers a component', () => {
    ComponentRegistry.register('__TEST__', MockComponent);
    expect(ComponentRegistry.has('__TEST__')).toBe(true);
  });

  it('retrieves a registered component', () => {
    ComponentRegistry.register('__TEST__', MockComponent);
    const retrieved = ComponentRegistry.get('__TEST__');
    expect(retrieved).toBe(MockComponent);
  });

  it('returns undefined for unregistered marker', () => {
    const retrieved = ComponentRegistry.get('__NONEXISTENT__');
    expect(retrieved).toBeUndefined();
  });

  it('unregisters a component', () => {
    ComponentRegistry.register('__TEST__', MockComponent);
    ComponentRegistry.unregister('__TEST__');
    expect(ComponentRegistry.has('__TEST__')).toBe(false);
  });

  it('gets all registered markers', () => {
    ComponentRegistry.register('__TEST1__', MockComponent);
    ComponentRegistry.register('__TEST2__', AnotherComponent);
    const markers = ComponentRegistry.getMarkers();
    expect(markers).toEqual(['__TEST1__', '__TEST2__']);
  });

  it('clears all components', () => {
    ComponentRegistry.register('__TEST1__', MockComponent);
    ComponentRegistry.register('__TEST2__', AnotherComponent);
    ComponentRegistry.clear();
    expect(ComponentRegistry.getMarkers()).toEqual([]);
  });

  it('overwrites existing registration', () => {
    ComponentRegistry.register('__TEST__', MockComponent);
    ComponentRegistry.register('__TEST__', AnotherComponent);
    const retrieved = ComponentRegistry.get('__TEST__');
    expect(retrieved).toBe(AnotherComponent);
  });
});
