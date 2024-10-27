'use client';

import { LangContext } from '@components/context/LangContextProvider';
import { useContext, useState } from 'react';

export default function Contact(): JSX.Element {
  const isEN = useContext(LangContext);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'StaticForms - Contact Form',
    honeypot: '',
    message: '',
    replyTo: '@',
    redirectTo: 'https://brunolpsousa.vercel.app/thanks',
    accessKey: process.env.NEXT_PUBLIC_FORM,
  });

  const [_, setResponse] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e: any) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          message: 'Thank you for reaching out to us.',
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message,
        });
      }
    } catch (_) {
      setResponse({
        type: 'error',
        message: 'An error occured while submitting the form',
      });
    } finally {
      window.location.replace('thanks');
    }
  };

  return (
    <div className='flex w-full flex-col pb-12'>
      <div className='flex items-center justify-center'>
        <form
          action='https://api.staticforms.xyz/submit'
          method='POST'
          className='flex w-full flex-col md:w-7/12'
          onSubmit={(e) => void handleSubmit(e)}
        >
          <h1 className='m-auto mb-3 flex flex-col pb-12 text-5xl font-medium'>
            {isEN ? 'Contact' : 'Contato'}
          </h1>
          <input
            type='text'
            autoCapitalize='words'
            name='name'
            placeholder={isEN ? 'Name' : 'Nome'}
            required
            onChange={handleChange}
            className='rounded-md border-2 border-zinc-300 bg-transparent p-2 focus:outline-none dark:border-zinc-500'
          />
          <input
            type='email'
            name='email'
            placeholder='E-mail'
            required
            onChange={handleChange}
            className='my-2 rounded-md border-2 border-zinc-300 bg-transparent p-2 focus:outline-none dark:border-zinc-500'
          />
          <input
            type='text'
            name='honeypot'
            onChange={handleChange}
            className='!imporant hidden'
          />
          <textarea
            name='message'
            placeholder={isEN ? 'Message' : 'Mensagem'}
            rows={8}
            required
            onChange={handleChange}
            className='mb-4 rounded-md border-2 border-zinc-300 bg-transparent p-2 focus:outline-none dark:border-zinc-500'
          />
          <button type='submit' className='navBtn place-self-end'>
            {isEN ? 'Send' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}
