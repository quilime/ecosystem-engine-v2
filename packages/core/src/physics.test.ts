import { PhysicsEngine } from './physics';
import { Organism, EnvironmentState } from './types';
import { describe, it, expect } from 'vitest';

describe('PhysicsEngine', () => {
  const initialEnv: EnvironmentState = {
    temperature: 25,
    moisture: 50
  };

  const createTestOrganism = (id: string): Organism => ({
    id,
    position: { x: 0, y: 0 },
    genome: {
      speed: 1,
      size: 1,
      metabolism: 1,
      sensingRange: 1
    },
    state: {
      energy: 10,
      age: 0,
      isAlive: true
    }
  });

  it('should decrease energy based on metabolism', () => {
    const engine = new PhysicsEngine(initialEnv);
    const organism = createTestOrganism('org-1');
    
    engine.updateOrganism(organism);
    
    expect(organism.state.energy).toBe(9);
    expect(organism.state.age).toBe(1);
  });

  it('should mark organism as dead when energy reaches zero', () => {
    const engine = new PhysicsEngine(initialEnv);
    const organism = createTestOrganism('org-1');
    organism.state.energy = 1; // One tick left
    
    engine.updateOrganism(organism);
    
    expect(organism.state.energy).toBe(0);
    expect(organism.state.isAlive).toBe(false);
  });

  it('should allow updating environment', () => {
    const engine = new PhysicsEngine(initialEnv);
    const newEnv: EnvironmentState = { temperature: 30, moisture: 40 };
    
    engine.updateEnvironment(newEnv);
    
    expect(engine.getEnvironment().temperature).toBe(30);
    expect(engine.getEnvironment().moisture).toBe(40);
  });
});
