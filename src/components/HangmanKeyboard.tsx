interface KeyboardProps {
  addGuess: (key: string) => void
}

export default function HangmanKeyboard({ addGuess }: KeyboardProps) {
  const keys0 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  const keys1 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  const keys2 = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  const mapKeys = (items: string[]) => {
    return items.map((key) => {
      return (
        <button
          className='mx-1 p-1 md:p-2 w-7 md:w-10 bg-stone-800 dark:bg-slate-100 text-2xl text-white dark:text-stone-700 rounded-md'
          key={key}
          id={key}
          onClick={() => addGuess(key)}
        >
          {key}
        </button>
      )
    })
  }
  return (
    <div className='grid grid-flow-row gap-3 place-items-center justify-items-center'>
      <div>{mapKeys(keys0)}</div>
      <div>{mapKeys(keys1)}</div>
      <div>{mapKeys(keys2)}</div>
    </div>
  )
}
