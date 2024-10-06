'use client';

import { LangContext } from '@components/langContextProvider/LangContextProvider';
import { cards as deck } from '@data/memoryCards';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function MemoryPage(): JSX.Element {
  const isEN = useContext(LangContext);
  const cardsChosen: string[] = [];
  const cardsChosenId: number[] = [];
  const pairsFound: string[][] = [];
  const [endGame, setEndGame] = useState(false);

  const cardDeck = deck.flatMap((i) => [i, i]);
  cardDeck.sort(() => 0.5 - Math.random());

  function gameTitle(): string {
    const gameSentence = isEN ? 'Memory Game' : 'Jogo da Memória';
    const endSentence = isEN ? 'Congratulations!' : 'Parabéns!';
    return endGame ? endSentence : gameSentence;
  }

  function createBoard(): void {
    const board = document.querySelector('.board');
    for (let i = 0; i < cardDeck.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', '/projects/memory/board.png');
      card.setAttribute('data-id', i.toString());
      card.addEventListener('click', flipCard);
      board?.appendChild(card);
    }
  }

  function checkForMatch(): void {
    const resultView = document.querySelector('#result');
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    for (const card of cards) {
      if (card.getAttribute('src') === '/projects/memory/board.png')
        card.addEventListener('click', flipCard);
    }

    if (optionOneId === optionTwoId) {
      cards[optionOneId].setAttribute('src', '/projects/memory/board.png');
      cards[optionTwoId].setAttribute('src', '/projects/memory/board.png');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', '/projects/memory/check.png');
      cards[optionTwoId].setAttribute('src', '/projects/memory/check.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      pairsFound.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', '/projects/memory/board.png');
      cards[optionTwoId].setAttribute('src', '/projects/memory/board.png');
    }

    cardsChosen.length = 0;
    cardsChosenId.length = 0;
    if (resultView) resultView.textContent = '' + pairsFound.length;
    setEndGame(pairsFound.length === cards.length / 2);
  }

  function flipCard(this: HTMLElement): void {
    const cardId = Number(this.getAttribute('data-id'));
    cardsChosen.push(cardDeck[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardDeck[cardId].img);

    if (cardsChosen.length === 2) {
      const cards = document.querySelectorAll('img');
      for (const card of cards) {
        if (card.getAttribute('src') === '/projects/memory/board.png')
          card.removeEventListener('click', flipCard);
      }
      setTimeout(checkForMatch, 500);
    }
  }

  function refreshGame(): void {
    const result = document.querySelector('#result');
    if (result) {
      result.textContent = '0';
      pairsFound.length = 0;

      const board = document.querySelector('.board');
      while (board?.firstChild) board?.removeChild(board.firstChild);

      setEndGame(false);
      createBoard();
    }
  }

  useEffect(() => {
    refreshGame();
  }, [isEN]);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center pb-12'>
      <h1 className='mb-8 text-center text-5xl leading-tight'>{gameTitle()}</h1>
      <h3 className='mb-8 text-2xl'>
        {isEN ? 'Found: ' : 'Encontrados: '}
        <span id='result'>0</span>
      </h3>
      <div className='board m-auto flex flex-wrap justify-center md:w-1/2'></div>
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
