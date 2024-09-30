import Curriculum from '@components/curriculum/Curricullum';
import Navbar from '@components/navbar/Navbar';

export default function CurriculumPage(): JSX.Element {
  return (
    <>
      <Navbar path='/curriculum' />
      <div className='flex flex-col items-center justify-center m-auto h-full w-full'>
        <Curriculum />
      </div>
    </>
  );
}
