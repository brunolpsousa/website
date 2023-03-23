import { useTheme } from '/src/components/Theme.jsx'

export default function ThankYou() {
  useTheme()
  return (
    <div className='flex items-center justify-center flex-col text-center pt-20 my-56 pb-6'>
      <p className='text-base md:text-4xl text-stone-600 dark:text-stone-100 mb-3 font-medium'>
        Mensagem enviada com sucesso
      </p>
      <p className='text-lg max-w-xl mb-6 text-stone-500 dark:text-stone-300 font-semibold'>
        Obrigado!
      </p>
    </div>
  )
}
