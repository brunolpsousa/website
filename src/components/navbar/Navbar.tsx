import ButtonLang from './buttonLang';
import ButtonTheme from './buttonTheme';
import NavbarItems from './navbarItems';

export default function Navbar({ path }: { path: string }): JSX.Element {
  return (
    <ul
      id='navbar'
      className='relative top-2 mb-8 flex w-full flex-row place-content-end items-center pb-8 font-medium'
    >
      <li id='buttonTheme' className='navItem absolute left-0'>
        <ButtonTheme />
      </li>
      <NavbarItems path={path} />
      <li id='buttonLang' className='navItem hover:no-underline'>
        <ButtonLang />
      </li>
    </ul>
  );
}
