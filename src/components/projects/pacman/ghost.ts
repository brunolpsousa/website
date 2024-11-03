import { Pacman } from './pacman';
import { DIRECTION, oneBlockSize } from './pacman.enum';

export class Ghost {
  private DEBUG: boolean;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private speed: number;
  private direction: number;
  private imageX: number;
  private imageY: number;
  private imageWidth: number;
  private imageHeight: number;
  private range: number;
  private randomTargetIndex: number;
  private target: { x: number; y: number };
  private currentFrame?: number;
  private frameCount?: number;
  private randomTargetsForGhosts: { x: number; y: number }[];

  private map: number[][];
  private pacman: Pacman;
  private ghostFrames: CanvasImageSource;
  private canvasContext: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    imageX: number,
    imageY: number,
    imageWidth: number,
    imageHeight: number,
    range: number,
    map: number[][],
    pacman: Pacman,
    ghostFrames: CanvasImageSource,
    canvasContext: CanvasRenderingContext2D,
  ) {
    this.DEBUG = true;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION.RIGHT;
    this.imageX = imageX;
    this.imageY = imageY;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.range = range;
    this.randomTargetIndex = parseInt(String(Math.random() * 4));
    this.map = map;
    this.randomTargetsForGhosts = [
      { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
      { x: 1 * oneBlockSize, y: (this.map.length - 2) * oneBlockSize },
      { x: (this.map[0].length - 2) * oneBlockSize, y: oneBlockSize },
      {
        x: (this.map[0].length - 2) * oneBlockSize,
        y: (this.map.length - 2) * oneBlockSize,
      },
    ];
    this.target = this.randomTargetsForGhosts[this.randomTargetIndex];

    this.pacman = pacman;
    this.ghostFrames = ghostFrames;
    this.canvasContext = canvasContext;

    setInterval(() => {
      this.changeRandomDirection();
    }, 10000);
  }

  isInRange(): boolean {
    const xDistance = Math.abs(this.pacman.getMapX() - this.getMapX());
    const yDistance = Math.abs(this.pacman.getMapY() - this.getMapY());
    return (
      Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
    );
  }

  changeRandomDirection(): void {
    const addition = 1;
    this.randomTargetIndex += addition;
    this.randomTargetIndex = this.randomTargetIndex % 4;
  }

  moveProcess(): void {
    if (this.isInRange()) {
      this.target = this.pacman;
    } else {
      this.target = this.randomTargetsForGhosts[this.randomTargetIndex];
    }
    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollisions()) {
      this.moveBackwards();
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
      this.map[yBlock][xBlock] === 1 ||
      this.map[yBlockP][xBlock] === 1 ||
      this.map[yBlock][xBlockP] === 1 ||
      this.map[yBlockP][xBlockP] === 1
    );
  }

  changeDirectionIfPossible(): void {
    const tempDirection = this.direction;
    const xTarget = parseInt((this.target.x / oneBlockSize).toString());
    const yTarget = parseInt((this.target.y / oneBlockSize).toString());
    this.direction = this.calculateNewDirection(
      this.map,
      xTarget,
      yTarget,
    ) as number;
    if (typeof this.direction == 'undefined') {
      this.direction = tempDirection;
      return;
    }
    if (
      this.getMapY() != this.getMapYRightSide() &&
      (this.direction == DIRECTION.LEFT || this.direction == DIRECTION.RIGHT)
    ) {
      this.direction = DIRECTION.UP;
    }
    if (
      this.getMapX() != this.getMapXRightSide() &&
      this.direction == DIRECTION.UP
    ) {
      this.direction = DIRECTION.LEFT;
    }
    this.moveForwards();
    if (this.checkCollisions()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  calculateNewDirection(
    map: number[][],
    destX: number,
    destY: number,
  ): DIRECTION | undefined {
    const mp = [];
    for (let i = 0; i < map.length; i++) {
      mp[i] = map[i].slice();
    }

    const queue: neighbor[] = [
      {
        x: this.getMapX(),
        y: this.getMapY(),
        rightX: this.getMapXRightSide(),
        rightY: this.getMapYRightSide(),
        moves: [],
      },
    ];

    while (queue.length) {
      const poped = queue.shift();
      if (!poped) return;

      if (poped.x == destX && poped.y == destY) {
        return poped.moves[0];
      }

      mp[poped.y][poped.x] = 1;
      const neighborList = this.addNeighbors(poped, mp) as neighbor[];
      for (const neighbor of neighborList) {
        queue.push(neighbor);
      }
    }

    return DIRECTION.BOTTOM;
  }

  addNeighbors(
    poped: { x: number; y: number; moves: number[] },
    mp: number[][],
  ): neighbor[] {
    const queue = [];
    const numOfRows = mp.length;
    const numOfColumns = mp[0].length;

    if (
      poped.x - 1 >= 0 &&
      poped.x - 1 < numOfRows &&
      mp[poped.y][poped.x - 1] != 1
    ) {
      const tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION.LEFT);
      queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
    }
    if (
      poped.x + 1 >= 0 &&
      poped.x + 1 < numOfRows &&
      mp[poped.y][poped.x + 1] != 1
    ) {
      const tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION.RIGHT);
      queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
    }
    if (
      poped.y - 1 >= 0 &&
      poped.y - 1 < numOfColumns &&
      mp[poped.y - 1][poped.x] != 1
    ) {
      const tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION.UP);
      queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
    }
    if (
      poped.y + 1 >= 0 &&
      poped.y + 1 < numOfColumns &&
      mp[poped.y + 1][poped.x] != 1
    ) {
      const tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION.BOTTOM);
      queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
    }
    return queue;
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
    if (!this.currentFrame) this.currentFrame = 1;
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  private debugMode(): void {
    if (this.DEBUG) {
      this.canvasContext.strokeStyle = 'red';
      this.canvasContext.stroke();
    }
  }

  draw(): void {
    this.canvasContext.save();
    this.canvasContext.drawImage(
      this.ghostFrames,
      this.imageX,
      this.imageY,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
    this.canvasContext.restore();
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.x + oneBlockSize / 2,
      this.y + oneBlockSize / 2,
      this.range * oneBlockSize,
      0,
      2 * Math.PI,
    );
    this.debugMode();
  }
}
interface neighbor {
  x: number;
  y: number;
  rightX?: number;
  rightY?: number;
  moves: number[];
}
