'use client';

import LangContext from '@components/context/LangContextProvider';
import { darkThemeIcon, lightThemeIcon } from '@data';
import { lsParse } from '@utils';
import { useEffect } from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const handleStorage = () => {
    const colors = lsParse(window.localStorage.getItem('colors'));
    const favicon = document.getElementById('favicon');
    if (!favicon) return;
    if (colors === 'dark') {
      return favicon.setAttribute('href', darkThemeIcon);
    }
    favicon.setAttribute('href', lightThemeIcon);
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <>
      <LangContext>{children}</LangContext>
    </>
  );
}
