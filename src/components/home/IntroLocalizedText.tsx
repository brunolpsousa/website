'use client';

import { LangContext } from '@components/langContextProvider/LangContextProvider';
import { useContext } from 'react';

export default function IntroLocalizedText(): JSX.Element {
  const isEN = useContext(LangContext);
  const en = (
    <>
      Programmer and Analysis and Systems Development student. Looking for
      challenges and continuous learning.
    </>
  );
  const pt = (
    <>
      Programador e estudante de Análise e Desenvolvimento de Sistemas. Em busca
      de desafios e aprendizado contínuo.
    </>
  );
  return isEN ? en : pt;
}
