/**
 * Component Registry for CROW grid integration
 * Allows registration of custom components for use in grid cells
 */
import type React from 'react';

type ComponentType = React.ComponentType<any>;

class ComponentRegistryClass {
  private components: Map<string, ComponentType> = new Map();

  /**
   * Register a component with a marker string
   * @param marker - The marker string (e.g., '__PROGRESS__')
   * @param component - The React component to register
   */
  register(marker: string, component: ComponentType): void {
    this.components.set(marker, component);
  }

  /**
   * Unregister a component
   * @param marker - The marker string to unregister
   */
  unregister(marker: string): void {
    this.components.delete(marker);
  }

  /**
   * Get a component by marker string
   * @param marker - The marker string
   * @returns The registered component or undefined
   */
  get(marker: string): ComponentType | undefined {
    return this.components.get(marker);
  }

  /**
   * Check if a marker is registered
   * @param marker - The marker string to check
   */
  has(marker: string): boolean {
    return this.components.has(marker);
  }

  /**
   * Get all registered markers
   */
  getMarkers(): string[] {
    return Array.from(this.components.keys());
  }

  /**
   * Clear all registered components
   */
  clear(): void {
    this.components.clear();
  }
}

export const ComponentRegistry = new ComponentRegistryClass();
