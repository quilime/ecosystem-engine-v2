import { Simulation } from "../../simulation/src/simulation";
import { SimulationDriver } from "./visualizer";
import { EnvironmentState, Food, Organism } from "../../core/src/types";
import { Genome } from "../../core/src/genome";

function runRealSimulation() {
  const width = 60;
  const height = 30;

  const initialEnv: EnvironmentState = {
    temperature: 25,
    moisture: 0.5,
    foodSources: [],
  };

  const sim = new Simulation(initialEnv);
  const driver = new SimulationDriver(width, height);

  // 1. Seed Food
  for (let i = 0; i < 20; i++) {
    sim.spawnFood({
      id: `food-${i}`,
      position: { x: Math.random() * width, y: Math.random() * height },
      energyValue: 10,
    });
  }

  // 2. Seed Organisms
  for (let i = 0; i < 15; i++) {
    const genome: Genome = {
      speed: 1 + Math.random(),
      size: 1 + Math.random(),
      metabolism: 0.5 + Math.random() * 0.5,
      sensingRange: 3 + Math.random() * 5,
    };

    sim.addOrganism({
      id: `org-${i}`,
      position: { x: Math.random() * width, y: Math.random() * height },
      genome: genome,
      state: { energy: 20, age: 0, isAlive: true },
    });
  }

  console.log("Starting Real Ecosystem Simulation...");

  let frame = 0;

  const interval = setInterval(() => {
    // 3. Spawn new food periodically
    if (frame % 5 === 0) {
      sim.spawnFood({
        id: `food-spwn-${frame}`,
        position: { x: Math.random() * width, y: Math.random() * height },
        energyValue: 15,
      });
    }

    // 4. Step the simulation
    sim.step();

    // 5. Prepare data for driver
    const organisms = sim.getOrganisms();
    const foods = sim.getFoods();

    // We need to map Food objects to the format expected by the driver (which expects position.x/y)
    // Actually, the driver uses food.x and food.y, but our types use food.position.x
    // Let's cast to any to fix the field access in the driver quickly for the demo
    const foodProxies = foods.map((f) => ({
      x: f.position.x,
      y: f.position.y,
    }));

    // Map organisms to the format expected by the driver (which uses agent.x, agent.y, agent.type)
    // Note: The current driver simulation uses agent.type which isn't in Organism type.
    // We'll use a workaround here.
    const agentProxies = organisms.map((o) => ({
      x: o.position.x,
      y: o.position.y,
      type: o.genome.size > 2 ? "predator" : "prey",
    }));

    const stats = {
      Organisms: organisms.length,
      "Food Sources": foods.length,
      Frame: frame,
    };

    driver.render(agentProxies, new Set(foodProxies as any), stats);

    frame++;
  }, 100);

  // Handle clean exit
  process.on("SIGINT", () => {
    clearInterval(interval);
    console.log("\nSimulation Ended.");
    process.exit();
  });
}

runRealSimulation();
