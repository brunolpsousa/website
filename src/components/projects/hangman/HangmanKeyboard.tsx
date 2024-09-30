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
          className='keys p-1 mx-1 md:p-2 w-7 md:w-10 bg-zinc-800 dark:bg-zinc-100 text-2xl text-white dark:text-zinc-700 rounded-md'
        >
          {key}
        </button>
      );
    });
  };

  return (
    <div
      id='keyboard'
      className='flex flex-col gap-3 place-items-center justify-items-center select-none'
    >
      <span className='flex flex-shrink'>{mapKeys(keys[0])}</span>
      <span className='flex flex-shrink'>{mapKeys(keys[1])}</span>
      <span className='flex flex-shrink'>{mapKeys(keys[2])}</span>
    </div>
  );
}
