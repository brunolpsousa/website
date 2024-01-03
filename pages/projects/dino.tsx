// Ref: https://github.com/adrianoviana/bug-game

import Link from 'next/link'
import getLang from '@utils/getLang'
import { useEffect, useState } from 'react'

export default () => {
  const isEN = getLang()

  const [endGame, setEndGame] = useState(false)
  let isGameOver = false

  const gravity = 0.9
  let isJumping = false
  let dinoPosition = 0

  const intervals: number[] = []
  const timeouts: number[] = []

  function gameTitle(): string {
    const gameSentence = isEN ? 'Dino Game' : 'Jogo do Dinossauro'
    const endSentence = isEN ? 'You lose!' : 'Você perdeu!'
    return endGame ? endSentence : gameSentence
  }

  function jump(e: KeyboardEvent | MouseEvent): void {
    if (isJumping || isGameOver || e.ctrlKey) return
    if (
      ('key' in e &&
        (e.key === ' ' ||
          e.key === 'ArrowUp' ||
          e.key.toLowerCase() === 'w')) ||
      ('buttons' in e && e.buttons === 0)
    ) {
      e.preventDefault()
      isJumping = true
      jumpAction()
    }
  }

  function jumpAction(): void {
    const dino = document.querySelector('.dino') as HTMLElement
    let height = 0
    const upHigh = setInterval(function () {
      dinoPosition += 30
      height++
      dinoPosition = dinoPosition * gravity
      dino.style.bottom = dinoPosition + 'px'

      if (height === 15) {
        clearInterval(upHigh)
        const downFall = setInterval(function () {
          dinoPosition -= 5
          height--
          dinoPosition = dinoPosition * gravity
          dino.style.bottom = dinoPosition + 'px'
          if (height === 0) {
            clearInterval(downFall)
            isJumping = false
          }
        }, 20)
      }
    }, 20)
  }

  function start(): void {
    if (isGameOver) return

    const bugs = document.querySelector('.bugs') as HTMLElement
    const newBug = document.createElement('div')
    const randomTime = Math.random() * 3000
    let bugPosition = window.innerWidth - 64

    bugs.appendChild(newBug)
    newBug.classList.add('bug')
    newBug.style.left = bugPosition + 'px'

    const bugAttack = setInterval(function () {
      intervals.push(bugAttack as unknown as number)
      bugPosition -= 10
      newBug.style.left = bugPosition + 'px'

      if (bugPosition > 0 && bugPosition < 64 && dinoPosition < 64) {
        intervals.forEach((e) => clearInterval(e))
        timeouts.forEach((e) => clearTimeout(e))
        isGameOver = true
        setEndGame(true)

        const world = document.querySelector('#world') as HTMLElement
        world?.style.setProperty('animation', 'none', 'important')
        world?.style.setProperty('-webkit-animation', 'none', 'important')
      }
    }, 20)
    const startTimeout = setTimeout(start, randomTime)
    timeouts.push(startTimeout as unknown as number)
  }

  function refreshGame(): void {
    window.location.reload()
    // const bugs = document.querySelector('.bugs')
    // while (bugs?.firstChild) bugs.removeChild(bugs.firstChild)
    // intervals.length = 0
    // timeouts.length = 0
    // isGameOver = false
    // setEndGame(false)
    // start()
  }

  useEffect(() => {
    document.addEventListener('keydown', jump)
    document.addEventListener('click', jump)
    setTimeout(start, 1500)
    return () => {
      document.removeEventListener('keydown', jump)
      document.removeEventListener('click', jump)
    }
  }, [])

  return (
    <div className='flex flex-col items-center justify-center pb-12 m-auto w-full'>
      <h1 className='text-center leading-tight text-5xl mb-8'>{gameTitle()}</h1>
      <div className='w-screen h-full'>
        <div id='world'>
          <div className='dino'></div>
          <div className='bugs'></div>
        </div>
      </div>
      <div className='flex flex-shrink my-12 space-x-12'>
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
  )
}
