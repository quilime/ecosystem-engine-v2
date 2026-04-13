import { Simulation } from "./simulation";
import { Organism, EnvironmentState, Food } from "../../core/src/types";
import { describe, it, expect } from "vitest";

describe("Simulation", () => {
  const initialEnv: EnvironmentState = {
    temperature: 25,
    moisture: 50,
    foodSources: [],
  };
  // Let's use a clean one
  const cleanEnv: EnvironmentState = {
    temperature: 25,
    moisture: 50,
    foodSources: [],
  };

  const createTestOrganism = (id: string): Organism => ({
    id,
    position: { x: 0, y: 0 },
    genome: {
      speed: 1,
      size: 1,
      metabolism: 1,
      sensingRange: 1,
    },
    state: {
      energy: 10,
      age: 0,
      isAlive: true,
    },
  });

  it("should add and step through organisms", () => {
    const sim = new Simulation(cleanEnv);
    const org = createTestOrganism("org-1");

    sim.addOrganism(org);
    expect(sim.getOrganisms()).toHaveLength(1);

    sim.step();

    expect(sim.getOrganisms()).toHaveLength(1);
    expect(org.state.energy).toBe(9);
    expect(org.state.age).toBe(1);
  });

  it("should remove dead organisms after a step", () => {
    const sim = new Simulation(cleanEnv);
    const org = createTestOrganism("org-dead");
    org.state.energy = 1; // Will die on next step

    sim.addOrganism(org);
    sim.step();

    expect(sim.getOrganisms()).toHaveLength(0);
  });

  it("should handle food spawning and consumption", () => {
    const sim = new Simulation(cleanEnv);
    const org = createTestOrganism("org-1");
    const food: Food = {
      id: "food-1",
      position: { x: 0.1, y: 0.1 },
      energyValue: 5,
    };

    sim.addOrganism(org);
    sim.spawnFood(food);

    sim.step();

    expect(org.state.energy).toBe(14); // 10 - 1 (metabolism) + 5 (food)
    expect(sim.getFoods()).toHaveLength(0);
  });

  it("should handle reproduction", () => {
    const sim = new Simulation(cleanEnv);
    const org = createTestOrganism("parent");
    org.state.energy = 30; // High enough to trigger reproduction (threshold is 20)

    sim.addOrganism(org);
    sim.step();

    expect(sim.getOrganisms()).toHaveLength(2); // Parent + Offspring
    expect(org.state.energy).toBe(19); // 30 - 1 (metabolism) - 10 (reproduction cost)
  });
});
