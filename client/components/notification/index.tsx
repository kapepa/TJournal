import React, {FC, useState} from "react";
import style from './style.module.scss';
import ButtonSocial from "../button.social";

const Notification: FC = () => {
  return (
    <div className={`${style.notification}`}>
      <div className={`${style.notification__wrapp}`}>
      <div className={`${style.notification__cap}`}>
        <h4 className={`${style.notification__h4}`}>Уведомления</h4>
      </div>
      <div className={`flex ${style.notification__body}`}>
        <div className={`${style.notification__left}`}>
          <div className={style.notification__alarm} />
        </div>
        <div className={`${style.notification__right}`}>
          <span className={style.notification__desc}>
            Авторизуйтесь или зарегистрируйтесь, чтобы оценивать материалы, создавать записи и писать комментарии.
          </span>
          <div className={`flex ${style.notification__social}`}>
            <ButtonSocial size='small' icon='facebook' cb={() => {}}/>
            <ButtonSocial size='small' icon='vk' cb={() => {}}/>
            <ButtonSocial size='small' icon='google' cb={() => {}}/>
            <ButtonSocial size='small' icon='twitter' cb={() => {}}/>
            <ButtonSocial size='small' icon='apple' cb={() => {}}/>
            <ButtonSocial size='small' icon='email' cb={() => {}}/>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Notification;