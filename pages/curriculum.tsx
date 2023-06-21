import Link from 'next/link'
import { getLang } from '../src/components/getLang'

export default function Curriculum() {
  const isEN = getLang()
  const cv_link = () => {
    return isEN
      ? 'https://drive.google.com/file/d/1XU3SmuO14j4ZuXaP1usDowxqArbSXisQ/'
      : 'https://drive.google.com/file/d/1OkEk3ztGypFpPrNSehem41ENgm5HpaA-/'
  }
  return (
    <div className='flex flex-col items-center justify-center mt-20 mb-24 mx-auto w-full h-screen'>
      <iframe
        id='Curriculum'
        title='Curriculum'
        src={cv_link() + 'preview'}
        style={{ maxHeight: '100vw', maxWidth: '85%' }}
        className='h-full w-full'
      />
      <div className='relative w-4/6 md:w-1/2'>
        <Link href={'/'}>
          <button
            id='ReturnButton'
            type='button'
            className='navBtn absolute left-0 my-12'
          >
            {isEN ? 'Return' : 'Voltar'}
          </button>
        </Link>
        <button
          id='Download'
          type='button'
          className='navBtn absolute right-0 my-12'
        >
          <a href={cv_link() + 'view'} target='_blank'>
            Download
          </a>
        </button>
      </div>
    </div>
  )
}
