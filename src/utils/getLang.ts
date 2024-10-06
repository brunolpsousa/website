'use client';

import { lsParse } from '@utils';
import { useEffect, useReducer, useState } from 'react';

export function getLang(): boolean {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [langEN, setLangEN] = useState(false);

  useEffect(() => {
    const lang = lsParse(window.localStorage.getItem('lang'));
    setLangEN(lang === 'en');
    forceUpdate();
  });

  return langEN;
}
