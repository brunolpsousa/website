'use client';

import LangContext from '@components/context/LangContextProvider';
import { darkThemeIcon, lightThemeIcon } from '@data';
import { lsParse } from '@utils';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [favicon, setFavicon] = useState(darkThemeIcon);

  useEffect(() => {
    const colors = lsParse(localStorage.colors);
    setFavicon(colors === 'dark' ? darkThemeIcon : lightThemeIcon);

    const mMedia = window.matchMedia('(prefers-color-scheme: dark)');
    mMedia.onchange = () => {
      const theme = lsParse(localStorage.theme);
      if (theme === 'auto') {
        return setFavicon(mMedia.matches ? darkThemeIcon : lightThemeIcon);
      }
      setFavicon(theme === 'dark' ? darkThemeIcon : lightThemeIcon);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel='icon' type='image/svg+xml' href={favicon} />
      </Head>
      <LangContext>{children}</LangContext>
    </>
  );
}
