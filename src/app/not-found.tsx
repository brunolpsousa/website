import NotFound from '@components/notFound/notFound';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className='m-auto flex w-full flex-col items-center justify-center text-center'>
      <h1 className='mb-3 text-5xl font-medium'>Oops!</h1>
      <NotFound />
    </div>
  );
}
