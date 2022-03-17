import type { NextPage } from 'next';
import style from './header.module.scss';
import ButtonHamburger from "../button.hamburger";
import Logo from "../logo";

const Header: NextPage = () => {
  return (
    <div className={style.header}>
      <div className={style.header__left}>
        <ButtonHamburger/>
        <Logo/>
      </div>
      <div className={style.header__right}>

      </div>
    </div>
  )
};

export default Header;