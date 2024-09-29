import ButtonLang from "./buttonLang";
import ButtonTheme from "./buttonTheme";
import NavbarItems from "./navbarItems";

export default function Navbar ({path}: {path: string}) {
  return (
    <ul
      id='navbar'
      className='font-medium flex flex-row place-content-end items-center relative mb-8 pb-8 top-2 w-full'
    >
      <li id='buttonTheme' className='navItem absolute left-0'>
        <ButtonTheme />
      </li>
      <NavbarItems path={path} />
      <li id='buttonLang' className='navItem hover:no-underline'>
        <ButtonLang />
      </li>
    </ul>
  )
}
