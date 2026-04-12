import { Organism, EnvironmentState, Coordinate } from './types';

export class PhysicsEngine {
  constructor(private environment: EnvironmentState) {}

  public updateEnvironment(newEnvironment: EnvironmentState): void {
    this.environment = newEnvironment;
  }

  public updateOrganism(organism: Organism, others: Organism[]): void {
    if (!organism.state.isAlive) return;

    // Basic metabolism: energy decreases over time
    const metabolismCost = organism.genome.metabolism;
    organism.state.energy -= metabolismCost;

    // Check for death
    if (organism.state.energy <= 0) {
      organism.state.isAlive = false;
    }

    // Age increases
    organism.state.age += 1;

    // Simple Sensory Logic (Placeholder for expansion)
    // Check distance to other organisms
    for (const other of others) {
      if (other.id === organism.id || !other.state.isAlive) continue;

      const dx = organism.position.x - other.position.x;
      const dy = organism.position.y - other.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= organism.genome.sensingRange) {
        // Potential interaction (e.g., eating, collision) - to be implemented
      }
    }
  }

  public getEnvironment(): EnvironmentState {
    return this.environment;
  }
}
