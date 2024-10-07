import Navbar from '@components/navbar/Navbar';
import Thanks from '@components/thanks/thanks';

export default function ThanksPage(): JSX.Element {
  return (
    <>
      <Navbar path='/thanks' />
      <div className='m-auto flex w-full flex-col items-center justify-center text-center'>
        <Thanks />
      </div>
    </>
  );
}
