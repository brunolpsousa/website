import Snake from '@components/projects/snake/Snake';
import Link from 'next/link';

export default function SnakePage(): JSX.Element {
  return (
    <div className='m-auto flex h-full w-full flex-col items-center justify-center pb-12'>
      <h1 className='mb-8 text-center text-5xl leading-tight'>Snake</h1>
      <canvas
        width='600'
        height='600'
        className='border-4 border-zinc-400 dark:border dark:border-zinc-600'
        id='canvas'
      ></canvas>
      <div className='my-12 flex flex-shrink space-x-12'>
        <Link href={'/projects'}>
          <Snake />
        </Link>
      </div>
    </div>
  );
}
