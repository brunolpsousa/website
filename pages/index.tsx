import Intro from '../src/components/Intro'
import Timeline from '../src/components/Timeline'
import Contact from '../src/components/Contact'
import Link from 'next/link'
import { localLang } from '../src/components/localLang'

export default function Index() {
  const Cv = () => {
    return (
      <Link href={'/curriculum'}>
        <button
          id='ReturnButton'
          type='button'
          className='text-center fixed py-4 m-auto right-28 top-4 text-base font-medium rounded-md hover:underline hover:text-blue-600 hover:dark:text-blue-400'
        >
          {localLang() ? 'Resume' : 'Currículo'}
        </button>
      </Link>
    )
  }
  return (
    <>
      <Cv />
      <Intro />
      <Timeline />
      <Contact />
    </>
  )
}
