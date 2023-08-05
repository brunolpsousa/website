import { useState } from 'react'
import getLang from '@utils/getLang'

export default () => {
  const isEN = getLang()
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'StaticForms - Contact Form',
    honeypot: '',
    message: '',
    replyTo: '@',
    redirectTo: 'https://brunolpsousa.vercel.app/thanks',
    accessKey: process.env.NEXT_PUBLIC_FORM,
  })
  console.log(contact.accessKey)

  const [_, setResponse] = useState({
    type: '',
    message: '',
  })

  const handleChange = (e: any) =>
    setContact({ ...contact, [e.target.name]: e.target.value })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' },
      })

      const json = await res.json()

      if (json.success) {
        setResponse({
          type: 'success',
          message: 'Thank you for reaching out to us.',
        })
      } else {
        setResponse({
          type: 'error',
          message: json.message,
        })
      }
    } catch (e) {
      console.log('An error occurred', e)
      setResponse({
        type: 'error',
        message: 'An error occured while submitting the form',
      })
    }
  }

  return (
    <div className='flex flex-col pb-12 w-full'>
      <div className='flex justify-center items-center'>
        <form
          action='https://api.staticforms.xyz/submit'
          method='POST'
          className='flex flex-col w-full md:w-7/12'
          onSubmit={handleSubmit}
        >
          <h1 className='text-2xl font-medium mb-5'>
            {isEN ? 'Contact' : 'Contato'}
          </h1>
          <input
            type='text'
            autoCapitalize='words'
            name='name'
            placeholder={isEN ? 'Name' : 'Nome'}
            required
            onChange={handleChange}
            className='p-2 bg-transparent border-2 border-zinc-300 dark:border-zinc-500 rounded-md focus:outline-none'
          />
          <input
            type='email'
            name='email'
            placeholder='E-mail'
            required
            onChange={handleChange}
            className='my-2 p-2 bg-transparent border-2 border-zinc-300 dark:border-zinc-500 rounded-md focus:outline-none'
          />
          <input
            type='text'
            name='honeypot'
            onChange={handleChange}
            className='hidden !imporant'
          />
          <textarea
            name='message'
            placeholder={isEN ? 'Message' : 'Mensagem'}
            rows={8}
            required
            onChange={handleChange}
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
