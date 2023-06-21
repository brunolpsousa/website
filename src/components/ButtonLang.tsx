import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ButtonLang() {
  const [isEN, setIsEN] = useState(true)

  useEffect(() => {
    if (!('lang' in localStorage)) {
      const hasPortuguese = navigator.languages.toString().includes('pt')
      hasPortuguese ? setIsEN(false) : setIsEN(true)
    } else if (localStorage.lang === 'en') {
      setIsEN(true)
    } else if (localStorage.lang === 'pt') {
      setIsEN(false)
    }
  }, [])

  const handleLangSwitch = () => {
    setIsEN(isEN ? false : true)
  }

  useEffect(() => {
    if (isEN) {
      localStorage.lang = 'en'
    } else {
      localStorage.lang = 'pt'
    }
  }, [isEN])

  return (
    <Link href={''}>
      <button
        type='button'
        onClick={handleLangSwitch}
        className='text-center absolute py-4 m-auto right-12 top-4 text-base font-medium rounded-md hover:text-blue-600 hover:dark:text-blue-400'
      >
        {isEN ? 'en' : 'pt'}
      </button>
    </Link>
  )
}
