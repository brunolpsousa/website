import { useState, useEffect } from 'react'

export default function ButtonTheme() {
  const [theme, setTheme] = useState(0)

  useEffect(() => {
    if (!('theme' in localStorage)) {
      return
    } else if (localStorage.theme === 'light') {
      setTheme(1)
    } else if (localStorage.theme === 'dark') {
      setTheme(2)
    }
  }, [])

  const handleThemeSwitch = () => {
    setTheme((theme + 1) % 3)
  }

  useEffect(() => {
    if (theme === 0) {
      localStorage.removeItem('theme')
      if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else if (theme === 1) {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    } else if (theme === 2) {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    }
  }, [theme])

  const sun = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
      />
    </svg>
  )

  const moon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
      />
    </svg>
  )

  const auto = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='2' y='3' width='20' height='14' rx='2' ry='2'></rect>
      <line x1='8' y1='21' x2='16' y2='21'></line>
      <line x1='12' y1='17' x2='12' y2='21'></line>
    </svg>
  )

  const getIcon = () => {
    if (theme === 1) {
      return sun
    } else if (theme === 2) {
      return moon
    } else {
      return auto
    }
  }

  return (
    <button
      type='button'
      onClick={handleThemeSwitch}
      className='fixed p-2 z-10 right-8 top-4 bg-violet-300 dark:bg-yellow-200 text-lg text-white dark:text-stone-700 rounded-md'
    >
      {getIcon()}
    </button>
  )
}
