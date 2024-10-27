import { FallingChar } from './fallingChar';

export class EnterTheMatrix {
  private static instance: EnterTheMatrix | undefined;
  private static destroyFlag: boolean | undefined;
  private static animationFrameId: number | undefined;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private cw!: number;
  private ch!: number;
  private fontSize: number;
  private maxColumns!: number;
  private maxCharCount: number;

  private fallingCharArr: FallingChar[] = [];
  private fallingCharColor: string;

  private frames: number;

  constructor(
    canvas: HTMLCanvasElement,
    fontSize?: number,
    maxCharCount?: number,
  ) {
    this.update = this.update.bind(this);
    this.adjustCanvasSize = this.adjustCanvasSize.bind(this);

    this.canvas = canvas;
    this.ctx = this.canvas?.getContext('2d');
    this.fontSize = fontSize || 13;
    this.maxCharCount = maxCharCount || 50;

    this.fallingCharColor = this.sortColor();

    this.frames = 0;
  }

  public static getInstance(
    canvas?: HTMLCanvasElement,
  ): EnterTheMatrix | undefined {
    if (this.instance) {
      return this.instance;
    }

    if (!canvas) {
      if (typeof document === 'undefined') {
        return;
      }
      canvas = document.getElementById('canvas') as HTMLCanvasElement;
    }

    if (!this.instance) {
      this.instance = new EnterTheMatrix(canvas);
    }
    return this.instance;
  }

  public static destroy(): void {
    this.instance = undefined;
    this.destroyFlag = true;
  }

  public enter(): () => void {
    EnterTheMatrix.destroyFlag = false;
    window.addEventListener('resize', this.adjustCanvasSize, true);

    this.adjustCanvasSize();
    EnterTheMatrix.animationFrameId = requestAnimationFrame(this.update);

    return () => {
      window.removeEventListener('resize', this.adjustCanvasSize, true);
    };
  }

  private update(): void {
    if (!this.ctx) return;

    if (this.fallingCharArr.length > this.maxCharCount) {
      this.fallingCharArr = [];
    }

    if (this.fallingCharArr.length < this.maxCharCount) {
      const fallingChar = new FallingChar(
        Math.floor(Math.random() * this.maxColumns) * this.fontSize,
        (Math.random() * this.ch) / 2 - 50,
      );
      this.fallingCharArr.push(fallingChar);
    }

    this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
    this.ctx.fillRect(0, 0, this.cw, this.ch);

    for (
      let i = 0;
      i < this.fallingCharArr.length && this.frames % 2 == 0;
      i++
    ) {
      this.fallingCharArr[i].draw(
        this.ctx,
        this.fallingCharColor,
        this.ch,
        this.fontSize,
        this.maxColumns,
      );
    }

    if (EnterTheMatrix.destroyFlag && EnterTheMatrix.animationFrameId) {
      return cancelAnimationFrame(EnterTheMatrix.animationFrameId);
    }
    EnterTheMatrix.animationFrameId = requestAnimationFrame(this.update);

    this.frames++;
  }

  private adjustCanvasSize() {
    this.cw = window.innerWidth;
    this.ch = (window.innerHeight / 5) * 4;
    this.canvas.width = this.cw;
    this.canvas.height = this.ch;
    this.maxColumns = this.cw / this.fontSize;
    this.maxCharCount = Math.round(this.cw / 10);
  }

  private sortColor() {
    const randomColor = () => {
      return Math.floor(Math.random() * 257);
    };

    if (Math.floor(Math.random() * 11) < 5) {
      return `rgba(${randomColor()},${randomColor()},${randomColor()})`;
    }
    return 'rgba(0,255,0)';
  }
}
