interface HangmanWordProps {
  word: string
  guessed: string[]
  reveal: boolean
}

export default ({ word, guessed, reveal }: HangmanWordProps) => {
  return (
    <div className='flex justify-center gap-2 text-4xl md:text-6xl font-bold uppercase m-12'>
      {word.split('').map((letter, index) => (
        <span
          className='text-center border-b-black dark:border-b-white border-b-4 w-8 md:w-16'
          style={{
            visibility: letter === ' ' ? 'hidden' : 'visible',
          }}
          key={index}
        >
          <span
            style={{
              visibility:
                guessed.includes(
                  letter.normalize('NFD').replace(/\p{Diacritic}/gu, ''),
                ) || reveal
                  ? 'visible'
                  : 'hidden',
              color:
                !guessed.includes(
                  letter.normalize('NFD').replace(/\p{Diacritic}/gu, ''),
                ) && reveal
                  ? 'red'
                  : 'currentcolor',
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}
