'use client';

import { LangContext } from '@components/context/LangContextProvider';
import { useContext } from 'react';

export default function IntroLocalizedText(): JSX.Element {
  const isEN = useContext(LangContext);
  const en = (
    <>
      Backend Programmer{' '}
      <a href='https://compass.uol' target='_blank' rel='noreferrer'>
        @Compass.UOL
      </a>
    </>
  );
  const pt = (
    <>
      Programador backend{' '}
      <a href='https://compass.uol' target='_blank' rel='noreferrer'>
        @Compass.UOL
      </a>
    </>
  );
  return isEN ? en : pt;
}
