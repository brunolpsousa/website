import { all as charArr } from '@data/matrix';

export class FallingChar {
  x: number;
  y: number;
  value!: string;
  speed!: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    color: string,
    ch: number,
    fontSize: number,
    maxColumns: number,
  ): void {
    this.value = charArr[Math.floor(Math.random() * (charArr.length - 1))];
    this.speed = ((Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4) / 3;

    ctx.fillStyle = color;
    ctx.font = fontSize + 'px sans-serif';
    ctx.fillText(this.value as string, this.x, this.y);
    this.y += this.speed;

    if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
  }
}
