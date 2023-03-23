import Intro from '/src/components/Intro.jsx'
import Timeline from '/src/components/Timeline.jsx'
import Contact from '/src/components/Contact.jsx'

export default function Index() {
  return (
    <div className='bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-300 min-h-screen font-inter'>
      <div className='max-w-5xl w-11/12 mx-auto'>
        <Intro />
        <Timeline />
        <Contact />
      </div>
    </div>
  )
}
