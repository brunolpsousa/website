import Link from 'next/link'
import ButtonLang from './ButtonLang'
import ButtonTheme from './ButtonTheme'
import { getLang } from './getLang'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const isEN = getLang()
  const homeLink = () => {
    const [currentPath, setCurrentPath] = useState(false)
    useEffect(() => {
      setCurrentPath(window.location.pathname !== '/')
    })
    return currentPath ? (
      <li className='navItem'>
        <Link href='/'>{isEN ? 'Home' : 'Início'}</Link>
      </li>
    ) : null
  }
  return (
    <ul className='font-medium relative p-2 pb-8 top-0 w-screen'>
      <li className='navItem float-left'>
        <ButtonTheme />
      </li>
      <li className='navItem hover:no-underline'>
        <ButtonLang />
      </li>
      <li id='curriculum' className='navItem'>
        <Link href='/curriculum'>{isEN ? 'Resume' : 'Currículo'}</Link>
      </li>
      <li id='projects' className='navItem'>
        <Link href='/projects'>{isEN ? 'Projects' : 'Projetos'}</Link>
      </li>
      {homeLink()}
    </ul>
  )
}
