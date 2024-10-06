'use client';

import { lsParse } from '@utils';
import { useEffect, useState } from 'react';

export function langProvider(): {
  isEn: boolean;
  setIsEn: (isEn: boolean) => void;
} {
  const [isEn, setIsEn] = useState(false);

  const handleStorage = () => {
    const lang = lsParse(window.localStorage.getItem('lang'));
    setIsEn(lang === 'en');
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return { isEn, setIsEn };
}
