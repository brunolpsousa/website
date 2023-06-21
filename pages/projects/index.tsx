import Link from 'next/link'
import { getLang } from '../../src/components/getLang'

export default function Projects() {
  const isEN = getLang()

  return (
    <div className='flex flex-col items-center justify-center h-screen m-auto'>
      <h1 className='text-3xl md:text-4xl mb-3 font-medium'>
        {isEN ? 'Projects' : 'Projetos'}
      </h1>
      <ul className='p-16 text-base md:text-xl m-3'>
        <li className='hover:underline customHover'>
          <Link href={'projects/hangman'}>
            {isEN ? 'Hangman' : 'Jogo da Forca'}
          </Link>
        </li>
      </ul>
      <Link href={'/'}>
        <button id='ReturnButton' type='button' className='navBtn my-8'>
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </div>
  )
}
