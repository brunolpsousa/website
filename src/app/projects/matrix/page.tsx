import { Matrix } from '@components/projects/matrix/Matrix';
import Link from 'next/link';

export default function MatrixPage(): JSX.Element {
  return (
    <div className='m-auto flex w-full flex-col items-center justify-center pb-12'>
      <canvas id='canvas'></canvas>
      <div className='my-12 flex flex-shrink space-x-12'>
        <Link href={'/projects'}>
          <Matrix />
        </Link>
      </div>
    </div>
  );
}
