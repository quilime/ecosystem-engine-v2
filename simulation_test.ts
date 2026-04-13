/**
 * BioEngine v1.1 - Predator-Prey Ecosystem
 * An implementation of a basic Lotka-Volterra-style agent simulation.
 */

type AgentType = 'prey' | 'predator';

interface AgentState {
  id: string;
  type: AgentType;
  x: number;
  y: number;
  health: number;
}

class Simulation {
  private agents: Map<string, AgentState> = new Map();
  private foodSources: Set<{x: number, y: number}> = new Set();
  private worldSize: number;
  private stepCount: number = 0;

  constructor(worldSize: number) {
    this.worldSize = worldSize;
  }

  addAgent(type: AgentType, x: number, y: number, health: number = 100) {
    const id = Math.random().toString(36).substring(2, 9);
    this.agents.set(id, { id, type, x, y, health });
  }

  addFood(x: number, y: number) {
    this.foodSources.add({ x, y });
  }

  step() {
    this.stepCount++;

    // 1. Spawn Food periodically
    if (this.stepCount % 2 === 0) {
      this.addFood(Math.random() * this.worldSize, Math.random() * this.worldSize);
    }

    // 2. Process Agents
    // We use an array of keys to avoid issues with deleting from the map during iteration
    const agentIds = Array.from(this.agents.keys());

    for (const id of agentIds) {
      const agent = this.agents.get(id);
      if (!agent) continue;

      // Metabolism: Agents lose health every step
      agent.health -= 1;

      // Random Movement (simplified wander)
      agent.x = Math.max(0, Math.min(this.worldSize, agent.x + (Math.random() - 0.5) * 4));
      agent.y = Math.max(0, Math.min(this.worldSize, agent.y + (Math.random() - 0.5) * 4));

      // --- BEHAVIOR LOGIC ---

      if (agent.type === 'prey') {
        // Prey look for food
        for (const food of this.foodSources) {
          const dist = Math.hypot(agent.x - food.x, agent.y - food.y);
          if (dist < 2) {
            agent.health += 30; // Eating food restores health
            this.foodSources.delete(food);
            break;
          }
        }

        // Reproduction: If healthy, split into two
        if (agent.health > 150) {
          agent.health = 70;
          this.addAgent('prey', agent.x, agent.y, 70);
        }
      } 
      
      else if (agent.type === 'predator') {
        // Predators look for prey
        for (const [otherId, otherAgent] of this.agents.entries()) {
          if (otherAgent.type === 'prey') {
            const dist = Math.hypot(agent.x - otherAgent.x, agent.y - otherAgent.y);
            if (dist < 3) {
              agent.health += 50; // Eating prey restores health
              this.agents.delete(otherId); // Prey dies
              break;
            }
          }
        }

        // Reproduction: If healthy, split
        if (agent.health > 180) {
          agent.health = 80;
          this.addAgent('predator', agent.x, agent.y, 80);
        }
      }

      // 3. Death Check
      if (agent.health <= 0) {
        this.agents.delete(id);
      }
    }

    // Cleanup old food (keep world from getting cluttered)
    if (this.foodSources.size > 50) {
      const first = this.foodSources.values().next().value;
      if (first) this.foodSources.delete(first);
    }
  }

  getStats() {
    let prey = 0;
    let predators = 0;
    this.agents.forEach(a => {
      if (a.type === 'prey') prey++;
      else predators++;
    });
    return { prey, predators, food: this.foodSources.size };
  }
}

// --- TEST RUN ---
const sim = new Simulation(100);

// Initial Population
for(let i=0; i<20; i++) sim.addAgent('prey', Math.random()*100, Math.random()*100);
for(let i=0; i<5; i++) sim.addAgent('predator', Math.random()*100, Math.random()*100);

console.log("Starting Ecosystem Simulation...");
console.log("Initial:", sim.getStats());

for (let i = 0; i < 200; i++) {
  sim.step();
  if (i % 50 === 0) {
    console.log(`Step ${i}:`, sim.getStats());
  }
}

console.log("Final:", sim.getStats());
