import TimelineItem from './TimelineItem'
import timeline from '@data/timeline'
import getLang from '@utils/getLang'

export default () => {
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
      />
    ))
  }
  return (
    <div className='flex flex-col md:flex-row justify-center py-12'>
      <div className='w-full md:w-7/12'>
        <h1 className='text-2xl font-medium mb-5'>
          {isEN ? 'Timeline' : 'Linha do tempo'}
        </h1>
        {timemap()}
      </div>
    </div>
  )
}
