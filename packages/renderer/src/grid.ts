export class AnsiGrid {
  private buffer: string[][];
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.buffer = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ' ')
    );
  }

  public setCell(x: number, y: number, char: string): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.buffer[y][x] = char;
    }
  }

  public getCell(x: number, y: number): string {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      return this.buffer[y][x];
    }
    return ' ';
  }

  public render(): string {
    return this.buffer
      .map((row) => row.join(''))
      .join('\n');
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }
}
