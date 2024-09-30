'use client';

import { getLang } from '@utils/getLang';
import Link from 'next/link';

export default function Curriculum(): JSX.Element {
  const isEN = getLang();
  const cv_link = () => {
    return isEN
      ? 'https://drive.google.com/file/d/1XU3SmuO14j4ZuXaP1usDowxqArbSXisQ/'
      : 'https://drive.google.com/file/d/1OkEk3ztGypFpPrNSehem41ENgm5HpaA-/';
  };
  return (
    <>
      <iframe
        title='Curriculum'
        src={cv_link() + 'preview'}
        className='h-full w-full'
      />
      <div className='flex flex-shrink my-12 space-x-12'>
        <Link href={'/'}>
          <button type='button' className='navBtn'>
            {isEN ? 'Return' : 'Voltar'}
          </button>
        </Link>
        <button id='Download' type='button' className='navBtn'>
          <a href={cv_link() + 'view'} target='_blank' rel='noreferrer'>
            Download
          </a>
        </button>
      </div>
    </>
  );
}
