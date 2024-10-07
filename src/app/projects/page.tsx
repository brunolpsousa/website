'use client';

import { LangContext } from '@components/context/LangContextProvider';
import Link from 'next/link';
import { useContext } from 'react';

export default function ProjectsPage(): JSX.Element {
  const isEN = useContext(LangContext);

  return (
    <>
      <div className='m-auto flex flex-col items-center justify-center pb-12'>
        <h1 className='mb-3 text-5xl font-medium'>
          {isEN ? 'Projects' : 'Projetos'}
        </h1>
        <ul className='m-3 p-16 text-center text-2xl'>
          {/* <li className='customHover m-1'> */}
          {/*   <Link href={'projects/dino'}>Dino</Link> */}
          {/* </li> */}
          <li className='customHover m-1'>
            <Link href={'projects/hangman'}>{isEN ? 'Hangman' : 'Forca'}</Link>
          </li>
          <li className='customHover m-1'>
            <Link href={'projects/matrix'}>Matrix</Link>
          </li>
          {/* <li className='customHover m-1'> */}
          {/*   <Link href={'projects/memory'}>{isEN ? 'Memory' : 'Memória'}</Link> */}
          {/* </li> */}
          {/* <li className='customHover m-1'> */}
          {/*   <Link href={'projects/pacman'}>Pacman</Link> */}
          {/* </li> */}
          <li className='customHover m-1'>
            <Link href={'projects/snake'}>Snake</Link>
          </li>
        </ul>
        <ul className='customHover hover:underline'>
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
