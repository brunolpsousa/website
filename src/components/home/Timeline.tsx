import TimelineBuilder from './TimelineBuilder';

export default function Timeline(): JSX.Element {
  return (
    <div className='flex flex-col md:flex-row justify-center py-12'>
      <div className='w-full md:w-7/12'>
        <TimelineBuilder />
      </div>
    </div>
  );
}
