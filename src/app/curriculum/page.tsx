import Curriculum from '@components/curriculum/Curricullum';
import Navbar from '@components/navbar/Navbar';

export default function CurriculumPage(): JSX.Element {
  return (
    <>
      <Navbar path='/curriculum' />
      <div className='m-auto flex h-full w-full flex-col items-center justify-center'>
        <Curriculum />
      </div>
    </>
  );
}
