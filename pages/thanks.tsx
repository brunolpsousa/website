import Link from 'next/link'
import { getLang } from '../src/components/getLang'

export default function ThankYou() {
  const isEN = getLang()
  const returnToIndex: Function = () => {
    if (typeof document !== 'undefined') {
      setInterval(function () {
        document?.getElementById('ReturnButton-Thx')?.click()
      }, 5000)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center mt-20 mb-20 mx-auto w-full h-screen'
      onLoad={returnToIndex()}
    >
      <h1 className='text-2xl md:text-4xl mb-3 font-medium'>
        {isEN
          ? 'Message sent successfully'
          : 'Mensagem enviada com sucesso'}
      </h1>
      <p className='text-base md:text-xl mb-3'>
        {isEN ? 'Thank you!' : 'Obrigado!'}
      </p>
      <Link href={'/'}>
        <button
          id='ReturnButton-Thx'
          type='button'
          className='navBtn my-12'
        >
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </div>
  )
}
