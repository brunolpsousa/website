import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ButtonLang() {
  const [lang, setLang] = useState('pt')

  useEffect(() => {
    if (!('lang' in localStorage)) {
      const hasPortuguese = navigator.languages.toString().includes('pt')
      hasPortuguese ? setLang('pt') : setLang('en')
    } else if (localStorage.lang === 'en') {
      setLang('en')
    } else if (localStorage.lang === 'pt') {
      setLang('pt')
    }
  }, [])

  const handleLangSwitch = () => {
    setLang(lang === 'en' ? 'pt' : 'en')
  }

  useEffect(() => {
    if (lang === 'en') {
      localStorage.lang = 'en'
    } else if (lang === 'pt') {
      localStorage.lang = 'pt'
    }
  }, [lang])

  const bra = (
    <svg
      width='40'
      height='40'
      viewBox='0 0 36 36'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      className='iconify iconify--twemoji'
    >
      <path
        fill='#009B3A'
        d='M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z'
      />
      <path fill='#FEDF01' d='M32.728 18 18 29.124 3.272 18 18 6.875z' />
      <circle fill='#002776' cx='17.976' cy='17.924' r='6.458' />
      <path
        fill='#CBE9D4'
        d='M12.277 14.887a6.406 6.406 0 0 0-.672 2.023c3.995-.29 9.417 1.891 11.744 4.595.402-.604.7-1.28.883-2.004-2.872-2.808-7.917-4.63-11.955-4.614z'
      />
      <path fill='#88C9F9' d='M12 18.233h1v1h-1zm1 2h1v1h-1z' />
      <path
        fill='#55ACEE'
        d='M15 18.233h1v1h-1zm2 1h1v1h-1zm4 2h1v1h-1zm-3 1h1v1h-1zm3-6h1v1h-1z'
      />
      <path fill='#3B88C3' d='M19 20.233h1v1h-1z' />
    </svg>
  )

  const usa = (
    <svg
      width='40'
      height='40'
      viewBox='0 -4 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#a)'>
        <rect width='28' height='20' rx='2' fill='#ffffff' />
        <mask
          id='b'
          style={{
            maskType: 'alpha',
          }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='28'
          height='20'
        >
          <rect width='28' height='20' rx='2' fill='#ffffff' />
        </mask>
        <g mask='url(#b)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M28 0H0v1.333h28V0Zm0 2.667H0V4h28V2.667ZM0 5.333h28v1.334H0V5.333ZM28 8H0v1.333h28V8ZM0 10.667h28V12H0v-1.333Zm28 2.666H0v1.334h28v-1.334ZM0 16h28v1.333H0V16Zm28 2.667H0V20h28v-1.333Z'
            fill='#D02F44'
          />
          <path fill='#46467F' d='M0 0h12v9.333H0z' />
          <g filter='url(#c)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.667 2a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0Zm2.666 0A.667.667 0 1 1 4 2a.667.667 0 0 1 1.333 0Zm2 .667a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334ZM10.667 2a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0ZM3.333 4a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333Zm3.334-.667a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0Zm2 .667a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333Zm2 .667a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0Zm-3.334.666a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333Zm-2-.666a.667.667 0 1 1-1.333 0 .667.667 0 0 1 1.333 0ZM2 5.333A.667.667 0 1 0 2 4a.667.667 0 0 0 0 1.333ZM4 6a.667.667 0 1 1-1.333 0A.667.667 0 0 1 4 6Zm2 .667a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334ZM9.333 6A.667.667 0 1 1 8 6a.667.667 0 0 1 1.333 0ZM10 8a.667.667 0 1 0 0-1.333A.667.667 0 0 0 10 8Zm-2-.667a.667.667 0 1 1-1.333 0 .667.667 0 0 1 1.333 0ZM4.667 8a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333Zm-2-.667a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0Z'
              fill='url(#d)'
            />
          </g>
        </g>
      </g>
      <defs>
        <linearGradient
          id='d'
          x1='1.333'
          y1='1.333'
          x2='1.333'
          y2='8'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#ffffff' />
          <stop offset='1' stopColor='#F0F0F0' />
        </linearGradient>
        <clipPath id='a'>
          <rect width='28' height='20' rx='2' fill='#ffffff' />
        </clipPath>
        <filter
          id='c'
          x='1.333'
          y='1.333'
          width='9.333'
          height='7.667'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0' />
          <feBlend
            in2='BackgroundImageFix'
            result='effect1_dropShadow_503_3486'
          />
          <feBlend
            in='SourceGraphic'
            in2='effect1_dropShadow_503_3486'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )

  return (
    <Link href={''}>
      <button
        type='button'
        onClick={handleLangSwitch}
        className='absolute left-8 top-4 rounded-md'
      >
        {lang === 'pt' ? bra : usa}
      </button>
    </Link>
  )
}
