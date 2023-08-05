import Link from 'next/link'
import { useEffect, useState } from 'react'
import usePersistedState from '@utils/usePersistedState'

export default () => {
  const [isEN, setIsEN] = usePersistedState('lang', '')
  const [icon, setIcon] = useState('pt')

  const handleLangSwitch = () => {
    const str = isEN === 'pt' ? 'en' : 'pt'
    setIsEN(str)
    setIcon(str)
  }

  useEffect(() => {
    const hasPT = navigator.languages.toString().includes('pt')
    if (isEN === 'en' || (isEN === '' && !hasPT)) {
      setIsEN('en')
      setIcon('en')
    } else {
      setIsEN('pt')
      setIcon('pt')
    }
  }, [])

  return (
    <Link href={''} onClick={handleLangSwitch}>
      {icon}
    </Link>
  )
}
