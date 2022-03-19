import React, { useState } from 'react';
import type { NextPage } from 'next';
import style from './header.panel.module.scss';
import ButtonHamburger from "../button.hamburger";
import Logo from "../logo";
import Search from "../search";
import ButtonDefault from "../button.default";
import Bell from "../bell";
import ButtonTransparent from "../button.transparent";
import NavAside from "../nav.aside";

interface Ipopup{
  navAside: boolean;
}

const HeaderPanel: NextPage = () => {
  const [popup, setPopup] = useState<Ipopup>({} as Ipopup);
  const clickHamburger = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clickHamburger')
  }


  return (
    <div className={`${style.header_panel} flex justify-content-between`}>
      <div className={`${style.header_panel__left} flex align-items-center `}>
        <ButtonHamburger cd={() => setPopup(prev => {return {...prev, navAside: prev.navAside ? false : true }}) }/>
        <Logo/>
        <Search classes={style.header_panel__search}/>
        <ButtonDefault text='Новая запись' path='/'/>
      </div>
      <div className={`${style.header_panel__right} flex align-items-center`}>
        <Bell />
        <ButtonTransparent text='Войти' cb={() => {}}/>
      </div>
      {popup.navAside && <NavAside />}
    </div>
  )
};

export default HeaderPanel;