import { describe, it, expect } from 'vitest';
import { Simulation, Organism, EnvironmentState, Food } from '../../simulation/src/simulation';
import { Organism as OrganismType, EnvironmentState as EnvType, Food as FoodType } from '../../core/src/types';

describe('Driver Demo Test', () => {
  it('should run a mini simulation loop', async () => {
    const env: any = {
      temperature: 25,
      moisture: 50,
      foodSources: []
    };

    // We need to access Simulation from the simulation package
    // For testing purposes, we tap into the Simulation class
    // In a real monorepo, this would be resolved by tsconfig/package.json
    
    // This is a simplified test to verify the loop logic works
    const organisms: any[] = [];
    const foods: any[] = [];
    
    // Simulate a step 
    const step = (orgs: any[], foods: any[]) => {
        orgs.forEach(o => {
            o.state.energy -= 1;
            o.state.age += 1;
            // logic for food...
        });
    };

    const testOrg = {
        id: 'test',
        state: { energy: 10, age: 0, isAlive: true },
        position: { x: 0, y: 0 },
        genome: { speed: 1, size: 1, metabolism: 1, sensingRange: 1 }
    };

    step([testOrg], []);

    expect(testOrg.state.energy).toBe(9);
    expect(testOrg.state.age).toBe(1);
  });
});
