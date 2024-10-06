'use client';

import { LangContext } from '@components/langContextProvider/LangContextProvider';
import Link from 'next/link';
import { useContext } from 'react';

export default function NavbarItems({ path }: { path: string }): JSX.Element {
  const isEN = useContext(LangContext);

  const navLinkHide = (currentPath: string) => {
    if (path === currentPath) {
      return 'hidden';
    }
  };

  return (
    <>
      <li className={`navItem ${navLinkHide('/')}`}>
        <Link href='/'>{isEN ? 'Home' : 'Início'}</Link>
      </li>
      <li id='projects' className={`navItem ${navLinkHide('/projects')}`}>
        <Link href='/projects'>{isEN ? 'Projects' : 'Projetos'}</Link>
      </li>
      <li id='curriculum' className={`navItem ${navLinkHide('/curriculum')}`}>
        <Link href='/curriculum'>{isEN ? 'Resume' : 'Currículo'}</Link>
      </li>
    </>
  );
}
