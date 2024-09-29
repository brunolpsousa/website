"use client"

import Link from 'next/link'
import { getLang } from '@utils/getLang'

export default () => {
  const isEN = getLang()

  const returnToHome: Function = () => {
    const interval = setInterval(() => {
      document?.getElementById('ReturnButton-Thx')?.click()
      clearInterval(interval)
    }, 7000)
    window.onbeforeunload = () => { if (interval) clearInterval(interval)}
  }

  return (
    <>
      <h1 className='text-3xl mb-3 font-medium'>
        {isEN ? 'Message sent successfully' : 'Mensagem enviada com sucesso'}
      </h1>
      <p className='text-2xl mb-3'>{isEN ? 'Thank you!' : 'Obrigado!'}</p>
      <Link href={'/'}>
        <button id='ReturnButton-Thx' type='button' className='navBtn my-12' onLoad={returnToHome()}>
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </>
  )
}
