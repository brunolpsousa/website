'use client';

import { getLang } from '@utils/getLang';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound(): JSX.Element {
  const router = useRouter();
  const isEN = getLang();

  useEffect(() => {
    const interval = setInterval(() => {
      router.push('/');
      clearInterval(interval);
    }, 5000);

    window.onbeforeunload = () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <>
      <p className='mb-3 text-2xl'>
        {isEN
          ? 'Could not load this page'
          : 'Não foi possível carregar esta página'}
      </p>
      <Link href={'/'}>
        <button id='ReturnButton-404' type='button' className='navBtn my-12'>
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </>
  );
}
