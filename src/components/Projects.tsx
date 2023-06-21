import Link from 'next/link'
import { getLang } from './getLang'

export default function Projects() {
  const isEN = getLang()
  return (
    <Link href={'/projects'}>
      <button
        id='Projects'
        type='button'
        className='text-center absolute py-4 m-auto right-44 top-4 text-base font-medium rounded-md hover:underline customHover'
      >
        {isEN ? 'Projects' : 'Projetos'}
      </button>
    </Link>
  )
}
