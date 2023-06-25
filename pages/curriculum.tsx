import Link from 'next/link'
import { getLang } from '../src/utils/getLang'

export default function Curriculum() {
  const isEN = getLang()
  const cv_link = () => {
    return isEN
      ? 'https://drive.google.com/file/d/1XU3SmuO14j4ZuXaP1usDowxqArbSXisQ/'
      : 'https://drive.google.com/file/d/1OkEk3ztGypFpPrNSehem41ENgm5HpaA-/'
  }
  return (
    <div className='flex flex-col items-center justify-center m-auto w-full h-full'>
      <iframe
        title='Curriculum'
        src={cv_link() + 'preview'}
        className='h-full w-full'
      />
      <div className='flex flex-shrink my-12 space-x-12'>
        <Link href={'/'}>
          <button
            type='button'
            className='navBtn'
          >
            {isEN ? 'Return' : 'Voltar'}
          </button>
        </Link>
        <button
          id='Download'
          type='button'
          className='navBtn'
        >
          <a href={cv_link() + 'view'} target='_blank'>
            Download
          </a>
        </button>
      </div>
    </div>
  )
}
