'use client'

import Head from 'next/head'
import { useState, useEffect } from 'react'
import { lightThemeIcon, darkThemeIcon } from '@data/icon'
import Navbar from '@components/Navbar'

export default ({ children }: any) => {
  const [favicon, setFavicon] = useState(darkThemeIcon)

  useEffect(() => {
    const colors = localStorage.colors?.length ? JSON.parse(localStorage.colors) : ''
    setFavicon(colors === 'dark' ? darkThemeIcon : lightThemeIcon)

    const mMedia = window.matchMedia('(prefers-color-scheme: dark)')
    mMedia.onchange = () => {
      const theme = localStorage.theme?.length ? JSON.parse(localStorage.theme) : ''
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
        <Navbar path='/'/>
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
