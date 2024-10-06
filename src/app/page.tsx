import Contact from '@components/home/Contact';
import Intro from '@components/home/Intro';
import Timeline from '@components/home/Timeline';
import Navbar from '@components/navbar/Navbar';

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar path='/' />
      <div className='m-auto flex w-full flex-col items-center justify-center pb-12'>
        <Intro />
        <Timeline />
        <Contact />
      </div>
    </>
  );
}
