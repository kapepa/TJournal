import React, {FC, useState} from "react";
import style from './style.module.scss';

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
          <div className={`${style.notification__social}`}>

          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Notification;