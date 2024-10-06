interface KeyboardProps {
  addGuess: (key: string) => void;
}

export default function HangmanKeyboard({
  addGuess,
}: KeyboardProps): JSX.Element {
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  const mapKeys = (items: string[]) => {
    return items.map((key) => {
      return (
        <button
          id={key}
          key={key}
          onClick={() => addGuess(key)}
          className='keys mx-1 w-7 rounded-md bg-zinc-800 p-1 text-2xl text-white dark:bg-zinc-100 dark:text-zinc-700 md:w-10 md:p-2'
        >
          {key}
        </button>
      );
    });
  };

  return (
    <div
      id='keyboard'
      className='flex select-none flex-col place-items-center justify-items-center gap-3'
    >
      <span className='flex flex-shrink'>{mapKeys(keys[0])}</span>
      <span className='flex flex-shrink'>{mapKeys(keys[1])}</span>
      <span className='flex flex-shrink'>{mapKeys(keys[2])}</span>
    </div>
  );
}
