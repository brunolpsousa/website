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
    <Link href={''} onClick={handleLangSwitch}>
      {isEN ? 'en' : 'pt'}
    </Link>
  )
}
