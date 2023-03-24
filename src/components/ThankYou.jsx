import { Link } from 'react-router-dom'

export default function ThankYou() {
  const returnToIndex = () => {
    let sec = 5
    let timer = setInterval(function () {
      sec--
      if (sec <= 0) {
        clearInterval(timer)
        document.getElementById('ReturnButton').click()
      }
    }, 1000)
  }

  return (
    <div className='pt-1' onLoad={returnToIndex()}>
      <div className='flex items-center justify-center flex-col text-center pt-20 my-40 pb-6'>
        <p className='text-base md:text-4xl text-stone-600 dark:text-stone-100 mb-3 font-medium'>
          Mensagem enviada com sucesso
        </p>
        <p className='text-base md:text-xl max-w-xl mb-6 text-stone-500 dark:text-stone-300 font-semibold'>
          Obrigado!
        </p>
        <Link to={'/'}>
          <button
            id='ReturnButton'
            type='button'
            className='text-center inline-block my-12 px-8 py-3 w-max text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
          >
            Voltar
          </button>
        </Link>
      </div>
    </div>
  )
}
