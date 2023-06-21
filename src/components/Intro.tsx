import { getLang } from './getLang'

export default function Intro() {
  const isEN = getLang()
  const en = (
    <>
      Programmer and Analysis and Systems Development student.
      Looking for new challenges and continuous learning.
    </>
  )
  const pt = (
    <>
      Programador e estudante de Análise e Desenvolvimento de Sistemas.
      Em busca de novos desafios e aprendizado contínuo.
    </>
  )
  return (
    <div className='flex items-center justify-center flex-col text-center mt-20'>
      <h1 className='text-5xl md:text-6xl mb-1 md:mb-3 font-semibold'>
        Bruno Sousa
      </h1>
      <p className='text-xl md:text-2xl mb-3 font-medium'>
        Software Developer
      </p>
      <p className='text-sm max-w-xl mb-6 font-semibold'>
        {isEN ? en : pt}
      </p>
    </div>
  )
}
