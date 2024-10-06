interface HangmanWordProps {
  word: string;
  guessed: string[];
  reveal: boolean;
}

export default function HangmanWord({
  word,
  guessed,
  reveal,
}: HangmanWordProps): JSX.Element {
  return (
    <div className='m-12 flex justify-center gap-2 text-4xl font-bold uppercase md:text-6xl'>
      {word.split('').map((letter, index) => (
        <span
          className='w-8 border-b-4 border-b-black text-center dark:border-b-white md:w-16'
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
  );
}
