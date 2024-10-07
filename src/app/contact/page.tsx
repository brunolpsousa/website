import Contact from '@components/home/Contact';
import Navbar from '@components/navbar/Navbar';

export default function ContactPage(): JSX.Element {
  return (
    <>
      <Navbar path='/contact' />
      <div className='m-auto flex h-full w-full flex-col items-center justify-center'>
        <Contact />
      </div>
    </>
  );
}
