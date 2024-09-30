'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(
  key: string,
  initialState: T,
): Response<T> {
  const [value, setValue] = useState(() => {
    const persistedValue =
      typeof window !== 'undefined' ? localStorage.getItem(key) : false;
    if (persistedValue) {
      return JSON.parse(persistedValue);
    }
    return initialState;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
