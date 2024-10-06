'use client';

import { getLang } from '@utils/getLang';
import Link from 'next/link';
import { useEffect } from 'react';

const game = () => {
  class Pacman {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    direction: number;
    nextDirection: number;
    frameCount: number;
    currentFrame: number;

    constructor(
      x: number,
      y: number,
      width: number,
      height: number,
      speed: number,
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

      setInterval(() => {
        this.changeAnimation();
      }, 100);
    }

    moveProcess() {
      this.changeDirectionIfPossible();
      this.moveForwards();
      if (this.checkCollisions()) {
        this.moveBackwards();
        return;
      }
    }

    eat() {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
          if (map[i][j] == 2 && this.getMapX() == j && this.getMapY() == i) {
            map[i][j] = 3;
            score++;
          }
        }
      }
    }

    moveBackwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x -= this.speed;
          break;
        case DIRECTION_UP:
          this.y += this.speed;
          break;
        case DIRECTION_LEFT:
          this.x += this.speed;
          break;
        case DIRECTION_BOTTOM:
          this.y -= this.speed;
          break;
      }
    }

    moveForwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x += this.speed;
          break;
        case DIRECTION_UP:
          this.y -= this.speed;
          break;
        case DIRECTION_LEFT:
          this.x -= this.speed;
          break;
        case DIRECTION_BOTTOM:
          this.y += this.speed;
          break;
      }
    }

    checkCollisions() {
      const xBlock = parseInt((this.x / oneBlockSize).toString());
      const yBlock = parseInt((this.y / oneBlockSize).toString());
      const xBlockP = parseInt((this.x / oneBlockSize + 0.9999).toString());
      const yBlockP = parseInt((this.y / oneBlockSize + 0.9999).toString());

      return (
        map[yBlock][xBlock] === 1 ||
        map[yBlockP][xBlock] === 1 ||
        map[yBlock][xBlockP] === 1 ||
        map[yBlockP][xBlockP] === 1
      );
    }

    checkGhostCollision(ghosts: Ghost[]) {
      for (const ghost of ghosts) {
        if (
          ghost.getMapX() === this.getMapX() &&
          ghost.getMapY() === this.getMapY()
        )
          return true;
      }
      return false;
    }

    changeDirectionIfPossible() {
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

    getMapX() {
      return parseInt(String(this.x / oneBlockSize));
    }

    getMapY() {
      return parseInt(String(this.y / oneBlockSize));
    }

    getMapXRightSide() {
      return parseInt(String((this.x * 0.99 + oneBlockSize) / oneBlockSize));
    }

    getMapYRightSide() {
      return parseInt(String((this.y * 0.99 + oneBlockSize) / oneBlockSize));
    }

    changeAnimation() {
      this.currentFrame =
        this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    draw() {
      if (!canvasContext) return;
      canvasContext.save();
      canvasContext.translate(
        this.x + oneBlockSize / 2,
        this.y + oneBlockSize / 2,
      );
      canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
      canvasContext.translate(
        -this.x - oneBlockSize / 2,
        -this.y - oneBlockSize / 2,
      );
      canvasContext.drawImage(
        pacmanFrames,
        (this.currentFrame - 1) * oneBlockSize,
        0,
        oneBlockSize,
        oneBlockSize,
        this.x,
        this.y,
        this.width,
        this.height,
      );
      canvasContext.restore();
    }
  }

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
  const pacmanFrames = document.getElementById(
    'animation',
  ) as CanvasImageSource;
  const ghostFrames = document.getElementById('ghosts') as CanvasImageSource;

  const createRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
  };

  const DIRECTION_RIGHT = 4;
  const DIRECTION_UP = 3;
  const DIRECTION_LEFT = 2;
  const DIRECTION_BOTTOM = 1;
  let lives = 3;
  const ghostCount = 4;
  const ghostImageLocations = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
  ];

  const fps = 30;
  let pacman: Pacman;
  const oneBlockSize = 20;
  let score = 0;
  let foodCount = 0;
  const ghosts: Ghost[] = [];
  const wallSpaceWidth = oneBlockSize / 1.6;
  const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
  const wallInnerColor = 'black';

  // we now create the map of the walls,
  // if 1 wall, if 0 not wall
  // 21 columns // 23 rows
  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  for (const row of map) {
    for (const r of row) {
      if (r === 2) {
        foodCount++;
      }
    }
  }

  const randomTargetsForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    {
      x: (map[0].length - 2) * oneBlockSize,
      y: (map.length - 2) * oneBlockSize,
    },
  ];

  const createNewPacman = () => {
    pacman = new Pacman(
      oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      oneBlockSize / 5,
    );
  };

  const gameLoop = () => {
    pacman.moveProcess();
    pacman.eat();
    updateGhosts();
    draw();
    if (score >= foodCount) drawWin();
    if (pacman.checkGhostCollision(ghosts)) onGhostCollision();
  };

  const gameLoopId = setInterval(gameLoop, 1000 / fps);

  const onGhostCollision = () => {
    lives--;
    if (lives) {
      createNewPacman();
      createGhosts();
      return;
    }
    drawGameOver();
  };

  const gameOver = () => {
    clearInterval(gameLoopId);
  };

  const drawWin = () => {
    canvasContext.font = '40px Emulogic';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Winner!', 150, 200);
    gameOver();
  };

  const drawGameOver = () => {
    canvasContext.font = '40px Emulogic';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Game Over', 120, 200);

    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(
      350,
      oneBlockSize * map.length + 2,
      oneBlockSize,
      oneBlockSize,
    );
    gameOver();
  };

  const drawFoods = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 2) {
          createRect(
            j * oneBlockSize + oneBlockSize / 3,
            i * oneBlockSize + oneBlockSize / 3,
            oneBlockSize / 3,
            oneBlockSize / 3,
            '#FEB897',
          );
        }
      }
    }
  };

  const drawLives = () => {
    canvasContext.font = '20px Emulogic';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Lives: ', 220, oneBlockSize * (map.length + 1));

    for (let i = 0; i < lives; i++) {
      canvasContext.drawImage(
        pacmanFrames,
        2 * oneBlockSize,
        0,
        oneBlockSize,
        oneBlockSize,
        350 + i * oneBlockSize,
        oneBlockSize * map.length + 2,
        oneBlockSize,
        oneBlockSize,
      );
    }
  };

  const drawScore = () => {
    canvasContext.font = '20px Emulogic';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(
      'Score: ' + score,
      0,
      oneBlockSize * (map.length + 1),
    );
  };

  const draw = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    createRect(0, 0, canvas.width, canvas.height, 'black');
    drawWalls();
    drawFoods();
    drawGhosts();
    pacman.draw();
    drawScore();
    drawLives();
  };

  const drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == 1) {
          createRect(
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            '#342DCA',
          );
          if (j > 0 && map[i][j - 1] == 1) {
            createRect(
              j * oneBlockSize,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth + wallOffset,
              wallSpaceWidth,
              wallInnerColor,
            );
          }

          if (j < map[0].length - 1 && map[i][j + 1] == 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth + wallOffset,
              wallSpaceWidth,
              wallInnerColor,
            );
          }

          if (i < map.length - 1 && map[i + 1][j] == 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth,
              wallSpaceWidth + wallOffset,
              wallInnerColor,
            );
          }

          if (i > 0 && map[i - 1][j] == 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize,
              wallSpaceWidth,
              wallSpaceWidth + wallOffset,
              wallInnerColor,
            );
          }
        }
      }
    }
  };

  class Ghost {
    DEBUG: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    direction: number;
    imageX: number;
    imageY: number;
    imageWidth: number;
    imageHeight: number;
    range: number;
    randomTargetIndex: number;
    target: { x: number; y: number };
    currentFrame?: number;
    frameCount?: number;

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
    ) {
      this.DEBUG = false;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.direction = DIRECTION_RIGHT;
      this.imageX = imageX;
      this.imageY = imageY;
      this.imageHeight = imageHeight;
      this.imageWidth = imageWidth;
      this.range = range;
      this.randomTargetIndex = parseInt(String(Math.random() * 4));
      this.target = randomTargetsForGhosts[this.randomTargetIndex];

      setInterval(() => {
        this.changeRandomDirection();
      }, 10000);
    }

    isInRange() {
      const xDistance = Math.abs(pacman.getMapX() - this.getMapX());
      const yDistance = Math.abs(pacman.getMapY() - this.getMapY());
      return (
        Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
      );
    }

    changeRandomDirection() {
      const addition = 1;
      this.randomTargetIndex += addition;
      this.randomTargetIndex = this.randomTargetIndex % 4;
    }

    moveProcess() {
      if (this.isInRange()) {
        this.target = pacman;
      } else {
        this.target = randomTargetsForGhosts[this.randomTargetIndex];
      }
      this.changeDirectionIfPossible();
      this.moveForwards();
      if (this.checkCollisions()) {
        this.moveBackwards();
      }
    }

    moveBackwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x -= this.speed;
          break;
        case DIRECTION_UP:
          this.y += this.speed;
          break;
        case DIRECTION_LEFT:
          this.x += this.speed;
          break;
        case DIRECTION_BOTTOM:
          this.y -= this.speed;
          break;
      }
    }

    moveForwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x += this.speed;
          break;
        case DIRECTION_UP:
          this.y -= this.speed;
          break;
        case DIRECTION_LEFT:
          this.x -= this.speed;
          break;
        case DIRECTION_BOTTOM:
          this.y += this.speed;
          break;
      }
    }

    checkCollisions() {
      const xBlock = parseInt((this.x / oneBlockSize).toString());
      const yBlock = parseInt((this.y / oneBlockSize).toString());
      const xBlockP = parseInt((this.x / oneBlockSize + 0.9999).toString());
      const yBlockP = parseInt((this.y / oneBlockSize + 0.9999).toString());

      return (
        map[yBlock][xBlock] === 1 ||
        map[yBlockP][xBlock] === 1 ||
        map[yBlock][xBlockP] === 1 ||
        map[yBlockP][xBlockP] === 1
      );
    }

    changeDirectionIfPossible() {
      const tempDirection = this.direction;
      const xTarget = parseInt((this.target.x / oneBlockSize).toString());
      const yTarget = parseInt((this.target.y / oneBlockSize).toString());
      this.direction = this.calculateNewDirection(
        map,
        xTarget,
        yTarget,
      ) as number;
      if (typeof this.direction == 'undefined') {
        this.direction = tempDirection;
        return;
      }
      if (
        this.getMapY() != this.getMapYRightSide() &&
        (this.direction == DIRECTION_LEFT || this.direction == DIRECTION_RIGHT)
      ) {
        this.direction = DIRECTION_UP;
      }
      if (
        this.getMapX() != this.getMapXRightSide() &&
        this.direction == DIRECTION_UP
      ) {
        this.direction = DIRECTION_LEFT;
      }
      this.moveForwards();
      if (this.checkCollisions()) {
        this.moveBackwards();
        this.direction = tempDirection;
      } else {
        this.moveBackwards();
      }
    }

    calculateNewDirection(map: number[][], destX: number, destY: number) {
      const mp = [];
      for (let i = 0; i < map.length; i++) {
        mp[i] = map[i].slice();
      }

      interface neighbor {
        x: number;
        y: number;
        rightX: number;
        rightY: number;
        moves: number[];
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

      return DIRECTION_BOTTOM;
    }

    addNeighbors(
      poped: { x: number; y: number; moves: number[] },
      mp: number[][],
    ) {
      const queue = [];
      const numOfRows = mp.length;
      const numOfColumns = mp[0].length;

      if (
        poped.x - 1 >= 0 &&
        poped.x - 1 < numOfRows &&
        mp[poped.y][poped.x - 1] != 1
      ) {
        const tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_LEFT);
        queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
      }
      if (
        poped.x + 1 >= 0 &&
        poped.x + 1 < numOfRows &&
        mp[poped.y][poped.x + 1] != 1
      ) {
        const tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_RIGHT);
        queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
      }
      if (
        poped.y - 1 >= 0 &&
        poped.y - 1 < numOfColumns &&
        mp[poped.y - 1][poped.x] != 1
      ) {
        const tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_UP);
        queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
      }
      if (
        poped.y + 1 >= 0 &&
        poped.y + 1 < numOfColumns &&
        mp[poped.y + 1][poped.x] != 1
      ) {
        const tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_BOTTOM);
        queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
      }
      return queue;
    }

    getMapX() {
      return parseInt(String(this.x / oneBlockSize));
    }

    getMapY() {
      return parseInt(String(this.y / oneBlockSize));
    }

    getMapXRightSide() {
      return parseInt(String((this.x * 0.99 + oneBlockSize) / oneBlockSize));
    }

    getMapYRightSide() {
      return parseInt(String((this.y * 0.99 + oneBlockSize) / oneBlockSize));
    }

    changeAnimation() {
      if (!this.currentFrame) this.currentFrame = 1;
      this.currentFrame =
        this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    debugMode() {
      if (this.DEBUG) {
        canvasContext.strokeStyle = 'red';
        canvasContext.stroke();
      }
    }

    draw() {
      canvasContext.save();
      canvasContext.drawImage(
        ghostFrames,
        this.imageX,
        this.imageY,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height,
      );
      canvasContext.restore();
      canvasContext.beginPath();
      canvasContext.arc(
        this.x + oneBlockSize / 2,
        this.y + oneBlockSize / 2,
        this.range * oneBlockSize,
        0,
        2 * Math.PI,
      );
      this.debugMode();
    }
  }

  const updateGhosts = () => {
    for (const ghost of ghosts) {
      ghost.moveProcess();
    }
  };

  const drawGhosts = () => {
    for (const ghost of ghosts) {
      ghost.draw();
    }
  };

  const createGhosts = () => {
    ghosts.length = 0;
    for (let i = 0; i < ghostCount; i++) {
      const newGhost = new Ghost(
        9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
        10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        pacman.speed / 2,
        ghostImageLocations[i % 4].x,
        ghostImageLocations[i % 4].y,
        124,
        116,
        6 + i,
      );
      ghosts.push(newGhost);
    }
  };

  createNewPacman();
  createGhosts();
  gameLoop();

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    e.preventDefault();

    const left = ['arrowleft', 'a', 'h'];
    const up = ['arrowup', 'w', 'k'];
    const right = ['arrowright', 'd', 'l'];
    const down = ['arrowdown', 's', 'j'];
    const key = e.key.toLowerCase();

    if (left.indexOf(key) > -1) {
      pacman.nextDirection = DIRECTION_LEFT;
    } else if (up.indexOf(key) > -1) {
      pacman.nextDirection = DIRECTION_UP;
    } else if (right.indexOf(key) > -1) {
      pacman.nextDirection = DIRECTION_RIGHT;
    } else if (down.indexOf(key) > -1) {
      pacman.nextDirection = DIRECTION_BOTTOM;
    }
  });
};

export default function PacmanPage(): JSX.Element {
  const isEN = getLang();

  const refreshGame = () => {
    window.location.reload();
  };

  useEffect(() => {
    game();
  }, []);

  return (
    <div className='m-auto flex h-full w-full flex-col items-center justify-center pb-12'>
      <h1 className='mb-8 text-center text-5xl leading-tight'>Pacman</h1>
      <canvas
        width='420'
        height='485'
        className='border-4 border-zinc-400 dark:border dark:border-zinc-600'
        id='canvas'
      ></canvas>
      <div className='hidden'>
        <img
          id='animation'
          src='/projects/pacman/pacman.gif'
          width='140'
          height='20'
        ></img>
        <img
          id='ghosts'
          src='/projects/pacman/ghost.png'
          width='140'
          height='20'
        ></img>
      </div>
      <div className='my-12 flex flex-shrink space-x-12'>
        <Link href={'/projects'}>
          <button type='button' className='navBtn'>
            {isEN ? 'Return' : 'Voltar'}
          </button>
        </Link>
        <button type='button' className='navBtn' onClick={refreshGame}>
          {isEN ? 'Play' : 'Jogar'}
        </button>
      </div>
    </div>
  );
}
