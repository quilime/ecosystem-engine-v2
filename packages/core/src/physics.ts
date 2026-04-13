import { Organism, EnvironmentState, Food } from "./types";

export class PhysicsEngine {
  constructor(private environment: EnvironmentState) {}

  public updateEnvironment(newEnvironment: EnvironmentState): void {
    this.environment = newEnvironment;
  }

  public updateOrganism(
    organism: Organism,
    others: Organism[],
    foods: Food[],
  ): void {
    if (!organism.state.isAlive) return;

    // 1. Metabolism
    const metabolismCost = organism.genome.metabolism;
    organism.state.energy -= metabolismCost;

    // 2. Death check
    if (organism.state.energy <= 0) {
      organism.state.isAlive = false;
      return;
    }

    // 3. Age
    organism.state.age += 1;

    // 4. Movement (Simple random wander based on speed)
    const dx = (Math.random() * 2 - 1) * organism.genome.speed;
    const dy = (Math.random() * 2 - 1) * organism.genome.speed;
    organism.position.x += dx;
    organism.position.y += dy;

    for (let i = foods.length - 1; i >= 0; i--) {
      const food = foods[i];
      const distDx = organism.position.x - food.position.x;
      const distDy = organism.position.y - food.position.y;
      const distance = Math.sqrt(distDx * distDx + distDy * distDy);

      if (distance <= organism.genome.size) {
        organism.state.energy += food.energyValue;
        foods.splice(i, 1);
      }
    }

    // 6. Simple Sensory/Interaction Logic
    for (const other of others) {
      if (other.id === organism.id || !other.state.isAlive) continue;

      const distDx = organism.position.x - other.position.x;
      const distDy = organism.position.y - other.position.y;
      const distance = Math.sqrt(distDx * distDx + distDy * distDy);

      if (distance <= organism.genome.sensingRange) {
        // Predation: If organism is substantially larger and has energy, it eats the other
        if (
          distance <= organism.genome.size &&
          other.genome.size < organism.genome.size &&
          organism.state.energy > 10
        ) {
          organism.state.energy += other.state.energy * 0.5;
          other.state.isAlive = false;
        } else if (
          distance <= organism.genome.size &&
          other.genome.size >= organism.genome.size
        ) {
          // Collision impact: both lose energy
          organism.state.energy -= 1;
          other.state.energy -= 1;
        }
      }
    }
  }

  public getEnvironment(): EnvironmentState {
    return this.environment;
  }
}
