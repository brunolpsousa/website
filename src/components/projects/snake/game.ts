import { Apple } from './apple';
import { Snake } from './snake';

export class SnakeGame {
  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D | null;
  private record: number;
  private gameSpeed: number;
  private direction: { x: number; y: number } = { x: 1, y: 0 };

  private snake: Snake;
  private apple: Apple;

  private static instance: SnakeGame | undefined;

  constructor(canvas: HTMLCanvasElement, gameSpeed?: number, record?: number) {
    this.canvas = canvas;
    this.canvasContext = this.canvas?.getContext('2d');
    this.gameSpeed = gameSpeed || 15;
    this.record = record || 0;

    this.snake = new Snake();
    this.apple = new Apple(this.canvas, this.snake);
  }

  static getInstance(
    canvas?: HTMLCanvasElement,
    gameSpeed?: number,
    record?: number,
  ): SnakeGame | undefined {
    if (this.instance) {
      return this.instance;
    }

    if (!canvas) {
      if (typeof document === 'undefined') {
        return;
      }
      canvas = document.getElementById('canvas') as HTMLCanvasElement;
    }

    this.instance = new SnakeGame(canvas, gameSpeed, record);
    return this.instance;
  }

  static destroy(): void {
    this.instance = undefined;
  }

  start(): () => void {
    window.addEventListener('resize', this.adjustCanvasSize);
    window.addEventListener('keydown', this.keyAction);

    this.adjustCanvasSize();
    const loop = this.gameLoop();

    window.onbeforeunload = () => {
      if (loop) {
        clearInterval(loop);
      }
    };

    return () => {
      window.removeEventListener('resize', this.adjustCanvasSize);
      window.removeEventListener('keydown', this.keyAction);
    };
  }

  private keyAction = (e: KeyboardEvent) => {
    e.preventDefault();

    const left = ['arrowleft', 'a', 'h'];
    const up = ['arrowup', 'w', 'k'];
    const right = ['arrowright', 'd', 'l'];
    const down = ['arrowdown', 's', 'j'];
    const key = e.key.toLowerCase();

    if (left.indexOf(key) > -1 && this.snake.rotateX != 1) {
      this.setDirection(-1, 0);
    } else if (up.indexOf(key) > -1 && this.snake.rotateY != 1) {
      this.setDirection(0, -1);
    } else if (right.indexOf(key) > -1 && this.snake.rotateX != -1) {
      this.setDirection(1, 0);
    } else if (down.indexOf(key) > -1 && this.snake.rotateY != -1) {
      this.setDirection(0, 1);
    }
  };

  private setDirection(x?: number, y?: number): void {
    if (!(typeof x === 'number' && typeof y === 'number')) {
      this.direction = { x: 1, y: 0 };
      return;
    }
    this.direction = { x: x as number, y: y as number };
  }

  private gameLoop(): NodeJS.Timeout {
    return setInterval(() => this.update(), 1000 / this.gameSpeed);
  }

  private update(): void {
    if (!this.canvasContext) return;
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.move();
    this.eatApple();
    this.checkCollision();
    this.snake.rotateX = this.direction.x;
    this.snake.rotateY = this.direction.y;
    this.draw();
  }

  private eatApple(): void {
    if (
      this.snake.tail[this.snake.tail.length - 1].x >=
        this.apple.x - this.snake.size / 2 &&
      this.snake.tail[this.snake.tail.length - 1].x <=
        this.apple.x + this.snake.size / 2 &&
      this.snake.tail[this.snake.tail.length - 1].y >=
        this.apple.y - this.snake.size / 2 &&
      this.snake.tail[this.snake.tail.length - 1].y <=
        this.apple.y + this.snake.size / 2
    ) {
      this.snake.tail[this.snake.tail.length] = {
        x: this.snake.tail[this.snake.tail.length - 1].x,
        y: this.snake.tail[this.snake.tail.length - 1].y,
      };
      this.apple = new Apple(this.canvas, this.snake);
    }

    if (this.apple.x > this.canvas.width || this.apple.y > this.canvas.height) {
      this.apple = new Apple(this.canvas, this.snake);
    }
  }

  private gameOver(): void {
    this.record = Math.max(this.record, this.snake.tail.length - 1);
    this.setDirection();
    this.snake = new Snake();
  }

  private checkCollision(): void {
    const headTail = this.snake.tail[this.snake.tail.length - 1];

    // wall collision
    if (
      headTail.x <= -this.snake.size ||
      headTail.x >= this.canvas.width ||
      headTail.y <= -this.snake.size ||
      headTail.y >= this.canvas.height
    ) {
      return this.gameOver();
    }

    // self collision
    for (let i = 0; i < this.snake.tail.length - 2; i++) {
      if (
        headTail.x == this.snake.tail[i].x &&
        headTail.y == this.snake.tail[i].y
      ) {
        return this.gameOver();
      }
    }
  }

  private draw(): void {
    if (!this.canvasContext) return;

    this.createRect(0, 0, this.canvas.width, this.canvas.height, 'black');

    for (const tail of this.snake.tail) {
      this.createRect(
        tail.x + 2.5,
        tail.y + 2.5,
        this.snake.size - 5,
        this.snake.size - 5,
        'white',
      );
    }

    this.canvasContext.font = '20px sans-serif';
    this.canvasContext.fillStyle = '#00FF42';
    this.canvasContext.fillText(
      'Record: ' + this.record,
      (this.canvas.width / 9) * 2,
      18,
    );
    this.canvasContext.fillText(
      'Score: ' + (this.snake.tail.length - 1),
      (this.canvas.width / 3) * 2,
      18,
    );
    this.createRect(
      this.apple.x,
      this.apple.y,
      this.apple.size,
      this.apple.size,
      this.apple.color,
    );
  }

  private createRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ): void {
    if (!this.canvasContext) return;

    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(x, y, width, height);
  }

  private adjustCanvasSize(): void {
    const width = Math.floor((window.innerWidth / 5) * 4);
    const height = Math.floor(window.innerHeight / 2);
    this.canvas.width = width - (width % this.snake.size);
    this.canvas.height = height - (height % this.snake.size);
  }
}
