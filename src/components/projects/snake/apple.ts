import { Snake } from './snake';

export class Apple {
  x: number;
  y: number;
  size: number;
  color: string;

  constructor(canvas: HTMLCanvasElement, snake: Snake) {
    let isTouching;

    while (true) {
      isTouching = false;
      this.x =
        Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
      this.y =
        Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;

      for (const tail of snake.tail) {
        if (this.x == tail.x && this.y == tail.y) isTouching = true;
      }

      this.size = snake.size;
      this.color = 'red';

      if (!isTouching) break;
    }
  }
}
