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
      className='text-2xl font-medium mb-5'
    >
      {children}
    </h1>
  )
}
