import { AnsiGrid } from "../../renderer/src/grid";

/**
 * The Driver connects the Simulation logic to the Render primitive.
 * It handles the mapping of continuous coordinates to the discrete grid.
 */
export class SimulationDriver {
  private grid: AnsiGrid;
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = new AnsiGrid(width, height);
  }

  /**
   * Draws the current state of the simulation to the terminal.
   * @param agents Array of agents with positions and types
   * @param foodSources Set of food source positions
   * @param stats Optional statistics to display
   */
  public render(agents: any[], foodSources: Set<any>, stats?: Record<string, any>): void {
    // 1. Reset the grid
    const newGrid = new AnsiGrid(this.width, this.height);

    // 2. Draw Food
    for (const food of foodSources) {
      const gx = Math.floor(food.x);
      const gy = Math.floor(food.y);
      newGrid.setCell(gx, gy, "\x1b[32m.\x1b[0m"); // Green dot for food
    }

    // 3. Draw Agents
    for (const agent of agents) {
      const gx = Math.floor(agent.x);
      const gy = Math.floor(agent.y);
      const char = agent.type === 'prey' ? "v" : "P";
      const color = agent.type === 'prey' ? "\x1b[34m" : "\x1b[31m"; // Blue for prey, Red for predator
      newGrid.setCell(gx, gy, `${color}${char}\x1b[0m`);
    }

    // 4. Print to terminal
    process.stdout.write("\x1Bc"); // Clear terminal screen
    console.log("\x1b[1m--- Ecosystem Visualizer ---\x1b[0m");
    console.log(newGrid.render());
    console.log("-----------------------------");
    
    // 5. Stats Dashboard
    if (stats) {
      console.log("\x1b[1m[ Statistics ]\x1b[0m");
      Object.entries(stats).forEach(([key, value]) => {
        console.log(`${key.padEnd(15)}: ${value}`);
      });
    } else {
      const preyCount = agents.filter(a => a.type === 'prey').length;
      const predCount = agents.filter(a => a.type === 'predator').length;
      console.log(`Prey: ${preyCount} | Predators: ${predCount}`);
    }
  }
}
