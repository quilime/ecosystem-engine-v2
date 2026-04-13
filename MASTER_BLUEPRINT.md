# 🧬 Project Master Blueprint: Terminal Evolutionary Ecosystem

## 🎯 Vision
To build a high-fidelity, terminal-based evolutionary simulation where life forms emerge, adapt, and struggle for survival via complex DNA-driven logic. The project is an experiment in **Autonomous Software Engineering**—the goal is to create a system where the development process is as robust and automated as the simulation itself.

---

'## 🛠️ Technical Stack
- **Language:** TypeScript (Strict Mode) for robust, type-safe logic.
- **Runtime:** Node.js.
- **Environment:** Terminal (ANSI/TUI) using Unicode/ASCII characters.
- **Testing Framework:** Vitest (Unit, Integration, and Snapshot testing).
- **Build System:** Monorepo (npm/yarn workspaces) with a centralized `build-and-verify.sh` orchestrator.
- **Version Control:** Git (for progress tracking and atomic rollbacks).

---

## 📐 Architectural Design

### 1. The Simulation Engine (`packages/core`)
The "Brain." Pure, deterministic logic.
- **Ruleset:** Cellular Automata governing energy, moisture, and temperature.
- **DNA System:** A bit-string or object-based genome defining traits (speed, size, sensing range, metabolism).
- **Entities:** Organisms with state (Energy, Age, Genome, Position).

### 2. The Orchestrator (`packages/simulation`)
The "Heart." Man    gest the simulation loop.
- **Tick System:** A discrete time-step loop (`requestAnimationFrame` equivalent in Node).
- **Spatial Partitioning:** Efficiently managing entity interactions in a grid.
- **Input Handling:** Interface for injecting "Chaos" or "User" commands via `stdin`.

### 3. The TUI Renderer (`packages/renderer`)
The "Eye." The visual interface.
- **ANSI Engine:** Uses escape codes to render a 2D grid to `stdout`.
- **Character Mapping:** Translating simulation states to Unicode (e.g., `🌱` for plant, `👾` for creature).
- **Layers:** Background (terrain) and Foreground (entities) layers.

---

## 🚀 The Automated Pipeline (The "Secret Sauce")

The project is governed by a single command: `./scripts/build-and-verify.sh`. 
A build is only `SUCCESS` if every layer of the following pipeline passes:

1.  **Linting:** `eslint` ensures code quality and standards.
2.  **Type-Check:** `tsc --noEmit` ensures no breaking changes across the monorepo.
3.  **Unit Tests:** `vitest` verifies the math/logic in `core`.
4.  **Integration Tests:** `vitest` verifies the interaction between `core` and `simulation`.
5.  **Snapshot Tests:** The simulation is run with a fixed seed, and the resulting terminal character buffer is compared against a "Golden Master" snapshot.
6.  **Final Build:** Packaging the runnable application.

---

## 🗺️ Development Roadmap

### Phase 0: The Foundation (Current)
- [ ] Initialize Git repository.
- [ ] Establish Monorepo structure.
- [ ] Implement the `build-and-verify.sh` (The Skeleton).
- [ ] Create `MASTER_BLUEPRINT.md`.

### Phase 1: The Infrastructure (The Scaffold)
- [ ] Configure `tsconfig` (Base + Package-specific).
- [ ] Integrate Vitest and ESLint.
- [ ] Implement the "ANSI Grid" utility (coordinate-based writing).

### Phase 2: The Brain (The Logic)
- [ ] Implement the `PhysicsEngine` (Energy/Metabolism).
- [ ] Implement the `Genome` system (Mutation/Crossover).
- [ ] Implement Unit tests for DNA logic.

### Phase 3: The Eye (The TUI)
- [ ] Implement the `SimulationLoop`.
- [/ ] Implement the `Renderer` (Mapping state $\rightarrow$ Unicode).
- [ ] Implement `stdin` interaction (User control).

### Phase 4: Autonomous Scaling (The Chaos)
- [ ] Implement "Chaos" scripts (Injecting mutations/failures).
- [ ] Implement automated "Self-Healing" (Agent identifies and fixes broken code).

---

## 🤖 Agent Protocol (Instructions for the AI)

**1. Accountability:** Every significant change **must** be accompanied by a `git commit` with a structured message (e.g., `[Wave-X] Description`).
**2. Transparency:** Use the **"Progress Update"** format (Status, Completed, Working On, Verified via, Next Milestone) after every authorized task.
**3. Verification:** Never assume code works. Always run the `build-and-verify.sh` script.
**4. Context Recovery:** If context is lost, the Agent must re-read `MASTER_BLUEPRINT.md` to regain situational awareness.
**5. Zero-Permission Execution:** Once "GO" is issued, the Agent MUST execute the entire instruction set or roadmap without asking for permission between steps. Do not pause for validation unless a critical error occurs.
