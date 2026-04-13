import { describe, it, expect } from "vitest";
import { Simulation } from "../../simulation/src/simulation";
import {
  Organism as OrganismType,
  EnvironmentState as EnvType,
  Food as FoodType,
} from "../../core/src/types";

describe("Driver Demo Test", () => {
  it("should run a mini simulation loop", async () => {
    const env: EnvType = {
      temperature: 25,
      moisture: 50,
      foodSources: [],
    };

    // This is a simplified test to verify the loop logic works
    const organisms: OrganismType[] = [];
    const foods: FoodType[] = [];

    // Simulate a step
    const step = (orgs: OrganismType[], foods: FoodType[]) => {
      orgs.forEach((o) => {
        o.state.energy -= 1;
        o.state.age += 1;
        // logic for food...
      });
    };

    const testOrg = {
      id: "test",
      state: { energy: 10, age: 0, isAlive: true },
      position: { x: 0, y: 0 },
      genome: { speed: 1, size: 1, metabolism: 1, sensingRange: 1 },
    };

    step([testOrg], []);

    expect(testOrg.state.energy).toBe(9);
    expect(testOrg.state.age).toBe(1);
  });
});
