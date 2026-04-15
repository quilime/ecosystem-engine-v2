import { AnsiGrid } from "../../renderer/src/grid";
import pc from "picocolors";
import table from "text-table";

/**
 * The Driver connects the Simulation logic to the Render primitive.
 * It handles the mapping of continuous coordinates to the discrete grid.
 */
export class SimulationDriver {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /**
   * Draws the current state of the simulation to the terminal.
   * @param agents Array of agents with positions and types
   * @param foodSources Set of food source positions
   * @param stats Optional statistics to display
   * @param history Array of historical population counts
   */
  public render(
    agents: any[],
    foodSources: Set<any>,
    stats?: Record<string, any>,
    history: { organisms: number; foods: number }[] = [],
  ): void {
    // 1. Reset the grid
    const newGrid = new AnsiGrid(this.width, this.height);

    // 2. Draw Food
    for (const food of foodSources) {
      const gx = Math.floor(food.x);
      const gy = Math.floor(food.y);
      if (gx >= 0 && gx < this.width && gy >= 0 && gy < this.height) {
        newCR = newGrid.setCell(gx, gy, pc.green(".")); // Green dot for food
      }
    }
    // ... (rest of logic)
  }
    }

    // 3. Draw Agents
    for (const agent of agents) {
      const gx = Math.floor(agent.x);
      const gy = Math.floor(agent.y);
      if (gx >= 0 && gx < this.width && gy >= 0 && gy < this.height) {
        const char = agent.type === "prey" ? "v" : "P";
        const color = agent.type === "prey" ? pc.blue : pc.red;
        newGrid.setCell(gx, gy, color(char));
      }
    }

    // 4. Print to terminal
    process.stdout.write("\x1Bc"); // Clear terminal screen
    console.log(pc.bold("--- Ecosystem Visualizer ---"));
    console.log(newGrid.render());
    console.log("-----------------------------");

    // 5. Stats Dashboard
    if (stats) {
      console.log(pc.bold("[ Statistics ]"));
      const tableRows = [["Metric", "Value"]];
      Object.entries(stats).forEach(([key, value]) => {
        tableRows.push([key, String(value)]);
      });
      console.log(table(tableRows));
    } else {
      const preyCount = agents.filter((a) => a.type === "prey").length;
      const predCount = agents.filter((a) => a.type === "predator").length;
      console.log(`Prey: ${preyCount} | Predators: ${predCount}`);
    }

    // 6. Population Trends (Sparkline-like)
    // Note: This would require passing history to the render method
    // For now, we just show a placeholder for the next step.
    console.log(pc.dim("Trend: [ Implementation Pending ]"));
  }
}
