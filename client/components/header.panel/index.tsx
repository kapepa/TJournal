import React, {FC, useEffect, useState} from 'react';
import Router, { useRouter } from 'next/router'
import style from './style.module.scss';
import ButtonHamburger from "../button.hamburger";
import Logo from "../logo";
import Search from "../search";
import ButtonDefault from "../button.default";
import Bell from "../bell";
import ButtonTransparent from "../button.transparent";
import NavAside from "../nav.aside";
import PopupRegistration from "../popup.registration";

interface Ipopup{
  navAside: boolean;
  registration: boolean;
}

const HeaderPanel: FC = () => {
  const router = useRouter();
  const [popup, setPopup] = useState<Ipopup>({} as Ipopup);
  const clickHamburger = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clickHamburger')
  }

  const clickButtonDefault = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    if(popup.registration){
      Router.push({query: { registration: false }});
      setPopup({...popup, registration: false });
    } else {
      setPopup({...popup, registration: true })
    }
  }

  useEffect(() => {
    let query = router.query;
    if(query.registration) setPopup(prev => {return {...prev, registration: true}});
  },[])

  return (
    <div className={`${style.header_panel} flex justify-content-between`}>
      <div className={`${style.header_panel__left} flex align-items-center `}>
        <ButtonHamburger
          cd={() => setPopup(prev => {return {...prev, navAside: prev.navAside ? false : true }}) }
        />
        <Logo/>
        <Search classes={style.header_panel__search}/>
        <ButtonDefault
          text='Новая запись'
          path={`${router.pathname}?registration=true`}
          cb={clickButtonDefault}
        />
      </div>
      <div className={`${style.header_panel__right} flex align-items-center`}>
        <Bell />
        <ButtonTransparent text='Войти' cb={() => {}}/>
      </div>
      {popup.navAside && <NavAside />}
      {popup.registration && <PopupRegistration cb={clickButtonDefault} />}
    </div>
  )
};

export default HeaderPanel;