import Title from './Title'
import TimelineItem from './TimelineItem'
import timeline from '../data/timeline'
import { localLang } from './localLang'

export default function Timeline() {
  const timemap = () => {
    const timelang = localLang() ? timeline.en : timeline.pt
    return timelang.map((item) => (
      <TimelineItem
        key='TimelineItem'
        year={item.year}
        title={item.title}
        duration={item.duration}
        details={item.details}
      />
    ))
  }
  return (
    <div className='flex flex-col md:flex-row justify-center my-16'>
      <div id='chLang' className='w-full md:w-7/12'>
        <Title id='Timeline'>{localLang() ? 'Timeline' : 'Linha do tempo'}</Title>
        {timemap()}
      </div>
    </div>
  )
}
