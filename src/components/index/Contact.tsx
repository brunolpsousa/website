import { gfToken } from '../../data/getform'
import { getLang } from '../../utils/getLang'

export default function Contact() {
  const isEN = getLang()
  return (
    <div className='flex flex-col pb-12 w-full'>
      <div className='flex justify-center items-center'>
        <form
          action={gfToken}
          method='POST'
          className='flex flex-col w-full md:w-7/12'
        >
          <h1 className='text-2xl font-medium mb-5'>
            {isEN ? 'Contact' : 'Contato'}
          </h1>
          <input type='hidden' name='_gotcha' className='hidden !imporant' />
          <input
            type='text'
            autoCapitalize='words'
            name='Name'
            placeholder={isEN ? 'Name' : 'Nome'}
            className='p-2 bg-transparent border-2 border-zinc-300 dark:border-zinc-500 rounded-md focus:outline-none'
          />
          <input
            type='email'
            name='E-mail'
            placeholder='E-mail'
            className='my-2 p-2 bg-transparent border-2 border-zinc-300 dark:border-zinc-500 rounded-md focus:outline-none'
          />
          <textarea
            name='Message'
            placeholder={isEN ? 'Message' : 'Mensagem'}
            rows={8}
            className='p-2 mb-4 bg-transparent border-2 border-zinc-300 dark:border-zinc-500 rounded-md focus:outline-none'
          />
          <button type='submit' className='navBtn place-self-end'>
            {isEN ? 'Send' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}
