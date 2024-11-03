import { maps } from './pacman.enum';

export class Common {
  private foodCount: number;
  private score: number;
  private lives: number;
  private map: number[][];

  constructor() {
    this.score = 0;
    this.lives = 3;
    this.map = maps[0];
    this.foodCount = 0;
  }

  getScore(): number {
    return this.score;
  }

  incScore(): void {
    ++this.score;
  }

  decScore(): void {
    if (this.score) {
      --this.score;
    }
  }

  getLives(): number {
    return this.lives;
  }

  incLives(): void {
    ++this.lives;
  }

  decLives(): void {
    if (this.lives) {
      --this.lives;
    }
  }

  getMap(): number[][] {
    return this.map;
  }

  sortMap(): number[][] {
    this.map = maps[Math.ceil(Math.random() * (maps.length - 1))];
    return this.map;
  }

  getFoodCount(): number {
    return this.foodCount;
  }

  loadFoodCount(): void {
    this.foodCount = 0;

    for (const row of this.map) {
      for (const r of row) {
        if (r === 2) {
          this.foodCount++;
        }
      }
    }
  }
}
