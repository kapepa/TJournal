import React, {FC, useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/router'
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
import {useSelector} from "react-redux";

interface Ipopup{
  navAside: boolean;
  registration: boolean;
  editor: boolean;
}

const HeaderPanel: FC = () => {
  const {query} = useContext(DataContext);
  const user = useSelector(( store: any ) => store.user);
  const router = useRouter();
  const [popup, setPopup] = useState<Ipopup>({} as Ipopup);
  const clickHamburger = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clickHamburger')
  }

  const clickButtonDefault = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    if(popup.registration){
      router.push({query: { ...router.query, registration: false }});
      setPopup({...popup, registration: false });
    } else {
      setPopup({...popup, registration: true })
    }
  }

  const clickButtonEditor = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    if(popup.editor){
      router.push({query: Object.assign(router.query, { editor: false })});
      setPopup({...popup, editor: false });
    } else {
      setPopup({...popup, editor: true })
    }
  };

  const collectorQuery = (name: string): string => {
    const { id, ...other} = router.query;
    const exist = router.query.hasOwnProperty(name)
      ? router.asPath.replace(`${name}=false`,`${name}=true`)
      : `${router.asPath}&${name}=true`;

    return Object.keys(other).length ? exist : `${router.asPath}?${name}=true`;
  }

  useEffect(() => {
    if(query) setPopup({...popup, registration: query.registration})
  },[]);

  useEffect(() => {
    if(!Object.keys(router.query).length){
      setPopup({ navAside: false, registration: false, editor: false })
    } else if (router.query.editor === 'true'){
      setPopup({ navAside: false, registration: false, editor: true })
    } else if (router.query.registration === 'true') {
      setPopup({ navAside: false, registration: true, editor: false })
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
          path={ user.id? collectorQuery('editor') : collectorQuery('registration') }
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