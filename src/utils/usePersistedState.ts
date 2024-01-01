// Ref: https://youtu.be/ngVU74daJ8Y

import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [value, setValue] = useState(() => {
    const persistedValue =
      typeof window !== 'undefined' ? localStorage.getItem(key) : false
    if (persistedValue) {
      return JSON.parse(persistedValue)
    } else {
      return initialState
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export default usePersistedState
