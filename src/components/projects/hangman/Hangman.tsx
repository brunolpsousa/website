'use client';

import { LangContext } from '@components/context/LangContextProvider';
import HangmanDraw from '@components/projects/hangman/HangmanDraw';
import HangmanKeyboard from '@components/projects/hangman/HangmanKeyboard';
import HangmanWord from '@components/projects/hangman/HangmanWord';
import { hangmanWords as hangWords } from '@data';
import { usePersistedState } from '@utils';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';

export default function HangmanPage(): JSX.Element {
  const isEN = useContext(LangContext);

  const [wordToGuess, setWordToGuess] = useState('');
  const [wordToGuessNorm, setWordToGuessNorm] = useState('');
  const [guessed, setGuessed] = useState<string[]>([]);
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const mistakes = guessed.filter(
    (letter) => !wordToGuessNorm.includes(letter),
  );

  const [level, setLevel] = usePersistedState('hangLevel', 1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const win =
    wordToGuessNorm &&
    wordToGuessNorm.split('').every((letter) => guessed.includes(letter));
  const lose = mistakes.length >= 6;

  function gameTitle(): string {
    const gameSentence = isEN ? 'Hangman' : 'Jogo da Forca';
    const winSentence = isEN ? 'Congratulations!' : 'Parabéns!';
    const loseSentence = isEN ? 'You lose!' : 'Você perdeu!';
    return win ? winSentence : lose ? loseSentence : gameSentence;
  }

  function checkResult(): void {
    if (win || lose) {
      if (win) {
        setLevel(level + 1);
      } else if (lose) {
        setLevel(level > 2 ? level - 2 : 1);
      }
      document
        .querySelectorAll<HTMLElement>('.keys')
        .forEach((e) => e.setAttribute('disabled', 'true'));
    }
  }

  function clearGame(): void {
    document
      .querySelectorAll<HTMLElement>('.keys')
      .forEach((e) => e.removeAttribute('disabled'));

    const parts = document.querySelectorAll<HTMLElement>('.hang-parts');
    for (const part of parts) {
      part.style.display = 'none';
    }

    guessed.forEach((element) => {
      const keys = document.getElementById(element);
      keys?.classList.remove('opacity-30');
    });
  }

  function sortWord(): void {
    const words = isEN ? hangWords.en : hangWords.pt;
    const specialChars = ['!', '-', '/', ' '];

    function getSecret(word: string[]): string {
      let initialSecret = 'you rock!';

      for (let i = 0; i < 100; i++) {
        const localSecret =
          word[Math.floor(Math.random() * word.length)].toLowerCase();

        if (guessedWords.includes(localSecret)) {
          continue;
        }

        if (
          level > 0 &&
          level <= 4 &&
          (localSecret.length < 4 || localSecret.length > 6)
        ) {
          continue;
        } else if (
          level > 4 &&
          level <= 8 &&
          (localSecret.length < 3 || localSecret.length > 8)
        ) {
          continue;
        }

        return (initialSecret = localSecret);
      }
      return initialSecret;
    }

    const secret = getSecret(words);

    if (guessedWords.length < 15) {
      setGuessedWords((guessedWords) => [...guessedWords, secret]);
    } else {
      setGuessedWords([secret]);
    }

    setWordToGuess(secret);
    setWordToGuessNorm(secret.normalize('NFD').replace(/\p{Diacritic}/gu, ''));

    setGuessed([]);
    specialChars.forEach((element) => {
      if (secret.includes(element)) {
        setGuessed((guessed) => [...guessed, element]);
      }
    });
  }

  function refreshGame(): void {
    clearGame();
    setCurrentLevel(level);
    sortWord();
  }

  const addGuess = useCallback(
    (letter: string) => {
      if (guessed.includes(letter) || lose || win) return;

      const button = document.getElementById(letter);
      button?.classList.add('opacity-30');
      button?.setAttribute('disabled', 'true');

      setGuessed((guessed) => [...guessed, letter]);
    },
    [guessed],
  );

  useEffect(() => {
    refreshGame();
  }, [isEN]);

  useEffect(() => {
    checkResult();
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey) return;
      const letter = e.key.toLowerCase();
      if (!letter.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuess(letter);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [guessed]);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center pb-12'>
      <h1 className='mb-8 text-center text-5xl leading-tight'>{gameTitle()}</h1>
      <h3 className='mb-8 text-2xl'>
        {isEN ? 'Level: ' : 'Nível: '}
        {currentLevel}
      </h3>
      <HangmanDraw mistakes={mistakes.length} />
      <HangmanWord reveal={lose} word={wordToGuess} guessed={guessed} />
      <HangmanKeyboard addGuess={addGuess} />
      <div className='my-12 flex flex-shrink space-x-12'>
        <Link href={'/projects'}>
          <button type='button' className='navBtn'>
            {isEN ? 'Return' : 'Voltar'}
          </button>
        </Link>
        <button type='button' className='navBtn' onClick={refreshGame}>
          {isEN ? 'Play' : 'Jogar'}
        </button>
      </div>
    </div>
  );
}
