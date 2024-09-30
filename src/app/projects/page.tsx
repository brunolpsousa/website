'use client';

import Navbar from '@components/navbar/Navbar';
import { getLang } from '@utils/getLang';
import Link from 'next/link';

export default function ProjectsPage(): JSX.Element {
  const isEN = getLang();

  return (
    <>
      <Navbar path='/projects' />
      <div className='flex flex-col items-center justify-center pb-12 m-auto'>
        <h1 className='text-5xl mb-3 font-medium'>
          {isEN ? 'Projects' : 'Projetos'}
        </h1>
        <ul className='text-2xl text-center p-16 m-3'>
          <li className='customHover m-1'>
            <Link href={'projects/dino'}>Dino</Link>
          </li>
          <li className='customHover m-1'>
            <Link href={'projects/hangman'}>{isEN ? 'Hangman' : 'Forca'}</Link>
          </li>
          <li className='customHover m-1'>
            <Link href={'projects/matrix'}>Matrix</Link>
          </li>
          <li className='customHover m-1'>
            <Link href={'projects/memory'}>{isEN ? 'Memory' : 'Memória'}</Link>
          </li>
          <li className='customHover m-1'>
            <Link href={'projects/pacman'}>Pacman</Link>
          </li>
          <li className='customHover m-1'>
            <Link href={'projects/snake'}>Snake</Link>
          </li>
        </ul>
        <ul className='hover:underline customHover'>
          <Link
            className='extLink'
            href={'https://github.com/brunolpsousa'}
            target='_blank'
          >
            {isEN ? 'See more at GitHub' : 'Ver mais no GitHub'}
          </Link>
        </ul>
        <Link href={'/'}>
          <button className='navBtn my-8'>{isEN ? 'Return' : 'Voltar'}</button>
        </Link>
      </div>
    </>
  );
}
