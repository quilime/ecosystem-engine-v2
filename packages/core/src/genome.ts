export class GenomeEngine {
  private readonly mutationRate: number;
  private readonly mutationStrength: number;

  constructor(mutationRate: number = 0.1, mutationStrength: number = 0.05) {
    this.mutationRate = mutationRate;
    this.mutationStrength = mutationStrength;
  }

  public mutate(genome: Genome): Genome {
    const mutateValue = (val: number): number => {
      if (Math.random() < this.mutationRate) {
        const delta = (Math.random() * 2 - 1) * this.mutationStrength;
        return Math.max(0.1, val + delta);
      }
      return val;
    };

    return {
      speed: mutateValue(genome.speed),
      size: mutateValue(genome.size),
      metabolism: mutateValue(genome.metabolism),
      sensingRange: mutateValue(genome.sensingRange),
      attractionStrength: mutateValue(genome.attractionStrength),
      repulsionStrength: mutateValue(genome.repulsionStrength),
    };
  }

  public crossover(parentA: Genome, parentB: Genome): Genome {
    const crossoverValueSimple = (valA: number, valB: number): number => {
      return Math.random() < 0.5 ? valA : valB;
    };

    return {
      speed: crossoverValueSimple(parentA.speed, parentB.speed),
      size: crossoverValueSimple(parentA.size, parentB.size),
      metabolism: crossoverValueSimple(parentA.metabolism, parentB.metabolism),
      sensingRange: crossoverValueSimple(
        parentA.sensingRange,
        parentB.sensingRange,
      ),
      attractionStrength: crossoverValueSimple(
        parentA.attractionStrength,
        parentB.attractionStrength,
      ),
      repulsionStrength: crossoverValueSimple(
        parentA.repulsionStrength,
        parentB.repulsionStrength,
      ),
    };
  }
}
