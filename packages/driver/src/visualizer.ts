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
   */
  public render(agents: any[], foodSources: Set<any>): void {
    // 1. Clear/Reset the grid (using a fresh instance or clearing buffer)
    // For simplicity in this prototype, we'll just recreate it.
    const newGrid = new AnsiGrid(this.width, this.height);

    // 2. Draw Food
    for (const food of foodSources) {
      const gx = Math.floor(food.x);
      const gy = Math.floor(food.y);
      newGrid.setCell(gx, gy, ".");
    }

    // 3. Draw Agents
    for (const agent of agents) {
      const gx = Math.floor(agent.x);
      const gy = Math.floor(agent.y);
      const char = agent.type === 'prey' ? "v" : "P";
      newGrid.setCell(gx, gy, char);
    }

    // 4. Print to terminal
    process.stdout.write("\x1Bc"); // Clear terminal screen
    console.log("--- Ecosystem Visualizer ---");
    console.log(newGrid.render());
    console.log("----------------------------");
    console.log(`Prey: ${agents.filter(a => a.type === 'prey').length} | Predators: ${agents.filter(a => a.type === 'predator').length}`);
  }
}
