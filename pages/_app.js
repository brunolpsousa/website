import '../src/style/global.css'
import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import ButtomTheme from '../src/components/ButtonTheme'
import Footer from '../src/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const [autoSVG, setAutoSVG] = useState(false)
  useEffect(() => {
    // const url = 'brunolpsousa.duckdns.org'
    // const hostname = window.location.hostname
    // if (hostname !== url && hostname !== 'localhost') {
    //   window.location.replace('https://' + url + window.location.href.split('duckdns.org')[1])
    // }
    setAutoSVG(document.documentElement.classList.contains('dark'))
    document.querySelector('body').classList.add('bg-stone-50')
    document.querySelector('body').classList.add('dark:bg-stone-900')
  })

  const getIcon = () => {
    const icon = autoSVG === true ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAKlBMVEUAAAD///////////// ///////////+//////7//v/+/v/+//7+/v7//v7hvSmpAAAABnRSTlMAEM+/0MD0NtDBAAAAAWJL R0QB/wIt3gAAAAd0SU1FB+cEBAQ6OcDSTqAAAAB2SURBVBjTY2CgAhAyYGBgUYSwGdUCGBhYiwQg Ei1AmtETLMWo5QiiRJJAUkJLwAoYvYFSjBqOEK0iTQIMLC0CUHPcDBhYJwkgDGX0gNogdAQoKnIJ YoA2SC+jD1hKqAQsJgKynFETYiijJ8htMENFQG5zpIaXAY/fDk3GrDYOAAAAJXRFWHRkYXRlOmNy ZWF0ZQAyMDIzLTA0LTA0VDAyOjU4OjU3KzAyOjAwLS8rSwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAy My0wNC0wNFQwMjo1ODo1NyswMjowMFxyk/cAAAAASUVORK5CYII=' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAgVBMVEUAAAAAABAAAAEBAQEB AQABAQAQABAAAQAAAQAAAAEBAAAAEAAAAQAQEAAAAAAAAQEAAAABAAEBAAEQAAABAAAAEBABAQEB AQEAAQEAAQAAAQEAAAABAQAQEBAAAAEBAQAAAAABAQEAAQABAQABAAAAAAAAAQEAAAEBAQEBAAH/ //8ed3TyAAAAInRSTlMAEM+/0M8Qz8DAzxDQENDPEM/QENAQz9DQv8DPwBDQv8DAx3lsvAAAAAFi S0dEKlO+1J4AAAAHdElNRQfnBAQEOh380apxAAAAoUlEQVQoz8VPbRaCIBAUUyzAj0DCorRERO5/ weKhCSdw/+zs7NuZ2SQ5vkB68iDLQcjDYjx7dFEIBzxSZB3LaqrhxjdXTf8Da+eUrfq5oYEwqJaU O4BvlvDQkLemdsLC0iaOCDtz/7WHliBe8Hp6Ojcxy+iklKPAXlPLwAQjvXk2rd7/LQu1Z+fEbP++ kOqDc9gvg0edpSxKKN4efDKcHF9fSUMJPwflwVIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDQt MDRUMDI6NTg6MjkrMDI6MDB31VkPAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA0LTA0VDAyOjU4 OjI5KzAyOjAwBojhswAAAABJRU5ErkJggg=='
    return icon
  }

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta name='description' content='Personal Website' />
        <meta
          name='keywords'
          content='HTML, CSS, JavaScript, TypeScript, React, NextJS'
        />
        <meta name='author' content='Bruno Sousa' />
        <title>Bruno Sousa</title>
        <link rel='icon' type='image/svg+xml' href={getIcon()} />
      </Head>
      <main>
        <ButtomTheme />
        <div className='bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200'>
          <div className='flex flex-col items-center h-screen max-w-5xl w-11/12 m-auto'>
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
      </main>
    </>
  )
}
