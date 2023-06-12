import HangmanDraw from '../src/components/HangmanDraw'
import HangmanWord from '../src/components/HangmanWord'
import HangmanKeyboard from '../src/components/HangmanKeyboard'
import Link from 'next/link'
import hangWords from '../src/data/hangmanWords'
import { localLang } from '../src/components/localLang'
import { useCallback, useEffect, useState } from 'react'

export default function Hangman() {
  const words = localLang() ? hangWords.en : hangWords.pt
  const secret = words[Math.floor(Math.random() * words.length)].toLowerCase()
  const [wordToGuess, setWordToGuess] = useState('')
  const [wordToGuessNorm, setWordToGuessNorm] = useState('')
  const [guessed, setGuessed] = useState<string[]>([])
  const mistakes = guessed.filter((letter) => !wordToGuessNorm.includes(letter))

  useEffect(() => {
    setGuessed([])
    setWordToGuess(secret)
    setWordToGuessNorm(secret.normalize('NFD').replace(/\p{Diacritic}/gu, ''))
  }, [])

  const addGuess = useCallback(
    (letter: string) => {
      if (guessed.includes(letter) || lose || win) return
      const button = document.getElementById(letter)
      button?.classList.add('opacity-30')
      button?.setAttribute('disabled', 'true')
      setGuessed((guessed) => [...guessed, letter])
    },
    [guessed]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const letter = e.key.toLowerCase()
      if (!letter.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuess(letter)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [guessed])

  const lose = mistakes.length >= 6
  const win = wordToGuessNorm
    .split('')
    .every((letter) => guessed.includes(letter))
  function gameOver(): string {
    const loseSentence = localLang() ? 'You lose!' : 'Você perdeu!'
    const winSentence = localLang() ? 'Congratulations!' : 'Parabéns!'
    const gameSentence = localLang() ? 'Hangman' : 'Jogo da Forca'
    if (lose) {
      return loseSentence
    } else if (win) {
      return winSentence
    } else {
      return gameSentence
    }
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-20 mb-24 mx-auto w-full h-screen'>
        <h1 className='text-4xl md:text-6xl mb-8'>{gameOver()}</h1>
        <HangmanDraw mistakes={mistakes.length} />
        <HangmanWord reveal={lose} word={wordToGuess} guessed={guessed} />
        <HangmanKeyboard addGuess={addGuess} />
        <div className='relative w-5/6 md:w-1/2'>
          <Link href={'/'}>
            <button
              id='ReturnButton'
              type='button'
              className='text-center absolute left-0 inline-block my-12 px-5 py-3 text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
            >
              {localLang() ? 'Return' : 'Voltar'}
            </button>
          </Link>
          <button
            id='Retry'
            type='button'
            className='text-center absolute right-0 inline-block my-12 px-5 py-3 text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
            onClick={() => window.location.reload()}
          >
            {localLang() ? 'Play again' : 'Jogar novamente'}
          </button>
        </div>
      </div>
    </>
  )
}
