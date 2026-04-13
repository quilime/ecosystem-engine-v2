# 🧬 BioSim Implementation Roadmap

This document outlines the planned phases for evolving the BioSim engine from a prototype into a full-scale evolutionary ecosystem framework.

## 🎯 Core Objective
To transform the engine from a random-walk simulation into a high-fidelity, intelligent, and observable biological ecosystem.

---

## 🚀 Phase 1: Visual Fidelity & Observability (Short Term)
*Goal: Make the simulation readable and informative at a glance.*

- [ ] **ANSI Colorization**: Implement color-coded entities (e.g., Red Predators, Green Prey, Yellow Food) using `picocolors`.
- [ ] **Live Dashboard**: Add a persistent terminal UI overlay (using `text-table`) to display real-time statistics:
    - Population counts (Prey vs. Predator).
    - Average Genome metrics (Avg Speed, Avg Size).
    - Environmental stats (Temperature, Moisture).
- [ ] **Telemetry Logging**: Implement a logger to export simulation snapshots (CSV/JSON) for post-run analysis.

## 🧠 Phase 2: Intelligent Agents (Medium Term)
*Goal: Replace random motion with sensory-driven decision making.*

- [ ] **Sensory-Driven Vector Movement**: Replace Brownian motion with "Steering Behav Behaviors":
    - **Avoidance**: Move away from detected predators.
    / 
    - **Attraction**: Move towards detected food sources.
- [ ] **Neural-Lite Integration**: Implement a lightweight weighting system within the `Genome` that determines how much an agent reacts to different sensory inputs.
- [ ] **Trophic Interactions Expansion**: Expand the `PhysicsEngine` to handle more complex interactions (e.g., symbiotic relationships or group clustering).

## 🌍 Phase 3: Dynamic Environments (Long Term)
*Goal: Create a living, changing world that forces evolutionary adaptation.*

- [ ] **Climate Engine**: Implement a system to simulate seasonal cycles, day/night temperature shifts, and weather events (droughts/floods).
- [ ] **Environmental Feedback Loops**: Connect `EnvironmentState` to `PhysicsEngine` (e.g., heat increases metabolism; moisture changes movement friction).
- [ ] **Resource Regeneration Logic**: Implement more complex food growth patterns (e.g., localized patches vs. uniform distribution).

## 🛠️ Phase 4: Framework Maturity (Architectural)
*Goal: Turn the codebase into a usable library/tool for others.*

- [ ] **Plugin Architecture**: Enable users to inject custom `PhysicsEngine` or `GenomeEngine` modules.
- [ ] **Snapshot/Replay System**: Implement the ability to save the `Simulation` state and re-run specific evolutionary trajectories.
-   **API/CLI Tooling**: Create a CLI to launch pre-configured "Experiments" (e.s., `biosim run --preset desert`).

---

*Note: This roadmap is an evolving document managed by the BioSim developers.*
