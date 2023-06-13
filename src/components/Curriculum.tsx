import Link from 'next/link'
import { getLang } from './getLang'

export default function Curriculum() {
  const isEN = getLang()
  return (
    <Link href={'/curriculum'}>
      <button
        id='Curriculum'
        type='button'
        className='text-center absolute py-4 m-auto right-28 top-4 text-base font-medium rounded-md hover:underline hover:text-blue-600 hover:dark:text-blue-400'
      >
        {isEN ? 'Resume' : 'Currículo'}
      </button>
    </Link>
  )
}
