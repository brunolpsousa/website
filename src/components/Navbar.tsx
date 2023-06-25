import Link from 'next/link'
import ButtonLang from './ButtonLang'
import ButtonTheme from './ButtonTheme'
import { getLang } from '../utils/getLang'
import { useEffect } from 'react'

export default function Navbar() {
  const isEN = getLang()
  useEffect(() => {
    const currentPath = window.location.pathname.split('/')[1]
    const getNavItems = document.querySelectorAll('.navItem')
    for (let i = 0; i < getNavItems.length; i++) {
      getNavItems[i].id === currentPath
        ? getNavItems[i].classList.add('hidden')
        : getNavItems[i].classList.remove('hidden')
    }
  })
  return (
    <ul className='font-medium flex flex-row place-content-end items-center relative py-2 px-0 md:px-2 pb-8 top-0 w-[97vw]'>
      <li id='buttonTheme' className='navItem absolute left-0'>
        <ButtonTheme />
      </li>
      <li className='navItem'>
        <Link href='/'>{isEN ? 'Home' : 'Início'}</Link>
      </li>
      <li id='projects' className='navItem'>
        <Link href='/projects'>{isEN ? 'Projects' : 'Projetos'}</Link>
      </li>
      <li id='curriculum' className='navItem'>
        <Link href='/curriculum'>{isEN ? 'Resume' : 'Currículo'}</Link>
      </li>
      <li id='buttonLang' className='navItem hover:no-underline'>
        <ButtonLang />
      </li>
    </ul>
  )
}
