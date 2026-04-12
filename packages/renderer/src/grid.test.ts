import { AnsiGrid } from './grid';
import { describe, it, expect } from 'vitest';

describe('AnsiGrid', () => {
  it('should initialize with empty spaces', () => {
    const grid = new AnsiGrid(10, 5);
    expect(grid.getCell(0, 0)).toBe(' ');
    expect(grid.getWidth()).toBe(10);
    expect(grid.getHeight()).toBe(5);
  });

  it('should set and get characters correctly', () => {
    const grid = new AnsiGrid(10, 5);
    grid.setCell(2, 3, 'A');
    expect(grid.getCell(2, 3)).toBe('A');
  });

  it('should not set characters out of bounds', () => {
    const grid = new AnsiGrid(10, 5);
    grid.setCell(10, 5, 'X');
    grid.setCell(-1, -1, 'X');
    expect(grid.getCell(10, 5)).toBe(' ');
    expect(grid.getCell(-1, -1)).toBe(' ');
  });

  it('should render the grid content correctly', () => {
    const grid = new AnsiGrid(2, 2);
    grid.setCell(0, 0, '1');
    grid.setCell(1, 0, '2');
    grid.setCell(0, 1, '3');
    grid.setCell(1, 1, '4');
    const output = grid.render();
    expect(output).toBe('12\n34');
  });
});
