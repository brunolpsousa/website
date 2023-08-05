import { useEffect, useState } from 'react'

export default () => {
  const [langEN, setLangEN] = useState(false)
  useEffect(() => {
    const lang = JSON.parse(window.localStorage.lang)
    lang === 'en' ? setLangEN(true) : setLangEN(false)
  })
  return langEN
}
