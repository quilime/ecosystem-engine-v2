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
