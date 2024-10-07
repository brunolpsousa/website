import Navbar from '@components/navbar/Navbar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Navbar path='/projects' />
      {children}
    </>
  );
}
