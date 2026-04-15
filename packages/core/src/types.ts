export type Coordinate = {
  x: number;
  y: number;
};

export interface EntityState {
  energy: number;
  age: number;
  isAlive: boolean;
}

export interface Genome {
  speed: number;
  size: number;
  metabolism: number;
  sensingRange: number;
  attractionStrength: number;
  repulsionStrength: number;
}

export interface Food {
  id: string;
  position: Coordinate;
  energyValue: number;
}

export interface EnvironmentState {
  temperature: number;
  moisture: number;
  foodSources: Food[];
}

export interface SimulationSnapshot {
  timestamp: number;
  step: number;
  environment: EnvironmentState;
  organisms: Organism[];
  foods: Food[];
}

export interface TelemetryEvent {
  timestamp: number;
  type: "reproduction" | "death" | "weather_event" | "food_spawn";
  payload: any;
}
