import Link from 'next/link'
import { getLang } from '../src/components/getLang'

export default function Custom404() {
  const isEN = getLang()
  const returnToIndex: Function = () => {
    if (typeof document !== 'undefined') {
      setInterval(function () {
        document?.getElementById('ReturnButton-404')?.click()
      }, 3000)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center mt-20 mb-20 mx-auto w-full h-screen'
      onLoad={returnToIndex()}
    >
      <h1 className='text-3xl md:text-4xl mb-3 font-medium'>
        Oops!
      </h1>
      <p className='text-base md:text-xl mb-3'>
        {isEN
          ? 'Could not load this page'
          : 'Não foi possível carregar esta página'}
      </p>
      <Link href={'/'}>
        <button
          id='ReturnButton-404'
          type='button'
          className='navBtn my-12'
        >
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </div>
  )
}
