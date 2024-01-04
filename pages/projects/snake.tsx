// Ref: https://github.com/servetgulnaroglu/ytb_snake_js

import Link from 'next/link'
import { useEffect } from 'react'
import getLang from '@utils/getLang'

const snake = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const canvasContext = canvas.getContext('2d')
  const gameSpeed = 15
  let record = 0

  function gameLoop() {
    setInterval(show, 1000 / gameSpeed)
  }

  function show() {
    update()
    draw()
  }

  function update() {
    if (!canvasContext) return
    canvas.width = (window.innerWidth / 5) * 4
    canvas.height = window.innerHeight / 2
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    eatApple()
    checkCollision()
  }

  function eatApple() {
    if (
      snake.tail[snake.tail.length - 1].x == apple.x &&
      snake.tail[snake.tail.length - 1].y == apple.y
    ) {
      snake.tail[snake.tail.length] = { x: apple.x, y: apple.y }
      apple = new Apple()
    }

    if (apple.x > canvas.width || apple.y > canvas.height) apple = new Apple()
  }

  function gameOver() {
    record = Math.max(record, snake.tail.length - 1)
    snake = new Snake()
  }

  function checkCollision() {
    let headTail = snake.tail[snake.tail.length - 1]

    // wall collision
    if (
      headTail.x <= -snake.size ||
      headTail.x >= canvas.width ||
      headTail.y <= -snake.size ||
      headTail.y >= canvas.height
    ) {
      gameOver()
      return
    }

    // self collision
    for (let i = 0; i < snake.tail.length - 2; i++) {
      if (headTail.x == snake.tail[i].x && headTail.y == snake.tail[i].y) {
        gameOver()
        return
      }
    }
  }

  function draw() {
    if (!canvasContext) return

    createRect(0, 0, canvas.width, canvas.height, 'black')

    for (let i = 0; i < snake.tail.length; i++) {
      createRect(
        snake.tail[i].x + 2.5,
        snake.tail[i].y + 2.5,
        snake.size - 5,
        snake.size - 5,
        'white',
      )
    }

    canvasContext.font = '20px sans-serif'
    canvasContext.fillStyle = '#00FF42'
    canvasContext.fillText('Record: ' + record, (canvas.width / 9) * 2, 18)
    canvasContext.fillText(
      'Score: ' + (snake.tail.length - 1),
      (canvas.width / 3) * 2,
      18,
    )
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
  }

  function createRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) {
    if (!canvasContext) return

    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
  }

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    setTimeout(() => {
      if (
        (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') &&
        snake.rotateX != 1
      ) {
        snake.rotateX = -1
        snake.rotateY = 0
      } else if (
        (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') &&
        snake.rotateY != 1
      ) {
        snake.rotateX = 0
        snake.rotateY = -1
      } else if (
        (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') &&
        snake.rotateX != -1
      ) {
        snake.rotateX = 1
        snake.rotateY = 0
      } else if (
        (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') &&
        snake.rotateY != -1
      ) {
        snake.rotateX = 0
        snake.rotateY = 1
      }
    }, 1)
  })

  class Snake {
    x: number
    y: number
    size: number
    tail: { x: number; y: number }[]
    rotateX: number
    rotateY: number

    constructor() {
      this.size = 16
      this.x = 0
      this.y = canvas.height / 3
      this.tail = [{ x: this.x, y: this.y }]
      this.rotateX = 1
      this.rotateY = 0
    }

    move() {
      let newRect

      if (this.rotateX == 1) {
        newRect = {
          x: this.tail[this.tail.length - 1].x + this.size,
          y: this.tail[this.tail.length - 1].y,
        }
      } else if (this.rotateX == -1) {
        newRect = {
          x: this.tail[this.tail.length - 1].x - this.size,
          y: this.tail[this.tail.length - 1].y,
        }
      } else if (this.rotateY == 1) {
        newRect = {
          x: this.tail[this.tail.length - 1].x,
          y: this.tail[this.tail.length - 1].y + this.size,
        }
      } else if (this.rotateY == -1) {
        newRect = {
          x: this.tail[this.tail.length - 1].x,
          y: this.tail[this.tail.length - 1].y - this.size,
        }
      }

      if (!newRect) return
      this.tail.shift()
      this.tail.push(newRect)
    }
  }

  class Apple {
    x: number
    y: number
    size: number
    color: string

    constructor() {
      let isTouching

      while (true) {
        isTouching = false
        this.x =
          Math.floor((Math.random() * canvas.width) / snake.size) * snake.size
        this.y =
          Math.floor((Math.random() * canvas.height) / snake.size) * snake.size

        for (let i = 0; i < snake.tail.length; i++) {
          if (this.x == snake.tail[i].x && this.y == snake.tail[i].y)
            isTouching = true
        }

        this.size = snake.size
        this.color = 'red'

        if (!isTouching) break
      }
    }
  }

  let snake = new Snake()
  let apple = new Apple()
  gameLoop()
}

export default () => {
  const isEN = getLang()

  useEffect(() => {
    snake()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center pb-12 m-auto w-full h-full'>
      <canvas
        width='600'
        height='600'
        className='border-4 dark:border border-zinc-400 dark:border-zinc-600 '
        id='canvas'
      ></canvas>
      <div className='flex flex-shrink my-12 space-x-12'>
        <Link href={'/projects'}>
          <button type='button' className='navBtn'>
            {isEN ? 'Return' : 'Voltar'}
          </button>
        </Link>
      </div>
    </div>
  )
}