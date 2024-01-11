// Ref: https://github.com/servetgulnaroglu/pacman-js

import Link from 'next/link'
import { useEffect } from 'react'
import getLang from '@utils/getLang'

const game = () => {
  class Pacman {
    x: number
    y: number
    width: number
    height: number
    speed: number
    direction: number
    nextDirection: number
    frameCount: number
    currentFrame: number

    constructor(
      x: number,
      y: number,
      width: number,
      height: number,
      speed: number,
    ) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.speed = speed
      this.direction = 4
      this.nextDirection = 4
      this.frameCount = 7
      this.currentFrame = 1

      setInterval(() => {
        this.changeAnimation()
      }, 100)
    }

    moveProcess() {
      this.changeDirectionIfPossible()
      this.moveForwards()
      if (this.checkCollisions()) {
        this.moveBackwards()
        return
      }
    }

    eat() {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
          if (map[i][j] == 2 && this.getMapX() == j && this.getMapY() == i) {
            map[i][j] = 3
            score++
          }
        }
      }
    }

    moveBackwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x -= this.speed
          break
        case DIRECTION_UP:
          this.y += this.speed
          break
        case DIRECTION_LEFT:
          this.x += this.speed
          break
        case DIRECTION_BOTTOM:
          this.y -= this.speed
          break
      }
    }

    moveForwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x += this.speed
          break
        case DIRECTION_UP:
          this.y -= this.speed
          break
        case DIRECTION_LEFT:
          this.x -= this.speed
          break
        case DIRECTION_BOTTOM:
          this.y += this.speed
          break
      }
    }

    checkCollisions() {
      let isCollided = false

      if (
        map[parseInt(String(this.y / oneBlockSize))][
          parseInt(String(this.x / oneBlockSize))
        ] == 1 ||
        map[parseInt(String(this.y / oneBlockSize + 0.9999))][
          parseInt(String(this.x / oneBlockSize))
        ] == 1 ||
        map[parseInt(String(this.y / oneBlockSize))][
          parseInt(String(this.x / oneBlockSize + 0.9999))
        ] == 1 ||
        map[parseInt(String(this.y / oneBlockSize + 0.9999))][
          parseInt(String(this.x / oneBlockSize + 0.9999))
        ] == 1
      ) {
        isCollided = true
      }
      return isCollided
    }

    checkGhostCollision(ghosts: Ghost[]) {
      for (let i = 0; i < ghosts.length; i++) {
        let ghost = ghosts[i]
        return (
          ghost.getMapX() == this.getMapX() && ghost.getMapY() == this.getMapY()
        )
      }
    }

    changeDirectionIfPossible() {
      if (this.direction == this.nextDirection) return
      let tempDirection = this.direction
      this.direction = this.nextDirection
      this.moveForwards()
      if (this.checkCollisions()) {
        this.moveBackwards()
        this.direction = tempDirection
      } else {
        this.moveBackwards()
      }
    }

    getMapX() {
      return parseInt(String(this.x / oneBlockSize))
    }

    getMapY() {
      return parseInt(String(this.y / oneBlockSize))
    }

    getMapXRightSide() {
      return parseInt(String((this.x * 0.99 + oneBlockSize) / oneBlockSize))
    }

    getMapYRightSide() {
      return parseInt(String((this.y * 0.99 + oneBlockSize) / oneBlockSize))
    }

    changeAnimation() {
      this.currentFrame =
        this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1
    }

    draw() {
      if (!canvasContext) return
      canvasContext.save()
      canvasContext.translate(
        this.x + oneBlockSize / 2,
        this.y + oneBlockSize / 2,
      )
      canvasContext.rotate((this.direction * 90 * Math.PI) / 180)
      canvasContext.translate(
        -this.x - oneBlockSize / 2,
        -this.y - oneBlockSize / 2,
      )
      canvasContext.drawImage(
        pacmanFrames,
        (this.currentFrame - 1) * oneBlockSize,
        0,
        oneBlockSize,
        oneBlockSize,
        this.x,
        this.y,
        this.width,
        this.height,
      )
      canvasContext.restore()
    }
  }

  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D
  const pacmanFrames = document.getElementById('animation') as CanvasImageSource
  const ghostFrames = document.getElementById('ghosts') as CanvasImageSource

  const createRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
  }

  const DIRECTION_RIGHT = 4
  const DIRECTION_UP = 3
  const DIRECTION_LEFT = 2
  const DIRECTION_BOTTOM = 1
  let lives = 3
  let ghostCount = 4
  let ghostImageLocations = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
  ]

  const fps = 30
  let pacman: Pacman
  let oneBlockSize = 20
  let score = 0
  let ghosts: Ghost[] = []
  let wallSpaceWidth = oneBlockSize / 1.6
  let wallOffset = (oneBlockSize - wallSpaceWidth) / 2
  const wallInnerColor = 'black'

  // we now create the map of the walls,
  // if 1 wall, if 0 not wall
  // 21 columns // 23 rows
  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]

  const randomTargetsForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    {
      x: (map[0].length - 2) * oneBlockSize,
      y: (map.length - 2) * oneBlockSize,
    },
  ]

  const createNewPacman = () => {
    pacman = new Pacman(
      oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      oneBlockSize / 5,
    )
  }

  const gameLoop = () => {
    update()
    draw()
  }

  setInterval(gameLoop, 1000 / fps)

  const restartPacmanAndGhosts = () => {
    createNewPacman()
    createGhosts()
  }

  const onGhostCollision = () => {
    lives--
    restartPacmanAndGhosts()
    if (lives == 0) {
    }
  }

  const update = () => {
    pacman.moveProcess()
    pacman.eat()
    updateGhosts()
    if (pacman.checkGhostCollision(ghosts)) {
      onGhostCollision()
    }
  }

  const drawFoods = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == 2) {
          createRect(
            j * oneBlockSize + oneBlockSize / 3,
            i * oneBlockSize + oneBlockSize / 3,
            oneBlockSize / 3,
            oneBlockSize / 3,
            '#FEB897',
          )
        }
      }
    }
  }

  const drawRemainingLives = () => {
    canvasContext.font = '20px Emulogic'
    canvasContext.fillStyle = 'white'
    canvasContext.fillText('Lives: ', 220, oneBlockSize * (map.length + 1))

    for (let i = 0; i < lives; i++) {
      canvasContext.drawImage(
        pacmanFrames,
        2 * oneBlockSize,
        0,
        oneBlockSize,
        oneBlockSize,
        350 + i * oneBlockSize,
        oneBlockSize * map.length + 2,
        oneBlockSize,
        oneBlockSize,
      )
    }
  }

  const drawScore = () => {
    canvasContext.font = '20px Emulogic'
    canvasContext.fillStyle = 'white'
    canvasContext.fillText(
      'Score: ' + score,
      0,
      oneBlockSize * (map.length + 1),
    )
  }

  const draw = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    createRect(0, 0, canvas.width, canvas.height, 'black')
    drawWalls()
    drawFoods()
    drawGhosts()
    pacman.draw()
    drawScore()
    drawRemainingLives()
  }

  const drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == 1) {
          createRect(
            j * oneBlockSize,
            i * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            '#342DCA',
          )
          if (j > 0 && map[i][j - 1] == 1) {
            createRect(
              j * oneBlockSize,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth + wallOffset,
              wallSpaceWidth,
              wallInnerColor,
            )
          }

          if (j < map[0].length - 1 && map[i][j + 1] == 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth + wallOffset,
              wallSpaceWidth,
              wallInnerColor,
            )
          }

          if (i < map.length - 1 && map[i + 1][j] == 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize + wallOffset,
              wallSpaceWidth,
              wallSpaceWidth + wallOffset,
              wallInnerColor,
            )
          }

          if (i > 0 && map[i - 1][j] == 1) {
            createRect(
              j * oneBlockSize + wallOffset,
              i * oneBlockSize,
              wallSpaceWidth,
              wallSpaceWidth + wallOffset,
              wallInnerColor,
            )
          }
        }
      }
    }
  }

  class Ghost {
    x: number
    y: number
    width: number
    height: number
    speed: number
    direction: number
    imageX: number
    imageY: number
    imageWidth: number
    imageHeight: number
    range: number
    randomTargetIndex: number
    target: any
    currentFrame?: number
    frameCount?: number

    constructor(
      x: number,
      y: number,
      width: number,
      height: number,
      speed: number,
      imageX: number,
      imageY: number,
      imageWidth: number,
      imageHeight: number,
      range: number,
    ) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.speed = speed
      this.direction = DIRECTION_RIGHT
      this.imageX = imageX
      this.imageY = imageY
      this.imageHeight = imageHeight
      this.imageWidth = imageWidth
      this.range = range
      this.randomTargetIndex = parseInt(String(Math.random() * 4))
      this.target = randomTargetsForGhosts[this.randomTargetIndex]

      setInterval(() => {
        this.changeRandomDirection()
      }, 10000)
    }

    isInRange() {
      const xDistance = Math.abs(pacman.getMapX() - this.getMapX())
      const yDistance = Math.abs(pacman.getMapY() - this.getMapY())
      return (
        Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
      )
    }

    changeRandomDirection() {
      const addition = 1
      this.randomTargetIndex += addition
      this.randomTargetIndex = this.randomTargetIndex % 4
    }

    moveProcess() {
      if (this.isInRange()) {
        this.target = pacman
      } else {
        this.target = randomTargetsForGhosts[this.randomTargetIndex]
      }
      this.changeDirectionIfPossible()
      this.moveForwards()
      if (this.checkCollisions()) {
        this.moveBackwards()
        return
      }
    }

    moveBackwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x -= this.speed
          break
        case DIRECTION_UP:
          this.y += this.speed
          break
        case DIRECTION_LEFT:
          this.x += this.speed
          break
        case DIRECTION_BOTTOM:
          this.y -= this.speed
          break
      }
    }

    moveForwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x += this.speed
          break
        case DIRECTION_UP:
          this.y -= this.speed
          break
        case DIRECTION_LEFT:
          this.x -= this.speed
          break
        case DIRECTION_BOTTOM:
          this.y += this.speed
          break
      }
    }

    checkCollisions() {
      let isCollided = false
      if (
        map[parseInt(String(this.y / oneBlockSize))][
          parseInt(String(this.x / oneBlockSize))
        ] == 1 ||
        map[parseInt(String(this.y / oneBlockSize + 0.9999))][
          parseInt(String(this.x / oneBlockSize))
        ] == 1 ||
        map[parseInt(String(this.y / oneBlockSize))][
          parseInt(String(this.x / oneBlockSize + 0.9999))
        ] == 1 ||
        map[parseInt(String(this.y / oneBlockSize + 0.9999))][
          parseInt(String(this.x / oneBlockSize + 0.9999))
        ] == 1
      ) {
        isCollided = true
      }
      return isCollided
    }

    changeDirectionIfPossible() {
      let tempDirection = this.direction
      this.direction = this.calculateNewDirection(
        map,
        parseInt(String(this.target.x / oneBlockSize)),
        parseInt(String(this.target.y / oneBlockSize)),
      ) as number
      if (typeof this.direction == 'undefined') {
        this.direction = tempDirection
        return
      }
      if (
        this.getMapY() != this.getMapYRightSide() &&
        (this.direction == DIRECTION_LEFT || this.direction == DIRECTION_RIGHT)
      ) {
        this.direction = DIRECTION_UP
      }
      if (
        this.getMapX() != this.getMapXRightSide() &&
        this.direction == DIRECTION_UP
      ) {
        this.direction = DIRECTION_LEFT
      }
      this.moveForwards()
      if (this.checkCollisions()) {
        this.moveBackwards()
        this.direction = tempDirection
      } else {
        this.moveBackwards()
      }
      console.log(this.direction)
    }

    calculateNewDirection(map: number[][], destX: number, destY: number) {
      const mp = []
      for (let i = 0; i < map.length; i++) {
        mp[i] = map[i].slice()
      }

      type neighbor = {
        x: number
        y: number
        rightX: number
        rightY: number
        moves: number[]
      }

      const queue: neighbor[] = [
        {
          x: this.getMapX(),
          y: this.getMapY(),
          rightX: this.getMapXRightSide(),
          rightY: this.getMapYRightSide(),
          moves: [],
        },
      ]

      while (queue.length) {
        const poped = queue.shift()
        if (!poped) return

        if (poped.x == destX && poped.y == destY) {
          return poped.moves[0]
        }

        mp[poped.y][poped.x] = 1
        const neighborList = this.addNeighbors(poped, mp) as neighbor[]
        for (let i = 0; i < neighborList.length; i++) {
          queue.push(neighborList[i])
        }
      }

      return DIRECTION_BOTTOM
    }

    addNeighbors(
      poped: { x: number; y: number; moves: number[] },
      mp: number[][],
    ) {
      let queue = []
      let numOfRows = mp.length
      let numOfColumns = mp[0].length

      if (
        poped.x - 1 >= 0 &&
        poped.x - 1 < numOfRows &&
        mp[poped.y][poped.x - 1] != 1
      ) {
        let tempMoves = poped.moves.slice()
        tempMoves.push(DIRECTION_LEFT)
        queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves })
      }
      if (
        poped.x + 1 >= 0 &&
        poped.x + 1 < numOfRows &&
        mp[poped.y][poped.x + 1] != 1
      ) {
        let tempMoves = poped.moves.slice()
        tempMoves.push(DIRECTION_RIGHT)
        queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves })
      }
      if (
        poped.y - 1 >= 0 &&
        poped.y - 1 < numOfColumns &&
        mp[poped.y - 1][poped.x] != 1
      ) {
        let tempMoves = poped.moves.slice()
        tempMoves.push(DIRECTION_UP)
        queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves })
      }
      if (
        poped.y + 1 >= 0 &&
        poped.y + 1 < numOfColumns &&
        mp[poped.y + 1][poped.x] != 1
      ) {
        let tempMoves = poped.moves.slice()
        tempMoves.push(DIRECTION_BOTTOM)
        queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves })
      }
      return queue
    }

    getMapX() {
      return parseInt(String(this.x / oneBlockSize))
    }

    getMapY() {
      return parseInt(String(this.y / oneBlockSize))
    }

    getMapXRightSide() {
      return parseInt(String((this.x * 0.99 + oneBlockSize) / oneBlockSize))
    }

    getMapYRightSide() {
      return parseInt(String((this.y * 0.99 + oneBlockSize) / oneBlockSize))
    }

    changeAnimation() {
      if (!this.currentFrame) this.currentFrame = 1
      this.currentFrame =
        this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1
    }

    draw() {
      canvasContext.save()
      canvasContext.drawImage(
        ghostFrames,
        this.imageX,
        this.imageY,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height,
      )
      canvasContext.restore()
      canvasContext.beginPath()
      canvasContext.strokeStyle = 'red'
      canvasContext.arc(
        this.x + oneBlockSize / 2,
        this.y + oneBlockSize / 2,
        this.range * oneBlockSize,
        0,
        2 * Math.PI,
      )
      canvasContext.stroke()
    }
  }

  const updateGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
      ghosts[i].moveProcess()
    }
  }

  const drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
      ghosts[i].draw()
    }
  }

  const createGhosts = () => {
    ghosts = []
    for (let i = 0; i < ghostCount * 2; i++) {
      let newGhost = new Ghost(
        9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
        10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        pacman.speed / 2,
        ghostImageLocations[i % 4].x,
        ghostImageLocations[i % 4].y,
        124,
        116,
        6 + i,
      )
      ghosts.push(newGhost)
    }
  }

  createNewPacman()
  createGhosts()
  gameLoop()

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const left = ['arrowleft', 'a', 'h']
    const up = ['arrowup', 'w', 'k']
    const right = ['arrowright', 'd', 'l']
    const down = ['arrowdown', 's', 'j']

    setTimeout(() => {
      if (
        left.some((l) => {
          return e.key.toLowerCase() === l
        })
      ) {
        pacman.nextDirection = DIRECTION_LEFT
      } else if (
        up.some((u) => {
          return e.key.toLowerCase() === u
        })
      ) {
        pacman.nextDirection = DIRECTION_UP
      } else if (
        right.some((r) => {
          return e.key.toLowerCase() === r
        })
      ) {
        pacman.nextDirection = DIRECTION_RIGHT
      } else if (
        down.some((d) => {
          return e.key.toLowerCase() === d
        })
      ) {
        pacman.nextDirection = DIRECTION_BOTTOM
      }
    }, 1)
  })
}

export default () => {
  const isEN = getLang()

  useEffect(() => {
    game()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center pb-12 m-auto w-full h-full'>
      <h1 className='text-center leading-tight text-5xl mb-8'>Pacman</h1>
      <canvas
        width='420'
        height='490'
        className='border-4 dark:border border-zinc-400 dark:border-zinc-600 '
        id='canvas'
      ></canvas>
      <div className='hidden'>
        <img
          id='animation'
          src='/projects/pacman/pacman.gif'
          width='140'
          height='20'
        ></img>
        <img
          id='ghosts'
          src='/projects/pacman/ghost.png'
          width='140'
          height='20'
        ></img>
      </div>
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
