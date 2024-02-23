// import Link from 'next/link'
import ButtonLang from './ButtonLang'
import ButtonTheme from './ButtonTheme'
// import getLang from '@utils/getLang'
// import { useEffect } from 'react'

export default () => {
  // const isEN = getLang()

  // const navLinkHide = (currentPath: string) => {
  //   const getNavLinks = document.querySelectorAll('.navItem')
  //   for (const link of getNavLinks) {
  //     link.id === currentPath
  //       ? link.classList.add('hidden')
  //       : link.classList.remove('hidden')
  //   }
  // }

  // useEffect(() => {
  //   navLinkHide(window.location.pathname.split('/')[1])
  // })

  return (
    <ul
      id='navbar'
      className='font-medium flex flex-row place-content-end items-center relative mb-8 pb-8 top-2 w-full'
    >
      <li id='buttonTheme' className='navItem absolute left-0'>
        <ButtonTheme />
      </li>
      {/* <li className='navItem'> */}
      {/*   <Link href='/'>{isEN ? 'Home' : 'Início'}</Link> */}
      {/* </li> */}
      {/* <li id='projects' className='navItem'> */}
      {/*   <Link href='/projects'>{isEN ? 'Projects' : 'Projetos'}</Link> */}
      {/* </li> */}
      {/* <li id='curriculum' className='navItem'> */}
      {/*   <Link href='/curriculum'>{isEN ? 'Resume' : 'Currículo'}</Link> */}
      {/* </li> */}
      <li id='buttonLang' className='navItem hover:no-underline'>
        <ButtonLang />
      </li>
    </ul>
  )
}
