"use client"

import Link from 'next/link'
import {getLang} from '@utils/getLang'

export default function NotFoundClient () {
  const returnToHome: Function = () => {
      const interval = setInterval(() => {
        document?.getElementById('ReturnButton-404')?.click()
        clearInterval(interval)
      }, 5000)
    window.onbeforeunload = () => { if (interval) clearInterval(interval)}
  }

  const isEN = getLang()

  return (
    <    >
      <p className='text-2xl mb-3'>
        {isEN
          ? 'Could not load this page'
          : 'Não foi possível carregar esta página'}
      </p>
      <Link href={'/'}>
        <button id='ReturnButton-404' type='button' className='navBtn my-12' onLoad={returnToHome()}>
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </>
  )
}
