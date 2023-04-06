import Link from 'next/link'
import { localLang } from '../src/components/localLang'

export default function Curriculum() {
  const cv_link = () => {
    return localLang()
      ? 'https://drive.google.com/file/d/1XU3SmuO14j4ZuXaP1usDowxqArbSXisQ/'
      : 'https://drive.google.com/file/d/1OkEk3ztGypFpPrNSehem41ENgm5HpaA-/'
  }
  return (
    <div className='flex flex-col items-center justify-center mt-20 mb-24 mx-auto w-full h-screen'>
      <iframe
        id='Curriculum'
        title='Curriculum'
        src={cv_link() + 'preview'}
        style={{ maxWidth: '90%' }}
        className='h-3/5 md:h-full w-full'
      />
      <div className='relative w-4/5 md:w-1/2'>
        <Link href={'/'}>
          <button
            id='ReturnButton'
            type='button'
            className='text-center absolute left-0 inline-block my-12 px-8 py-3 text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
          >
            {localLang() ? 'Return' : 'Voltar'}
          </button>
        </Link>
        <button
          id='Download'
          type='button'
          className='text-center absolute right-0 inline-block my-12 px-8 py-3 text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
        >
          <a href={cv_link() + 'view'} target='_blank'>
            Download
          </a>
        </button>
      </div>
    </div>
  )
}
