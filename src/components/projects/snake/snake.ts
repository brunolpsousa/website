export class Snake {
  x: number;
  y: number;
  size: number;
  tail: { x: number; y: number }[];
  rotateX: number;
  rotateY: number;

  constructor() {
    this.size = 16;
    this.x = 0;
    this.y = this.size * 5;
    this.tail = [{ x: this.x, y: this.y }];
    this.rotateX = 1;
    this.rotateY = 0;
  }

  move(): void {
    let newRect;

    if (this.rotateX == 1) {
      newRect = {
        x: Math.floor(this.tail[this.tail.length - 1].x + this.size / 2),
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateX == -1) {
      newRect = {
        x: Math.floor(this.tail[this.tail.length - 1].x - this.size / 2),
        y: this.tail[this.tail.length - 1].y,
      };
    }

    if (this.rotateY == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: Math.floor(this.tail[this.tail.length - 1].y + this.size / 2),
      };
    } else if (this.rotateY == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: Math.floor(this.tail[this.tail.length - 1].y - this.size / 2),
      };
    }

    if (!newRect) return;
    this.tail.shift();
    this.tail.push(newRect);
  }
}
