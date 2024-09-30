'use client';

import { useEffect, useState } from 'react';

import { lsParse } from '.';

export const getLang = (): boolean => {
  const [langEN, setLangEN] = useState(false);
  useEffect(() => {
    const lang = lsParse(window.localStorage.lang);
    setLangEN(lang === 'en');
  });
  return langEN;
};
