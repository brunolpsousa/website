'use client';

import { LangContext } from '@components/context/LangContextProvider';
import Link from 'next/link';
import { useContext } from 'react';

export default function NavbarItems({ path }: { path: string }): JSX.Element {
  const isEN = useContext(LangContext);

  const hideNavLink = (currentPath: string) => {
    if (path === currentPath) {
      return 'hidden';
    }
  };

  return (
    <>
      <li id='' className={`navItem ${hideNavLink('/')}`}>
        <Link href='/'>{isEN ? 'Home' : 'Início'}</Link>
      </li>
      <li id='projects' className={`navItem ${hideNavLink('/projects')}`}>
        <Link href='/projects'>{isEN ? 'Projects' : 'Projetos'}</Link>
      </li>
      <li id='curriculum' className={`navItem ${hideNavLink('/curriculum')}`}>
        <Link href='/curriculum'>{isEN ? 'Resume' : 'Currículo'}</Link>
      </li>
      <li id='contact' className={`navItem ${hideNavLink('/contact')}`}>
        <Link href='/contact'>{isEN ? 'Contact' : 'Contato'}</Link>
      </li>
    </>
  );
}
