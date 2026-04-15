import { Organism, EnvironmentState, Food } from "../../core/src/types";
import { PhysicsEngine } from "../../core/src/physics";
import { GenomeEngine } from "../../core/src/genome";

export class Simulation {
  private organisms: Map<string, Organism> = new Map();
  private foods: Food[] = [];
  private physicsEngine: PhysicsEngine;
  private genomeEngine: GenomeEngine;
  private environment: EnvironmentState;
  private currentStep: number = 0;
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
    this.currentStep++;

    // 1. Update Environment (Seasonal/Weather changes)
    this.applyEnvironmentalDynamics();
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

    // 4. Handle Reproduction
    this.handleReproduction();

    // 5. Record History
    this.history.push({
      organisms: this.popCount(),
      foods: this.foods.length,
    });

    // Keep history bounded to prevent memory leaks
    if (this.history.length > 100) {
      this.history.shift();
    }
  }

  private applyEnvironmentalDynamics(): void {
    // Seasonal Temperature Cycle (Sinusoidal)
    // Period of 500 steps
    const period = 500;
    const baseTemp = 20;
    const amplitude = 15;
    this.environment.temperature =
      baseTemp +
      amplitude * Math.sin((2 * Math.PI * this.currentStep) / period);

    // Moisture fluctuation (Random walk/Brownian)
    this.environment.moisture += (Math.random() - 0.5) * 0.01;
    this.environment.moisture = Math.max(
      0,
      Math.min(1, this.environment.moisture),
    );

    // Random Weather Events
    if (Math.random() < 0.01) {
      // 1% chance per step
      const eventType = Math.random();
      if (eventType < 0.5) {
        // Rain event -> Increases moisture
        this.environment.moisture = Math.min(
          1,
          this.environment.moisture + 0.2,
        );
      } else {
        // Heatwave event -> Increases temperature
        this.environment.temperature += 10;
      }
    }
  }

  private handleReproduction(): void {
    // Simple reproduction: if organism has high energy, it can create an offspring
    const newOrganisms: Organism[] = [];

    for (const organism of this.organisms.values()) {
      if (organism.state.isAlive && organism.state.energy > 30) {
        organism.state.energy -= 15; // Cost of reproduction

        const offspringGenome = this.genomeEngine.mutate(organism.genome);
        const offspring: Organism = {
          id: `org-${Math.random().toString(36).substr(2, 9)}`,
          position: { ...organism.position },
          genome: offspringGenome,
          state: {
            energy: 15,
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

  private popCount(): number {
    return this.organisms.size;
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

  public getEnvironment(): EnvironmentState {
    return this.environment;
  }

  public setEnvironment(env: EnvironmentState): void {
    this.environment = env;
    this.physicsEngine.updateEnvironment(env);
  }
}
