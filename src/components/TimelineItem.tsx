export default function TimelineItem({
  year,
  title,
  duration,
  details,
}: {
  year: string
  title: string
  duration: string
  details: string
}) {
  return (
    <ol className='flex flex-col md:flex-row relative border-l border-zinc-300 dark:border-zinc-500'>
      <li className='mb-8 ml-4'>
        <div className='absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-zinc-300 bg-zinc-300 dark:border-zinc-500 dark:bg-zinc-500' />
        <div className='flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm'>
          <span className='inline-block px-1.5 py-1 font-semibold text-zinc-200 dark:text-zinc-800 bg-zinc-600 dark:bg-zinc-200 rounded-md'>
            {year}
          </span>
          <h3 className='text-lg font-semibold'>
            {title}
          </h3>
          <p className='my-1 text-sm font-normal leading-none'>
            {duration}
          </p>
        </div>
        <p className='my-2 text-base font-normal'>
          {details}
        </p>
      </li>
    </ol>
  )
}
