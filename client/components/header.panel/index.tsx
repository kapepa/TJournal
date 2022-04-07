import React, {FC, useEffect, useState, useContext} from 'react';
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
import {DataContext} from "../../layout/layout.default";
import PopupEditor from "../popup.editor";
import Avatar from "../avatar";

interface Ipopup{
  navAside: boolean;
  registration: boolean;
  editor: boolean;
}

const HeaderPanel: FC = () => {
  const {query, user} = useContext(DataContext);
  const router= useRouter();
  const [popup, setPopup] = useState<Ipopup>({} as Ipopup);
  const clickHamburger = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clickHamburger')
  }

  const clickButtonDefault = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    if(popup.registration){
      Router.push({query: { registration: false }});
      setPopup({...popup, registration: false });
    } else {
      setPopup({...popup, registration: true })
    }
  }

  const clickButtonEditor = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    if(popup.editor){
      Router.push({query: { editor: false }});
      setPopup({...popup, editor: false });
    } else {
      setPopup({...popup, editor: true })
    }
  };

  useEffect(() => {
    if(query) setPopup({...popup, registration: query.registration})
  },[]);

  useEffect(() => {
    if(!Object.keys(router.query).length){
      setPopup({ navAside: false, registration: false, editor: false})
    } else if (router.query.editor === 'true'){
      setPopup({ navAside: false, registration: false, editor: true })
    }
  },[router.query])

  return (
    <div className={`${style.header_panel} flex justify-content-between`}>
      <div className={`${style.header_panel__left} flex align-items-center `}>
        <ButtonHamburger
          cb={() => setPopup(prev => {return {...prev, navAside: prev.navAside ? false : true }}) }
        />
        <Logo/>
        <Search classes={style.header_panel__search}/>
        <ButtonDefault
          text='Новая запись'
          path={ user.id ? `${router.pathname}?editor=true` : `${router.pathname}?registration=true`}
          cb={ user.id ? clickButtonEditor : clickButtonDefault}
          type='def'
        />
      </div>
      <div className={`${style.header_panel__right} flex align-items-center`}>
        <Bell />
        { user.id ?
          <Avatar
            name={user.name}
            path='/profile'
            image={user.avatar}
          /> :
          <ButtonTransparent
            text='Войти'
            cb={clickButtonDefault}
          />
        }
      </div>
      {popup.navAside && <NavAside />}
      {popup.registration && <PopupRegistration cb={clickButtonDefault} />}
      {popup.editor && <PopupEditor cb={clickButtonEditor}/>}
    </div>
  )
};

export default HeaderPanel;