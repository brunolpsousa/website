import Intro from '../src/components/Intro'
import Timeline from '../src/components/Timeline'
import Contact from '../src/components/Contact'

export default function Index() {
  return (
    <div className='flex flex-col items-center justify-center pb-12 m-auto w-full'>
      <Intro />
      <Timeline />
      <Contact />
    </div>
  )
}
