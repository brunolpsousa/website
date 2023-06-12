import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ButtonLang() {
  const [isEN, setIsEN] = useState(false)

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
    } else if (!isEN) {
      localStorage.lang = 'pt'
    }
  }, [isEN])

  return (
    <Link href={''}>
      <button
        type='button'
        onClick={handleLangSwitch}
        className='absolute right-8 top-4 rounded-md'
      >
        {isEN ? 'en' : 'pt'}
      </button>
    </Link>
  )
}
