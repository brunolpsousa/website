export default function TimelineItem({
  year,
  title,
  duration,
  details,
  isEN,
}: {
  year: string
  title: string
  duration: string[]
  details: string
    isEN: boolean
}) {
  const getDuration = (duration: string[]): string => {
    const initialDate = new Date(duration[0])
    const endDate = duration[1] ? new Date(duration[1]) : new Date()
    const totalTime = Math.round(
      (endDate.valueOf() - initialDate.valueOf()) / 1000 / 60 / 60 / 24 / 30,
    )

    if (totalTime < 2) {
      return isEN ? 'now' : 'agora'
    }

    const year = totalTime > 11 ? Math.floor(totalTime / 12) : null
    const month = totalTime % 12

    let result = ''

    if (year) {
      result = year.toString()
      result += isEN ? 'y ' : 'a '
    }
    if (month > 1) {
      result += `${month}m`
    }
    return result
  }
  return (
    <ol className='flex flex-col md:flex-row relative border-l border-zinc-300 dark:border-zinc-500'>
      <li className='mb-8 ml-4'>
        <div className='absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-zinc-300 bg-zinc-300 dark:border-zinc-500 dark:bg-zinc-500' />
        <div className='flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm'>
          <span className='inline-block px-1.5 py-1 font-medium select-none text-zinc-100 dark:text-zinc-800 bg-zinc-600 dark:bg-zinc-200 rounded-md'>
            {year}
          </span>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='my-1 text-sm font-normal leading-none'>
            {getDuration(duration)}
          </p>
        </div>
        <p className='my-2 text-base font-normal'>{details}</p>
      </li>
    </ol>
  )
}
