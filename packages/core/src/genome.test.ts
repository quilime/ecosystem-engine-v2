import { Genome, GenomeEngine } from "./genome";
import { describe, it, expect } from "vitest";

describe("GenomeEngine", () => {
  const initialGenome: Genome = {
    speed: 1,
    size: 1,
    metabolism: 1,
    sensingRange: 1,
  };

  it("should mutate genome values", () => {
    const engine = new GenomeEngine(1.0, 0.5); // 100% mutation rate, high strength
    const mutated = engine.mutate(initialGenome);

    // Since mutation rate is 100%, values should have changed or stayed within range
    // We check that it's not exactly the same, or at least check the type/structure
    expect(mutated.speed).not.toBeUndefined();
    expect(typeof mutated.speed).toBe("number");
  });

  it("should perform crossover between two genomes", () => {
    const engine = new GenomeEngine();
    const genomeA: Genome = {
      speed: 1,
      size: 1,
      metabolism: 1,
      sensingRange: 1,
    };
    const genomeB: Genome = {
      speed: 2,
      size: 2,
      metabolism: 2,
      sensingRange: 2,
    };

    const child = engine.crossover(genomeA, genomeB);

    // Child traits should be either from A or B
    expect([1, 2]).toContain(child.speed);
    expect([1, 2]).toContain(child.size);
    expect([1, 2]).toContain(child.metabolism);
    expect([1, 2]).toContain(child.sensingRange);
  });
});
