import Link from 'next/link'
import { getLang } from '../src/components/getLang'

export default function Projects() {
  const isEN = getLang()

  return (
    <div className='flex flex-col items-center justify-center h-screen m-auto'>
      <h1 className='text-3xl md:text-4xl text-stone-600 dark:text-stone-100 mb-3 font-medium'>
        {isEN ? 'Projects' : 'Projetos'}
      </h1>
      <ul className='p-16 text-base md:text-xl text-stone-500 dark:text-stone-200 m-3 hover:underline hover:text-blue-600 hover:dark:text-blue-400'>
        <Link href={'/hangman'}>
          <li >
            {isEN ? 'Hangman' : 'Jogo da Forca'}
          </li>
        </Link>
      </ul>
      <Link href={'/'}>
        <button
          id='ReturnButton'
          type='button'
          className='text-center inline-block my-8 px-8 py-3 w-max text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
        >
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </div>
  )
}
