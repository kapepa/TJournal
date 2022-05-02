import React, {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from './style.module.scss';
import ButtonSocial from "../button.social";
import Cookie from "js-cookie";
import config from "../../config";
import {useSelector} from "react-redux";

const Notification: FC = () => {
  const router = useRouter();
  const user = useSelector(( store: any ) => store.user);

  const clickGoogle = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    window.open(`${config.url}/api/auth/google`, `AuthGoogle`, `width=500px,height=500px`);
  };

  const clickFacebook = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    window.open(`${config.url}/api/auth/facebook`, `AuthGoogle`, `width=500px,height=500px`);
  };

  useEffect(() => {
    if( window ) addEventListener('message', event => {
      const { token, ...other } = event.data;
      if(token) {
        Cookie.set('token', token);
        router.push('/home')
      }
    });
  },[]);

  return (
    <div className={`${style.notification}`}>
      <div className={`${style.notification__wrapp}`}>
      <div className={`${style.notification__cap}`}>
        <h4 className={`${style.notification__h4}`}>Уведомления</h4>
      </div>
      <div className={`flex ${style.notification__body}`}>
        {
          Boolean(user.id)
            ?
              <>
                <div className={`${style.notification__left}`}>
                  <div className={style.notification__alarm} />
                </div>
                <div className={`${style.notification__right}`}>
                <span className={style.notification__desc}>
                  Авторизуйтесь или зарегистрируйтесь, чтобы оценивать материалы, создавать записи и писать комментарии.
                </span>
                  <div className={`flex ${style.notification__social}`}>
                    <ButtonSocial size='small' icon='email' cb={() => { router.push({query:{ registration: true }}) }}/>
                    <ButtonSocial size='small' icon='google' cb={clickGoogle}/>
                    <ButtonSocial size='small' icon='facebook' cb={clickFacebook}/>
                    <ButtonSocial size='small' icon='vk' cb={() => {}}/>
                    <ButtonSocial size='small' icon='twitter' cb={() => {}}/>
                    <ButtonSocial size='small' icon='apple' cb={() => {}}/>
                  </div>
                </div>
              </>
            :
            <div>Уведомления пока нету</div>
        }
      </div>
      </div>
    </div>
  )
}

export default Notification;