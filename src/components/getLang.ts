import { useEffect, useState } from 'react'

const getLang = () => {
  const [langEN, setLangEN] = useState(false)
  useEffect(() => {
    if (
      window.localStorage.lang === 'en' ||
      (!('lang' in localStorage) &&
        !navigator.languages.toString().includes('pt'))
    ) {
      setLangEN(true)
    } else {
      setLangEN(false)
    }
  })
  return langEN
}

export { getLang }
