"use client"

import { getLang } from '@utils/getLang'
import TimelineItem from './TimelineItem'
import {timeline} from '@data/timeline'

export default function TimelineBuiler() {
  const isEN = getLang()

  const timemap = () => {
    const timelang = isEN ? timeline.en : timeline.pt

    return timelang.map((item) => (
      <TimelineItem
        key={item.title}
        year={item.year}
        title={item.title}
        duration={item.duration}
        details={item.details}
        isEN={isEN}
      />
    ))
  }
  return (
    <>
        <h1 className='text-2xl font-medium mb-5'>
          {isEN ? 'Timeline' : 'Linha do tempo'}
        </h1>
        {timemap()}
    </>
  )
}
