/**
 * BioEngine v1.0.post-refactor
 * A robust, single-file implementation for rapid prototyping.
 */

interface OrganismTraits {
  speed: number;
  vision: number;
  strength: number;
}

interface OrganismState {
  id: string;
  x: number;
  y: number;
  age: number택;
  health: number;
}

class Agent {
  constructor(public id: string, public x: number, public y: number) {}
}

class BioEngine {
  constructor(public worldSize: number) {}
}

class Simulation {
  private agents: Map<string, {x: number, y: number, health: number}> = new Map();
  private worldSize: number;

  constructor(worldSize: number) {
    this.worldSize = worldSize;
  }

  addAgent(id: string, x: number, y: number) {
    this.agents.set(id, { x, y, health: 100 });
  }

  step() {
    for (const [id, agent] of this.agents.entries()) {
      // Decay health
      agent.health -= 1;

      // Random movement
      agent.x += (Math.random() - 0.5) * 2;
      agent.y += (Math.random() - 0.5) * 2;

      // Keep in bounds
      agent.x = Math.max(0, Math.min(this.worldSize, agent.x));
      agent.y = Math.max(0, Math.min(this.worldSize, agent.y));

      // Remove dead
      if (agent.health <= 0) {
        this.agents.delete(id);
      }
    }
  }

  getAgentCount(): number {
    return this.agents.size;
  }
}

// Entry point for testing
const sim = new Simulation(100);
sim.addAgent("agent-1", 50, 50);
sim.addAgent("agent-2", 20, 20);

console.log("Initial count:", sim.getAgentCount());
for (let i = 0; i < 150; i++) {
  sim.step();
}
console.log("Count after 150 steps:", sim.getAgentCount());
