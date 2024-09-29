import Intro from '@components/home/Intro'
import Timeline from '@components/home/Timeline'
import Contact from '@components/home/Contact'

export default function Home() {
  return (
    <>
    <div className='flex flex-col items-center justify-center pb-12 m-auto w-full'>
      <Intro />
      <Timeline />
      <Contact />
    </div>
    </>
  )
}
