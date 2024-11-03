'use client';

import { LangContext } from '@components/context/LangContextProvider';
import Link from 'next/link';
import { useContext, useEffect } from 'react';

import { PacmanGame } from './game';

export function Pacman(): JSX.Element {
  const isEN = useContext(LangContext);

  const refreshGame = () => {
    window.location.reload();
  };

  useEffect(() => {
    PacmanGame.getInstance().start();
  }, []);

  return (
    <>
      <Link href={'/projects'}>
        <button type='button' className='navBtn'>
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
      <button type='button' className='navBtn' onClick={refreshGame}>
        {isEN ? 'Play' : 'Jogar'}
      </button>
    </>
  );
}
