'use client';

import { LangContext } from '@components/context/LangContextProvider';
import { useContext, useEffect } from 'react';

import { EnterTheMatrix } from './matrix';

export function Matrix(): JSX.Element {
  const isEN = useContext(LangContext);
  EnterTheMatrix.destroy();

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    EnterTheMatrix.getInstance(canvas)?.enter();
  }, []);

  return (
    <button
      type='button'
      className='navBtn'
      onClick={() => EnterTheMatrix.destroy()}
    >
      {isEN ? 'Return' : 'Voltar'}
    </button>
  );
}
