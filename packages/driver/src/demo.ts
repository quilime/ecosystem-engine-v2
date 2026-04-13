import { SimulationDriver } from "./visualizer";

// Mocking some types for the demo
interface MockAgent {
  x: number;
  y: number;
  type: 'prey' | 'predator';
}

interface MockFood {
  x: number;
  y: number;
}

function runDemo() {
  const width = 40;
  const height = 20;
  const driver = new SimulationDriver(width, height);

  const agents: MockAgent[] = [
    { x: 5, y: 5, type: 'prey' },
    { x: 10, y: 10, type: 'predator' },
    { x: 15, y: 2, type: 'prey' },
  ];

  const foodSources = new Set<MockFood>([
    { x: 2, y: 2 },
    { x: 35, y: 15 },
    { x: 20, y: 10 },
  ]);

  console.log("Starting Demo Visualizer...");
  
  let frame = 0;

  const interval = setInterval(() => {
    // Move agents randomly
    agents.forEach(a => {
      a.x += (Math.random() - 0.5) * 2;
      a.y += (Math.random() - 0.5) * 2;

      // Boundary checks
      if (a.x < 0) a.x = 0;
      if (a.x >= width) a.x = width - 1;
      if (a.y < 0) a.y = 0;
      if (a.y >= height) a.y = height - 1;
    });

    driver.render(agents, foodSources);

    frame++;
    // Print frame count for reference
    process.stdout.write(`\rFrame: ${frame}`);
  }, 100);
}

runDemo();
