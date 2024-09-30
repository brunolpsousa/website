'use client';

import { all as charArr } from '@data/matrix';
import { getLang } from '@utils/getLang';
import Link from 'next/link';
import { useEffect } from 'react';

const matrix = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let cw = window.innerWidth;
  let ch = (window.innerHeight / 5) * 4;

  canvas.width = cw;
  canvas.height = ch;

  const maxCharCount = 300;
  const fallingCharArr: FallingChar[] = [];
  const fontSize = 13;
  let maxColumns = cw / fontSize;

  let frames = 0;

  window.addEventListener(
    'resize',
    () => {
      cw = window.innerWidth;
      ch = (window.innerHeight / 5) * 4;
      canvas.width = cw;
      canvas.height = ch;
      maxColumns = cw / fontSize;
    },
    true,
  );

  const update = () => {
    if (fallingCharArr.length < maxCharCount) {
      const fallingChar = new FallingChar(
        Math.floor(Math.random() * maxColumns) * fontSize,
        (Math.random() * ch) / 2 - 50,
      );
      fallingCharArr.push(fallingChar);
    }
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, cw, ch);
    for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
      fallingCharArr[i].draw(ctx);
    }

    requestAnimationFrame(update);
    frames++;
  };

  const sortColor = () => {
    const randomColor = () => {
      return Math.floor(Math.random() * 257);
    };
    const n = Math.floor(Math.random() * 11);

    if (n < 5)
      return `rgba(${randomColor()},${randomColor()},${randomColor()})`;
    return 'rgba(0,255,0)';
  };

  const fallingCharColor = sortColor();

  class FallingChar {
    x: number;
    y: number;
    value?: string;
    speed?: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
      this.value =
        charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
      this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

      ctx.fillStyle = fallingCharColor;
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

  update();
};

export default function MatrixPage(): JSX.Element {
  const isEN = getLang();

  useEffect(() => {
    matrix();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center pb-12 m-auto w-full'>
      <canvas id='canvas'></canvas>
      <div className='flex flex-shrink my-12 space-x-12'>
        <Link href={'/projects'}>
          <button type='button' className='navBtn'>
            {isEN ? 'Return' : 'Voltar'}
          </button>
        </Link>
      </div>
    </div>
  );
}
