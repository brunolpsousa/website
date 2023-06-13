interface KeyboardProps {
  addGuess: (key: string) => void
}

export default function HangmanKeyboard({ addGuess }: KeyboardProps) {
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ]

  const mapKeys = (items: string[]) => {
    return items.map((key) => {
      return (
        <button
          id={key}
          key={key}
          onClick={() => addGuess(key)}
          className='mx-1 p-1 md:p-2 w-7 md:w-10 bg-stone-800 dark:bg-slate-100 text-2xl text-white dark:text-stone-700 rounded-md'
        >
          {key}
        </button>
      )
    })
  }

  return (
    <div
      id='keyboard'
      className='grid grid-flow-row gap-3 place-items-center justify-items-center'
    >
      <span>{mapKeys(keys[0])}</span>
      <span>{mapKeys(keys[1])}</span>
      <span>{mapKeys(keys[2])}</span>
    </div>
  )
}
