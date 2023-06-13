import Link from 'next/link'
import { getLang } from '../src/components/getLang'

export default function Custom404() {
  const isEN = getLang()
  const returnToIndex: Function = () => {
    if (typeof document !== 'undefined') {
      setInterval(function () {
        document?.getElementById('ReturnButton')?.click()
      }, 3000)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center h-screen m-auto'
      onLoad={returnToIndex()}
    >
      <h1 className='text-3xl md:text-4xl text-stone-600 dark:text-stone-100 mb-3 font-medium'>
        Oops!
      </h1>
      <p className='text-base md:text-xl text-stone-500 dark:text-stone-200 mb-3'>
        {isEN
          ? 'Could not load this page'
          : 'Não foi possível carregar esta página'}
      </p>
      <Link href={'/'}>
        <button
          id='ReturnButton'
          type='button'
          className='text-center inline-block my-12 px-8 py-3 w-max text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
        >
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </div>
  )
}
