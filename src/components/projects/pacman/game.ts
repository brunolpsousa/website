import {
  DIRECTION,
  fps,
  ghostCount,
  ghostImageLocations,
  oneBlockSize,
  wallInnerColor,
  wallOffset,
  wallSpaceWidth,
} from '@components/projects/pacman/pacman.enum';

import { Common } from './common';
import { Ghost } from './ghost';
import { Pacman } from './pacman';

export class PacmanGame {
  private static instance: PacmanGame | null;

  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private pacman!: Pacman;
  private ghosts: Ghost[];
  private common: Common;
  private pacmanFrames: CanvasImageSource;
  private ghostFrames: CanvasImageSource;
  private intervalIds: NodeJS.Timeout[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.pacmanFrames = document.getElementById(
      'animation',
    ) as CanvasImageSource;
    this.ghostFrames = document.getElementById('ghosts') as CanvasImageSource;
    this.common = new Common();
    this.ghosts = [];
    this.intervalIds = [];
  }

  static getInstance(): PacmanGame {
    if (!this.instance) {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.instance = new PacmanGame(canvas);
    }
    return this.instance;
  }

  start(): void {
    this.intervalIds.push(setInterval(this.gameLoop, 1000 / fps));

    this.createNewPacman();
    this.createGhosts();
    this.gameLoop();

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      e.preventDefault();

      const left = ['arrowleft', 'a', 'h'];
      const up = ['arrowup', 'w', 'k'];
      const right = ['arrowright', 'd', 'l'];
      const down = ['arrowdown', 's', 'j'];
      const key = e.key.toLowerCase();

      if (left.indexOf(key) > -1) {
        this.pacman.nextDirection = DIRECTION.LEFT;
      } else if (up.indexOf(key) > -1) {
        this.pacman.nextDirection = DIRECTION.UP;
      } else if (right.indexOf(key) > -1) {
        this.pacman.nextDirection = DIRECTION.RIGHT;
      } else if (down.indexOf(key) > -1) {
        this.pacman.nextDirection = DIRECTION.BOTTOM;
      }
    });
  }

  static destroy(): void {
    this.instance = null;
  }

  private createRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) => {
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(x, y, width, height);
  };

  private createNewPacman = () => {
    this.pacman = new Pacman(
      oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      oneBlockSize / 5,
      this.common,
      this.pacmanFrames,
      this.canvasContext,
    );
  };

  private gameLoop = () => {
    this.pacman.moveProcess();
    this.pacman.eat();
    this.updateGhosts();
    this.draw();
    if (this.common.getScore() >= this.common.getFoodCount()) this.drawWin();
    if (this.pacman.checkGhostCollision(this.ghosts)) this.onGhostCollision();
  };

  private onGhostCollision = () => {
    this.common.decLives();
    if (this.common.getLives()) {
      this.createNewPacman();
      this.createGhosts();
      return;
    }
    this.drawGameOver();
  };

  private gameOver = () => {
    this.intervalIds.forEach((id) => clearInterval(id));
  };

  private drawWin = () => {
    this.canvasContext.font = '40px Emulogic';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText('Winner!', 150, 200);
    this.gameOver();
  };

  private drawGameOver = () => {
    this.canvasContext.font = '40px Emulogic';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText('Game Over', 120, 200);

    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(
      350,
      oneBlockSize * this.common.getMap().length + 2,
      oneBlockSize,
      oneBlockSize,
    );
    this.gameOver();
  };

  private drawFoods = () => {
    for (let i = 0; i < this.common.getMap().length; i++) {
      for (let j = 0; j < this.common.getMap()[0].length; j++) {
        if (this.common.getMap()[i][j] === 2) {
          this.createRect(
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

  private drawLives = () => {
    this.canvasContext.font = '20px Emulogic';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(
      'Lives: ',
      220,
      oneBlockSize * (this.common.getMap().length + 1),
    );

    for (let i = 0; i < this.common.getLives(); i++) {
      this.canvasContext.drawImage(
        this.pacmanFrames,
        2 * oneBlockSize,
        0,
        oneBlockSize,
        oneBlockSize,
        350 + i * oneBlockSize,
        oneBlockSize * this.common.getMap().length + 2,
        oneBlockSize,
        oneBlockSize,
      );
    }
  };

  private drawScore = () => {
    this.canvasContext.font = '20px Emulogic';
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillText(
      'Score: ' + this.common.getScore(),
      0,
      oneBlockSize * (this.common.getMap().length + 1),
    );
  };

  private draw = () => {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.createRect(0, 0, this.canvas.width, this.canvas.height, 'black');
    this.drawWalls();
    this.drawFoods();
    this.drawGhosts();
    this.pacman.draw();
    this.drawScore();
    this.drawLives();
  };

  private drawWalls = () => {
    for (let i = 0; i < this.common.getMap().length; i++) {
      for (let j = 0; j < this.common.getMap()[0].length; j++) {
        if (this.common.getMap()[i][j] == 1) {
          this.createRect(
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            '#342DCA',
          );
          if (j > 0 && this.common.getMap()[i][j - 1] == 1) {
            this.createRect(
              j * oneBlockSize,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth + wallOffset,
              wallSpaceWidth,
              wallInnerColor,
            );
          }

          if (
            j < this.common.getMap()[0].length - 1 &&
            this.common.getMap()[i][j + 1] == 1
          ) {
            this.createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth + wallOffset,
              wallSpaceWidth,
              wallInnerColor,
            );
          }

          if (
            i < this.common.getMap().length - 1 &&
            this.common.getMap()[i + 1][j] == 1
          ) {
            this.createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth,
              wallSpaceWidth + wallOffset,
              wallInnerColor,
            );
          }

          if (i > 0 && this.common.getMap()[i - 1][j] == 1) {
            this.createRect(
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

  private updateGhosts = () => {
    for (const ghost of this.ghosts) {
      ghost.moveProcess();
    }
  };

  private drawGhosts = () => {
    for (const ghost of this.ghosts) {
      ghost.draw();
    }
  };

  private createGhosts = () => {
    this.ghosts.length = 0;
    for (let i = 0; i < ghostCount; i++) {
      const newGhost = new Ghost(
        9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
        10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        this.pacman.speed / 2,
        ghostImageLocations[i % 4].x,
        ghostImageLocations[i % 4].y,
        124,
        116,
        6 + i,
        this.common.getMap(),
        this.pacman,
        this.ghostFrames,
        this.canvasContext,
      );
      this.ghosts.push(newGhost);
    }
  };
}
