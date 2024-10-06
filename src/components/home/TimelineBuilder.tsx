'use client';

import { timeline } from '@data/timeline';
import { getLang } from '@utils/getLang';

import TimelineItem from './TimelineItem';

export default function TimelineBuiler(): JSX.Element {
  const isEN = getLang();

  const timemap = () => {
    const timelang = isEN ? timeline.en : timeline.pt;

    return timelang.map((item) => (
      <TimelineItem
        key={item.title}
        year={item.year}
        title={item.title}
        duration={item.duration}
        details={item.details}
        isEN={isEN}
      />
    ));
  };
  return (
    <>
      <h1 className='mb-5 text-2xl font-medium'>
        {isEN ? 'Timeline' : 'Linha do tempo'}
      </h1>
      {timemap()}
    </>
  );
}
