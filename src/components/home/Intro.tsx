import IntroLocalizedText from './IntroLocalizedText';

export default function Intro(): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center text-center md:w-7/12'>
      <h1 className='text-6xl pb-3 font-semibold'>Bruno Sousa</h1>
      <p className='text-2xl pb-3 font-medium'>Software Developer</p>
      <p className='text-sm max-w-xl pb-6 font-semibold'>
        <IntroLocalizedText />
      </p>
    </div>
  );
}
