"use client"

import { useState, useEffect } from 'react'
import usePersistedState from '@utils/usePersistedState'
import Router from 'next/router'
import {sun, moon, auto} from '@data/buttonThemeIcons'

export default function ButtonTheme () {
  const [theme, setTheme] = usePersistedState<string>('theme', 'auto')
  const [colors, setColors] = usePersistedState<string>('colors', 'light')
  const [icon, setIcon] = useState<JSX.Element>(auto)

  const setLight = () => {
    document.documentElement.classList.remove('dark')
    setColors('light')
  }
  const setDark = () => {
    document.documentElement.classList.add('dark')
    setColors('dark')
  }

  const toggleTheme = () => {
    setTheme(
      theme === 'light' || theme === 'dark'
        ? 'auto'
        : theme === 'auto' && colors === 'dark'
          ? 'light'
          : 'dark',
    )
    Router.replace(Router.asPath, undefined, { scroll: false })
  }

  useEffect(() => {
    const mMedia = window.matchMedia('(prefers-color-scheme: dark)').matches
    ;(mMedia && theme === 'auto') || theme === 'dark' ? setDark() : setLight()
    setIcon(theme === 'light' ? sun : theme === 'dark' ? moon : auto)
  }, [theme])

  useEffect(() => {
    const mMedia = window.matchMedia('(prefers-color-scheme: dark)')
    mMedia.onchange = () => {
      if (JSON.parse(localStorage.theme) === 'auto') {
        mMedia.matches ? setDark() : setLight()
      }
    }
  }, [])

  return (
    <button
      onClick={toggleTheme}
      className='p-2 bg-violet-300 dark:bg-yellow-200 text-lg text-white dark:text-zinc-700 rounded-md'
    >
      {icon}
    </button>
  )
}
