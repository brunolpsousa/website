interface HangmanDrawProps {
  mistakes: number
}

export default ({ mistakes }: HangmanDrawProps) => {
  const draw: Function = () => {
    if (typeof document !== 'undefined') {
      const parts = document?.querySelectorAll<HTMLElement>('.hang-parts')!
      for (let i = 0; i < mistakes; i++) {
        parts[i].style.display = 'block'
      }
    }
    return (
      <svg
        height='230'
        width='206'
        fill='transparent'
        strokeWidth='2.5'
        stroke='currentColor'
      >
        {/* gallows */}
        <line x1='60' y1='20' x2='140' y2='20' />
        <line x1='140' y1='20' x2='140' y2='50' />
        <line x1='60' y1='20' x2='60' y2='230' />
        <line x1='20' y1='230' x2='100' y2='230' />

        {/* head */}
        <circle cx='140' cy='70' r='20' className='hang-parts' />
        {/* trunk */}
        <line x1='140' y1='90' x2='140' y2='150' className='hang-parts' />
        {/* arms */}
        <line x1='140' y1='120' x2='120' y2='100' className='hang-parts' />
        <line x1='140' y1='120' x2='160' y2='100' className='hang-parts' />
        {/* legs */}
        <line x1='140' y1='150' x2='120' y2='180' className='hang-parts' />
        <line x1='140' y1='150' x2='160' y2='180' className='hang-parts' />
      </svg>
    )
  }
  return <>{draw()}</>
}
