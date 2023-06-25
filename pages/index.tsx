import Intro from '@components/index/Intro'
import Timeline from '@components/index/Timeline'
import Contact from '@components/index/Contact'

export default function Index() {
  return (
    <div className='flex flex-col items-center justify-center pb-12 m-auto w-full'>
      <Intro />
      <Timeline />
      <Contact />
    </div>
  )
}
