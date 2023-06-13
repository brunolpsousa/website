import { useEffect, useState } from 'react'

const localLang = () => {
  const [isEN, setIsEN] = useState(false)
  useEffect(() => {
    setIsEN(window.localStorage.lang == 'pt' ? false : true)
  })
  return isEN
}

export { localLang }
