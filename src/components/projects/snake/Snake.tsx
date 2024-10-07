'use client';

import { LangContext } from '@components/context/LangContextProvider';
import { useContext, useEffect } from 'react';

import { SnakeGame } from './game';

export default function Snake(): JSX.Element {
  const isEN = useContext(LangContext);
  SnakeGame.destroy();

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    SnakeGame.getInstance(canvas)?.start();
  }, []);

  return (
    <button
      type='button'
      className='navBtn'
      onClick={() => SnakeGame.destroy()}
    >
      {isEN ? 'Return' : 'Voltar'}
    </button>
  );
}
