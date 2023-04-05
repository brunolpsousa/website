import { useEffect, useState } from 'react'

const localLang = () => {
  const [lang, setLang] = useState(false)
  useEffect(() => {
    setLang(window.localStorage.lang == 'pt' ? false : true)
  })
  return lang
}

export { localLang }
