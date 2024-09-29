"use client"

import Link from 'next/link'
import {getLang} from '@utils/getLang'

export default function NavbarItems ({path}: {path: string}) {
  const isEN = getLang()

  const navLinkHide = (currentPath: string) => {
    if (path === currentPath) {
      return 'hidden'
    }
  }

  return (
    < >
      <li className={`navItem ${navLinkHide('/')}`}>
        <Link href='/'>{isEN ? 'Home' : 'Início'}</Link>
      </li>
      <li id='projects' className={`navItem ${navLinkHide('/projects')}`}>
        <Link href='/projects'>{isEN ? 'Projects' : 'Projetos'}</Link>
      </li>
      <li id='curriculum' className={`navItem ${navLinkHide('/curriculum')}`}>
        <Link href='/curriculum'>{isEN ? 'Resume' : 'Currículo'}</Link>
      </li>
    </>
  )
}
