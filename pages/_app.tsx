import '@style/main.css'
import Head from 'next/head'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const darkThemeIcon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAKlBMVEUAAAD///////////// ///////////+//////7//v/+/v/+//7+/v7//v7hvSmpAAAABnRSTlMAEM+/0MD0NtDBAAAAAWJL R0QB/wIt3gAAAAd0SU1FB+cEBAQ6OcDSTqAAAAB2SURBVBjTY2CgAhAyYGBgUYSwGdUCGBhYiwQg Ei1AmtETLMWo5QiiRJJAUkJLwAoYvYFSjBqOEK0iTQIMLC0CUHPcDBhYJwkgDGX0gNogdAQoKnIJ YoA2SC+jD1hKqAQsJgKynFETYiijJ8htMENFQG5zpIaXAY/fDk3GrDYOAAAAJXRFWHRkYXRlOmNy ZWF0ZQAyMDIzLTA0LTA0VDAyOjU4OjU3KzAyOjAwLS8rSwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAy My0wNC0wNFQwMjo1ODo1NyswMjowMFxyk/cAAAAASUVORK5CYII='
  const lightThemeIcon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAgVBMVEUAAAAAABAAAAEBAQEB AQABAQAQABAAAQAAAQAAAAEBAAAAEAAAAQAQEAAAAAAAAQEAAAABAAEBAAEQAAABAAAAEBABAQEB AQEAAQEAAQAAAQEAAAABAQAQEBAAAAEBAQAAAAABAQEAAQABAQABAAAAAAAAAQEAAAEBAQEBAAH/ //8ed3TyAAAAInRSTlMAEM+/0M8Qz8DAzxDQENDPEM/QENAQz9DQv8DPwBDQv8DAx3lsvAAAAAFi S0dEKlO+1J4AAAAHdElNRQfnBAQEOh380apxAAAAoUlEQVQoz8VPbRaCIBAUUyzAj0DCorRERO5/ weKhCSdw/+zs7NuZ2SQ5vkB68iDLQcjDYjx7dFEIBzxSZB3LaqrhxjdXTf8Da+eUrfq5oYEwqJaU O4BvlvDQkLemdsLC0iaOCDtz/7WHliBe8Hp6Ojcxy+iklKPAXlPLwAQjvXk2rd7/LQu1Z+fEbP++ kOqDc9gvg0edpSxKKN4efDKcHF9fSUMJPwflwVIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDQt MDRUMDI6NTg6MjkrMDI6MDB31VkPAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA0LTA0VDAyOjU4 OjI5KzAyOjAwBojhswAAAABJRU5ErkJggg=='
  const [favicon, setFavicon] = useState(darkThemeIcon)

  useEffect(() => {
    const colors = JSON.parse(window.localStorage.colors)
    setFavicon(colors === 'dark' ? darkThemeIcon : lightThemeIcon)
  })

  return (
    <>
      <Head>
        <title>Bruno Sousa</title>
        <meta name='author' content='Bruno Sousa' />
        <meta name='description' content='Personal Website' />
        <link rel='icon' type='image/svg+xml' href={favicon} />
        <meta
          name='keywords'
          content='Portfolio, HTML, CSS, JavaScript, TypeScript, React, Next.js'
        />
        <meta property='og:url' content='https://brunolpsousa.vercel.app' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Bruno Sousa' />
        <meta property='og:description' content='Personal Website' />
        <meta
          property='og:image'
          content='https://brunolpsousa.vercel.app/assets/share_link.png'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='brunolpsousa.vercel.app' />
        <meta
          property='twitter:url'
          content='https://brunolpsousa.vercel.app'
        />
        <meta name='twitter:title' content='Bruno Sousa' />
        <meta name='twitter:description' content='Personal Website' />
        <meta
          name='twitter:image'
          content='https://brunolpsousa.vercel.app/assets/share_link.png'
        />
      </Head>

      <main className='flex flex-col items-center m-auto h-screen max-w-5xl w-11/12'>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>

      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily}, sans-serif;
        }
      `}</style>
    </>
  )
}
