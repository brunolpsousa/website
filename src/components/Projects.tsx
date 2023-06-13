import Link from 'next/link'
import { getLang } from './getLang'

export default function Projects() {
  const isEN = getLang()
  return (
    <Link href={'/projects'}>
      <button
        id='Projects'
        type='button'
        className='text-center absolute py-4 m-auto right-48 top-4 text-base font-medium rounded-md hover:underline hover:text-blue-600 hover:dark:text-blue-400'
      >
        {isEN ? 'Projects' : 'Projetos'}
      </button>
    </Link>
  )
}
