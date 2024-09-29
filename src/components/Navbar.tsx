import Link from 'next/link'
import ButtonLang from './ButtonLang'
import ButtonTheme from './ButtonTheme'
import getLang from '@utils/getLang'

export default (props: any) => {
  const isEN = getLang()

  const navLinkHide = (currentPath: string) => {
    if (props.path === currentPath) {
      return 'hidden'
    }
  }

  return (
    <ul
      id='navbar'
      className='font-medium flex flex-row place-content-end items-center relative mb-8 pb-8 top-2 w-full'
    >
      <li id='buttonTheme' className='navItem absolute left-0'>
        <ButtonTheme />
      </li>
      <li className={navLinkHide('/')}>
        <Link href='/'>{isEN ? 'Home' : 'Início'}</Link>
      </li>
      <li id='projects' className={navLinkHide('/projects')}>
        <Link href='/projects'>{isEN ? 'Projects' : 'Projetos'}</Link>
      </li>
      <li id='curriculum' className={navLinkHide('/curriculum')}>
        <Link href='/curriculum'>{isEN ? 'Resume' : 'Currículo'}</Link>
      </li>
      <li id='buttonLang' className={'navItem hover:no-underline ' + navLinkHide('/')}>
        <ButtonLang />
      </li>
    </ul>
  )
}
