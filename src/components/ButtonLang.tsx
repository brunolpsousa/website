import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ButtonLang() {
  const [isEN, setIsEN] = useState(false)

  const handleLangSwitch = () => {
    isEN ? (localStorage.lang = 'pt') : (localStorage.lang = 'en')
    setIsEN(isEN ? false : true)
  }

  useEffect(() => {
    if (
      localStorage.lang === 'en' ||
      (!('lang' in localStorage) &&
        !navigator.languages.toString().includes('pt'))
    ) {
      setIsEN(true)
    } else {
      setIsEN(false)
    }
  }, [isEN])

  return (
    <Link href={''}>
      <button
        type='button'
        onClick={handleLangSwitch}
        className='text-center absolute py-4 m-auto right-8 top-4 text-base font-medium rounded-md customHover'
      >
        {isEN ? 'en' : 'pt'}
      </button>
    </Link>
  )
}
