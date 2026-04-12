import { PhysicsEngine } from './physics';
import { Organism, EnvironmentState } from '../../core/src/types';
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
    
    engine.updateOrganism(organism, []);
    
    expect(organism.state.energy).toBe(9);
    expect(organism.state.age).toBe(1);
  });

  it('should mark organism as dead when energy reaches zero', () => {
    const engine = new PhysicsEngine(initialEnv);
    const organism = createTestOrganism('org-1');
    organism.state.energy = 1; // One tick left
    
    engine.updateOrganism(organism, []);
    
    expect(organism.state.energy).toBe(0);
    expect(organism.state.isAlive).toBe(false);
  });

  it('should handle sensory interaction placeholder', () => {
    const engine = new PhysicsEngine(initialEnv);
    const org1 = createTestOrganism('org-1');
    const org2 = createTestOrganism('org-2');
    org2.position = { x: 0.5, y: 0.5 }; // Within range of org1 (sensingRange is 1)
    
    engine.updateOrganism(org1, [org2]);
    
    // If it doesn't crash, the loop ran
    expect(org1.state.isAlive).toBe(true);
  });
});
