interface KeyboardProps {
  addGuess: (key: string) => void
}

export default function HangmanKeyboard({ addGuess }: KeyboardProps) {
  const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  const keys1 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  const keys2 = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  const mapKeys = (items) => {
    return items.map((key) => {
      return (
        <button
          className='p-2 z-10 right-8 top-4 bg-stone-800 dark:bg-slate-100 text-2xl text-white dark:text-stone-700 rounded-md'
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
    <div className='grid grid-flow-row gap-3 justify-items-center'>
      <div className='grid-cols-10'>{mapKeys(keys)}</div>
      <div className='grid-cols-9'>{mapKeys(keys1)}</div>
      <div>{mapKeys(keys2)}</div>
    </div>
  )
}
