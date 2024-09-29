'use client'

import Head from 'next/head'
import { useState, useEffect } from 'react'
import { lightThemeIcon, darkThemeIcon } from '@data/icon'
import { lsParse } from '@utils/localStorageJsonParse'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [favicon, setFavicon] = useState(darkThemeIcon)

  useEffect(() => {
    const colors = lsParse(localStorage.colors)
    setFavicon(colors === 'dark' ? darkThemeIcon : lightThemeIcon)

    const mMedia = window.matchMedia('(prefers-color-scheme: dark)')
    mMedia.onchange = () => {
      const theme = lsParse(localStorage.theme)
      if (theme === 'auto') {
        return setFavicon(mMedia.matches ? darkThemeIcon : lightThemeIcon)
      }
      setFavicon(theme === 'dark' ? darkThemeIcon : lightThemeIcon)
    }
  })

  return (
    <>
      <Head>
        <link rel='icon' type='image/svg+xml' href={favicon} />
      </Head>
      <main >
        {/* <Navbar path={path} /> */}
        {children}
      </main>

      {/* <style jsx global>{` */}
      {/*   html { */}
      {/*     font-family: ${inter.style.fontFamily}, sans-serif; */}
      {/*   } */}
      {/* `}</style> */}
    </>
  )
}
