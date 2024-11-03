import { Common } from './common';
import { Ghost } from './ghost';
import { DIRECTION, oneBlockSize } from './pacman.enum';

export class Pacman {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  direction: number;
  nextDirection: number;
  frameCount: number;
  currentFrame: number;

  common: Common;
  pacmanFrames: CanvasImageSource;
  canvasContext: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,

    common: Common,
    pacmanFrames: CanvasImageSource,
    canvasContext: CanvasRenderingContext2D,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = 4;
    this.nextDirection = 4;
    this.frameCount = 7;
    this.currentFrame = 1;

    this.common = common;
    this.pacmanFrames = pacmanFrames;
    this.canvasContext = canvasContext;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  moveProcess(): void {
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollisions()) {
      this.moveBackwards();
      return;
    }
  }

  eat(): void {
    for (let i = 0; i < this.common.getMap().length; i++) {
      for (let j = 0; j < this.common.getMap()[0].length; j++) {
        if (
          this.common.getMap()[i][j] == 2 &&
          this.getMapX() == j &&
          this.getMapY() == i
        ) {
          this.common.getMap()[i][j] = 3;
          this.common.incScore();
        }
      }
    }
  }

  moveBackwards(): void {
    switch (this.direction) {
      case DIRECTION.RIGHT:
        this.x -= this.speed;
        break;
      case DIRECTION.UP:
        this.y += this.speed;
        break;
      case DIRECTION.LEFT:
        this.x += this.speed;
        break;
      case DIRECTION.BOTTOM:
        this.y -= this.speed;
        break;
    }
  }

  moveForwards(): void {
    switch (this.direction) {
      case DIRECTION.RIGHT:
        this.x += this.speed;
        break;
      case DIRECTION.UP:
        this.y -= this.speed;
        break;
      case DIRECTION.LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION.BOTTOM:
        this.y += this.speed;
        break;
    }
  }

  checkCollisions(): boolean {
    const xBlock = parseInt((this.x / oneBlockSize).toString());
    const yBlock = parseInt((this.y / oneBlockSize).toString());
    const xBlockP = parseInt((this.x / oneBlockSize + 0.9999).toString());
    const yBlockP = parseInt((this.y / oneBlockSize + 0.9999).toString());

    return (
      this.common.getMap()[yBlock][xBlock] === 1 ||
      this.common.getMap()[yBlockP][xBlock] === 1 ||
      this.common.getMap()[yBlock][xBlockP] === 1 ||
      this.common.getMap()[yBlockP][xBlockP] === 1
    );
  }

  checkGhostCollision(ghosts: Ghost[]): boolean {
    for (const ghost of ghosts) {
      if (
        ghost.getMapX() === this.getMapX() &&
        ghost.getMapY() === this.getMapY()
      )
        return true;
    }
    return false;
  }

  changeDirectionIfPossible(): void {
    if (this.direction == this.nextDirection) return;
    const tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.moveForwards();
    if (this.checkCollisions()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  getMapX(): number {
    return parseInt(String(this.x / oneBlockSize));
  }

  getMapY(): number {
    return parseInt(String(this.y / oneBlockSize));
  }

  getMapXRightSide(): number {
    return parseInt(String((this.x * 0.99 + oneBlockSize) / oneBlockSize));
  }

  getMapYRightSide(): number {
    return parseInt(String((this.y * 0.99 + oneBlockSize) / oneBlockSize));
  }

  changeAnimation(): void {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw(): void {
    if (!this.canvasContext) return;
    this.canvasContext.save();
    this.canvasContext.translate(
      this.x + oneBlockSize / 2,
      this.y + oneBlockSize / 2,
    );
    this.canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
    this.canvasContext.translate(
      -this.x - oneBlockSize / 2,
      -this.y - oneBlockSize / 2,
    );
    this.canvasContext.drawImage(
      this.pacmanFrames,
      (this.currentFrame - 1) * oneBlockSize,
      0,
      oneBlockSize,
      oneBlockSize,
      this.x,
      this.y,
      this.width,
      this.height,
    );
    this.canvasContext.restore();
  }
}
