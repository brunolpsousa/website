import { Pacman } from '@components/projects/pacman/Pacman';

export default function PacmanPage(): JSX.Element {
  return (
    <div className='m-auto flex h-full w-full flex-col items-center justify-center pb-12'>
      <h1 className='mb-8 text-center text-5xl leading-tight'>Pacman</h1>
      <canvas
        width='420'
        height='485'
        className='border-4 border-zinc-400 dark:border dark:border-zinc-600'
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
      <div className='my-12 flex flex-shrink space-x-12'>
        <Pacman />
      </div>
    </div>
  );
}
