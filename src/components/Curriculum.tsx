import Link from 'next/link'
import { getLang } from './getLang'

export default function Curriculum() {
  const isEN = getLang()
  return (
    <Link href={'/curriculum'}>
      <button
        id='Curriculum'
        type='button'
        className='text-center absolute py-4 m-auto right-20 top-4 text-base font-medium rounded-md hover:underline customHover'
      >
        {isEN ? 'Resume' : 'Currículo'}
      </button>
    </Link>
  )
}
