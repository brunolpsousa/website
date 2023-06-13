export default function Title({
  children,
  id,
}: {
  children: string
  id: string
}) {
  return (
    <h1
      id={id && id}
      className='text-2xl font-bold underline underline-offset-8 decoration-4 mb-5 text-stone-800 dark:text-stone-100'
    >
      {children}
    </h1>
  )
}
