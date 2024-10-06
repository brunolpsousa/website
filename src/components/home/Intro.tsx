import IntroLocalizedText from './IntroLocalizedText';

export default function Intro(): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center text-center md:w-7/12'>
      <h1 className='pb-3 text-6xl font-semibold'>Bruno Sousa</h1>
      <p className='pb-3 text-2xl font-medium'>Software Developer</p>
      <p className='max-w-xl pb-6 text-sm font-semibold'>
        <IntroLocalizedText />
      </p>
    </div>
  );
}
