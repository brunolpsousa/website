import Title from './Title'
import { gfToken } from '../data/getform'
import { localLang } from './localLang'

export default function Contact() {
  return (
    <div className='flex flex-col mb-10 mx-auto w-full h-screen'>
      <div className='flex justify-center items-center'>
        <form
          action={gfToken}
          method='POST'
          className='flex flex-col w-full md:w-7/12'
        >
          <Title id='Contact'>{localLang() ? 'Contact' : 'Contato'}</Title>
          <input type='hidden' name='_gotcha' className='hidden !imporant' />
          <input
            type='text'
            name='Name'
            placeholder={localLang() ? 'Name' : 'Nome'}
            className='p-2 bg-transparent border-2 dark:border-stone-500 rounded-md focus:outline-none'
          />
          <input
            type='text'
            name='Email'
            placeholder='Email'
            className='my-2 p-2 bg-transparent border-2 dark:border-stone-500 rounded-md focus:outline-none'
          />
          <textarea
            name='Message'
            placeholder={localLang() ? 'Message' : 'Mensagem'}
            rows={8}
            className='p-2 mb-4 bg-transparent border-2 dark:border-stone-500 rounded-md focus:outline-none'
          />
          <button
            type='submit'
            className='text-center place-self-end inline-block px-8 py-3 w-max text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
          >
            {localLang() ? 'Send' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}
