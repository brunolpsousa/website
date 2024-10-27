export default function TimelineItem({
  year,
  title,
  duration,
  details,
  isEN,
}: {
  year: string;
  title: string;
  duration: string[];
  details: string[];
  isEN: boolean;
}): JSX.Element {
  const getDuration = (duration: string[]): string => {
    const initialDate = new Date(duration[0]);
    const endDate = duration[1] ? new Date(duration[1]) : new Date();
    const totalTime = Math.round(
      (endDate.valueOf() - initialDate.valueOf()) / 1000 / 60 / 60 / 24 / 30,
    );

    if (totalTime < 2) {
      return isEN ? 'now' : 'agora';
    }

    const year = totalTime > 11 ? Math.floor(totalTime / 12) : null;
    const month = totalTime % 12;

    let result = '';

    if (year) {
      result = year.toString();
      result += isEN ? 'y ' : 'a ';
    }
    if (month > 1) {
      result += `${month}m`;
    }
    return result;
  };

  return (
    <ol className='relative flex flex-col border-l border-zinc-300 dark:border-zinc-500 md:flex-row'>
      <li className='mb-8 ml-4'>
        <div className='absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-zinc-300 bg-zinc-300 dark:border-zinc-500 dark:bg-zinc-500' />
        <div className='flex flex-row flex-wrap items-center justify-start gap-4 text-xs md:text-sm'>
          <span className='inline-block select-none rounded-md bg-zinc-600 px-1.5 py-1 font-medium text-zinc-100 dark:bg-zinc-200 dark:text-zinc-800'>
            {year}
          </span>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='my-1 text-sm font-normal leading-none'>
            {getDuration(duration)}
          </p>
        </div>
        {details.map((d) => (
          <p key={details.indexOf(d)} className='my-2 text-base font-normal'>
            {d}
          </p>
        ))}
      </li>
    </ol>
  );
}
