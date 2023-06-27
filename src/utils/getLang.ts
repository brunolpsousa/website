import { useEffect, useState } from 'react'

const getLang = () => {
  const [langEN, setLangEN] = useState(false)
  useEffect(() => {
    const lang = JSON.parse(window.localStorage.lang)
    lang === 'en' ? setLangEN(true) : setLangEN(false)
  })
  return langEN
}

export { getLang }
