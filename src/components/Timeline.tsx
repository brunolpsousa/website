import timeline from '../data/timeline'
import TimelineItem from './TimelineItem'
import Title from './Title'

export default function Timeline() {
  return (
    <div className='flex flex-col md:flex-row justify-center my-16'>
      <div className='w-full md:w-7/12'>
        <Title id='Timeline'>Linha do tempo</Title>
        {timeline.map((item) => (
          <TimelineItem
            key='TimelineItem'
            year={item.year}
            title={item.title}
            duration={item.duration}
            details={item.details}
          />
        ))}
      </div>
    </div>
  )
}