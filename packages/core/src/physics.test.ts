import { PhysicsEngine } from './physics';
import { Organism, EnvironmentState, Food } from '../../core/src/types';
import { describe, it, expect } from 'vitest';

describe('PhysicsEngine', () => {
  const initialEnv: EnvironmentState = {
    temperature: 25,
    moisture: 50,
    foodSources: []
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
    
    engine.updateOrganism(organism, [], []);
    
    expect(organism.state.energy).toBe(9);
    expect(organism.state.age).toBe(1);
  });

  it('should mark organism as dead when energy reaches zero', () => {
    const engine = new PhysicsEngine(initialEnv);
    const organism = createTestOrganism('org-1');
    organism.state.energy = 1;
    
    engine.updateOrganism(organism, [], []);
    
    expect(organism.state.energy).toBe(0);
    expect(organism.state.isAlive).toBe(false);
  });

  it('should consume food when within range', () => {
    const engine = new PhysicsEngine(initialEnv);
    const organism = createTestOrganism('org-1');
    const food: Food = {
      id: 'food-1',
      position: { x: 0.1, y: 0.1 },
      energyValue: 5
    };
    
    engine.updateOrganism(organism, [], [food]);
    
    expect(organism.state.energy).toBe(14); // 10 - 1 (metabolism) + 5 (food)
  });

  it('should move the organism based on speed', () => {
    const engine = new PhysicsEngine(initialEnv);
    const organism = createTestOrganism('org-1');
    const startX = organism.position.x;
    const startY = organism.position.y;
    
    engine.updateOrganism(organism, [], []);
    
    expect(organism.position.x).not.toBe(startX);
    expect(organism.position.y).not.toBe(startY);
  });
});
