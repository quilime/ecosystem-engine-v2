import { Organism, EnvironmentState, Coordinate } from '../../core/src/types';
import { PhysicsEngine } from '../../core/src/physics';

export class Simulation {
  private organisms: Map<string, Organism> = new Map();
  private physicsEngine: PhysicsEngine;
  private environment: EnvironmentState;

  constructor(initialEnvironment: EnvironmentState) {
    this.environment = initialEnvironment;
    this.physicsEngine = new PhysicsEngine(initialEnvironment);
  }

  public addOrganism(organism: Organism): void {
    this.organisms.set(organism.id, organism);
  }

  public step(): void {
    // Update environment (as a placeholder for logic)
    this.physicsEngine.updateEnvironment(this.environment);

    // Update all organisms
    for (const organism of this.organisms.values()) {
      this.physicsEngine.updateOrganism(organism);
      
      // Remove dead organisms
      if (!organism.state.isAlive) {
        // In a real implementation, we'd handle cleanup more carefully
      }
    }

    // Cleanup dead organisms from the map
    for (const [id, organism] of this.organisms.entries()) {
      if (!organism.state.isAlive) {
        this.organisms.delete(id);
      }
    }
  }

  public getOrganisms(): Organism[] {
    return Array.from(this.organisms.values());
  }

  public getEnvironment(): EnvironmentState {
    return this.environment;
  }

  public setEnvironment(env: EnvironmentState): void {
    this.environment = env;
  }
}
