import React from 'react'
import timeline from '/src/data/timeline.js'
import TimelineItem from '/src/components/TimelineItem.jsx'
import Title from '/src/components/Title.jsx'

function Timeline() {
  return (
    <div className='flex flex-col md:flex-row justify-center my-16'>
      <div className='w-full md:w-7/12'>
        <Title>Linha do tempo</Title>
        {timeline.map((item) => (
          <TimelineItem
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

export default Timeline
