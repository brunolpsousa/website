interface HangmanWordProps {
  word: string
  guessed: string[]
  reveal: boolean
}

export default function HangmanWord({
  word,
  guessed,
  reveal,
}: HangmanWordProps) {
  return (
    <div className='flex justify-center gap-2 text-3xl md:text-6xl font-bold uppercase m-16'>
      {word.split('').map((letter, index) => (
        <span
          className='text-center border-b-black dark:border-b-white border-b-4 min-w-[20%] md:min-w-[22%]'
          key={index}
        >
          <span
            style={{
              visibility:
                guessed.includes(
                  letter.normalize('NFD').replace(/\p{Diacritic}/gu, '')
                ) || reveal
                  ? 'visible'
                  : 'hidden',
              color:
                !guessed.includes(
                  letter.normalize('NFD').replace(/\p{Diacritic}/gu, '')
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
