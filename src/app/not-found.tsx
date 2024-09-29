import NotFoundClient from "@components/notFound/notFound"

export default function NotFound () {
  return (
    <div
      className='flex flex-col items-center justify-center text-center m-auto w-full'
    >
      <h1 className='text-5xl mb-3 font-medium'>Oops!</h1>
      <NotFoundClient/>
    </div>
  )
}
