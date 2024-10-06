'use client';

import { LangContext } from '@components/langContextProvider/LangContextProvider';
import Link from 'next/link';
import { useContext } from 'react';

export default function Curriculum(): JSX.Element {
  const isEN = useContext(LangContext);
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
      <div className='my-12 flex flex-shrink space-x-12'>
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
