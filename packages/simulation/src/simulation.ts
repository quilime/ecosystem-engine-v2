import { Organism, EnvironmentState, Food } from "../../core/src/types";
import { PhysicsEngine } from "../../core/src/physics";
import { GenomeEngine } from "../../core/src/genome";

export class Simulation {
  private organisms: Map<string, Organism> = new Map();
  private foods: Food[] = [];
  private physicsEngine: PhysicsEngine;
  private genomeEngine: GenomeEngine;
  private environment: EnvironmentState;
  private history: { organisms: number; foods: number }[] = [];

  constructor(initialEnvironment: EnvironmentState) {
    this.environment = initialEnvironment;
    this.physicsEngine = new PhysicsEngine(initialEnvironment);
    this.genomeEngine = new GenomeEngine();
  }

  public addOrganism(organism: Organism): void {
    this.organisms.set(organism.id, organism);
  }

  public spawnFood(food: Food): void {
    this.foods.push(food);
  }

  public step(): void {
    // 1. Update Environment
    this.physicsEngine.updateEnvironment(this.environment);

    const organismList = Array.from(this.organisms.values());

    // 2. Update Organisms (Physics, Movement, Consumption)
    for (const organism of organismList) {
      this.physicsEngine.updateOrganism(organism, organismList, this.foods);
    }

    // 3. Handle Death and Cleanup
    for (const [id, organism] of this.organisms.entries()) {
      if (!organism.state.isAlive) {
        this.organisms.delete(id);
      }
    }

    // 4. Handle Reproduction (Placeholder logic)
    // In a real simulation, we'd check energy thresholds or age for reproduction
    this.handleReproduction();
  }

  private handleReproduction(): void {
    // Simple reproduction: if organism has high energy, it can create an offspring
    const newOrganisms: Organism[] = [];

    for (const organism of this.organisms.values()) {
      if (organism.state.isAlive && organism.state.energy > 20) {
        organism.state.energy -= 10; // Cost of reproduction

        const offspringGenome = this.genomeEngine.mutate(organism.genome);
        const offspring: Organism = {
          id: `org-${Math.random().toString(36).substr(2, 9)}`,
          position: { ...organism.position },
          genome: offspringGenome,
          state: {
            energy: 10,
            age: 0,
            isAlive: true,
          },
        };
        newOrganisms.push(offspring);
      }
    }

    for (const offspring of newOrganisms) {
      this.addOrganism(offspring);
    }
  }

  public getOrganisms(): Organism[] {
    return Array.from(this.organisms.values());
  }

  public getFoods(): Food[] {
    return this.foods;
  }

  public getHistory(): { organisms: number; foods: number }[] {
    return this.history;
  }

  public step(): void {
    // 1. Update Environment
    this.physicsEngine.updateEnvironment(this.environment);

    const organismList = Array.from(this.organisms.values());

    // 2. Update Organisms (Physics, Movement, Consumption)
    for (const organism of organismList) {
      this.physicsEngine.updateOrganism(organism, organismList, this.foods);
    }

    // 3. Handle Death and Cleanup
    for (const [id, organism] of this.organisms.entries()) {
      if (!organism.state.isAlive) {
        this.organisms.delete(id);
      }
    }

    // 4. Handle Reproduction (Placeholder logic)
    // In a real simulation, we'd check energy thresholds or age for reproduction
    this.handleReproduction();

    // 5. Record History
    this.history.push({
      organisms: this.organisms.size,
      foods: this.foods.length,
    });

    // Keep history bounded to prevent memory leaks
    if (this.history.length > 100) {
      this.history.shift();
    }
  }

  public setEnvironment(env: EnvironmentState): void {
    this.environment = env;
    this.physicsEngine.updateEnvironment(env);
  }
}
