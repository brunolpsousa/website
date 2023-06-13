import { useEffect, useState } from 'react'

const getLang = () => {
  const [langEN, setLangEN] = useState(false)
  useEffect(() => {
    setLangEN(window.localStorage.lang == 'pt' ? false : true)
  })
  return langEN
}

export { getLang }
