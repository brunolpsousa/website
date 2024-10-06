'use client';

import { LangContext } from '@components/langContextProvider/LangContextProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Thanks(): JSX.Element {
  const router = useRouter();
  const isEN = useContext(LangContext);

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
      <h1 className='mb-3 text-3xl font-medium'>
        {isEN ? 'Message sent successfully' : 'Mensagem enviada com sucesso'}
      </h1>
      <p className='mb-3 text-2xl'>{isEN ? 'Thank you!' : 'Obrigado!'}</p>
      <Link href={'/'}>
        <button id='ReturnButton-Thx' type='button' className='navBtn my-12'>
          {isEN ? 'Return' : 'Voltar'}
        </button>
      </Link>
    </>
  );
}
