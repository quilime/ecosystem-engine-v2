import { Simulation } from './simulation';
import { Organism, EnvironmentState } from '../../core/src/types';
import { describe, it, expect } from 'vitest';

describe('Simulation', () => {
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

  it('should add and step through organisms', () => {
    const sim = new Simulation(initialEnv);
    const org = createTestOrganism('org-1');
    
    sim.addOrganism(org);
    expect(sim.getOrganisms()).toHaveLength(1);
    
    sim.step();
    
    expect(sim.getOrganisms()).toHaveLength(1);
    expect(org.state.energy).toBe(9);
    expect(org.state.age).toBe(1);
  });

  it('should remove dead organisms after a step', () => {
    const sim = new Simulation(initialEnv);
    const org = createTestOrganism('org-dead');
    org.state.energy = 1; // Will die on next step
    
    sim.addOrganism(org);
    sim.step();
    
    expect(sim.getOrganisms()).toHaveLength(0);
  });
});
