'use client';

import { auto, moon, sun } from '@data/buttonThemeIcons';
import { usePersistedState } from '@utils/usePersistedState';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ButtonTheme(): JSX.Element {
  const [theme, setTheme] = usePersistedState<string>('theme', 'auto');
  const [colors, setColors] = usePersistedState<string>('colors', 'light');
  const [icon, setIcon] = useState<JSX.Element>(auto);

  const setLight = () => {
    document.documentElement.classList.remove('dark');
    setColors('light');
  };
  const setDark = () => {
    document.documentElement.classList.add('dark');
    setColors('dark');
  };

  const toggleTheme = () => {
    setTheme(
      theme === 'light' || theme === 'dark'
        ? 'auto'
        : theme === 'auto' && colors === 'dark'
          ? 'light'
          : 'dark',
    );
  };

  useEffect(() => {
    const mMedia = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ((mMedia && theme === 'auto') || theme === 'dark') {
      setDark();
    } else {
      setLight();
    }
    setIcon(theme === 'light' ? sun : theme === 'dark' ? moon : auto);
  }, [theme]);

  useEffect(() => {
    const mMedia = window.matchMedia('(prefers-color-scheme: dark)');
    mMedia.onchange = () => {
      if (JSON.parse(localStorage.theme) === 'auto') {
        if (mMedia.matches) {
          return setDark();
        }
        setLight();
      }
    };
  }, []);

  return (
    <Link href={''} onClick={toggleTheme}>
      <button className='p-2 bg-violet-300 dark:bg-yellow-200 text-lg text-white dark:text-zinc-700 rounded-md'>
        {icon}
      </button>
    </Link>
  );
}
