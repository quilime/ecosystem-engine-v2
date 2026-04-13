import { describe, it, expect } from "vitest";
import { Organism as OrganismType } from "../../core/src/types";

describe("Driver Demo Test", () => {
  it("should run a mini simulation loop", async () => {
    const step = (orgs: OrganismType[]) => {
      orgs.forEach((o) => {
        o.state.energy -= 1;
        o.state.age += 1;
        // logic for food...
      });
    };

    const testOrg: OrganismType = {
      id: "test",
      state: { energy: 10, age: 0, isAlive: true },
      position: { x: 0, y: 0 },
      genome: { speed: 1, size: 1, metabolism: 1, sensingRange: 1 },
    };

    step([testOrg]);

    expect(testOrg.state.energy).toBe(9);
    expect(testOrg.state.age).toBe(1);
  });
});
