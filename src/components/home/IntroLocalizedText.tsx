"use client"

import {getLang} from '@utils/getLang'

export default function IntroLocalizedText(){
  const isEN = getLang()
  const en = (
    <>
      Programmer and Analysis and Systems Development student. Looking for
      challenges and continuous learning.
    </>
  )
  const pt = (
    <>
      Programador e estudante de Análise e Desenvolvimento de Sistemas. Em busca
      de desafios e aprendizado contínuo.
    </>
  )
  return isEN ? en : pt
}
