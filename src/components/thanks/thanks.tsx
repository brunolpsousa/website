'use client';

import { getLang } from '@utils/getLang';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Thanks(): JSX.Element {
  const router = useRouter();
  const isEN = getLang();

  useEffect(() => {
    const interval = setInterval(() => {
      router.push('/');
      clearInterval(interval);
    }, 7000);

    window.onbeforeunload = () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h1 className='text-3xl mb-3 font-medium'>
        {isEN ? 'Message sent successfully' : 'Mensagem enviada com sucesso'}
      </h1>
      <p className='text-2xl mb-3'>{isEN ? 'Thank you!' : 'Obrigado!'}</p>
      <Link href={'/'}>
        <button id='ReturnButton-Thx' type='button' className='navBtn my-12'>
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </>
  );
}
