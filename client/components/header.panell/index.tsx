import React from 'react';
import type { NextPage } from 'next';
import style from './header.panell.module.scss';
import ButtonHamburger from "../button.hamburger";
import Logo from "../logo";
import Search from "../search";
import ButtonDefault from "../button.default";
import Bell from "../bell";
import ButtonTransparent from "../button.transparent";

const HeaderPanell: NextPage = () => {
  const clickHamburger = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clickHamburger')
  }

  return (
    <div className={style.header}>
      <div className={style.header__left}>
        <ButtonHamburger cd={clickHamburger}/>
        <Logo/>
        <Search/>
        <ButtonDefault text='Новая запись' path='/'/>
      </div>
      <div className={style.header__right}>
        {/*<Bell />*/}
        {/*<ButtonTransparent/>*/}
      </div>
    </div>
  )
};

export default HeaderPanell;