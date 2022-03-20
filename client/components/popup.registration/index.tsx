import type {NextPage} from "next";
import React from "react";
import style from './popup.registration.module.scss';
import ButtonXClose from "../button.xclose";

interface IPopupRegistration {
  classes?: string,
  cb: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PopupRegistration: NextPage<IPopupRegistration> = ({cb, classes}) => {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {if((e.target as HTMLDivElement).classList.contains(style.popup_registration)) cb(e) }}
      className={`flex justify-content-center align-items-center ${style.popup_registration} ${classes ? classes : ''}`}
    >
      <div className={`flex ${style.popup_registration__frame}`}>
        <ButtonXClose cd={cb} classes={style.popup_registration__close} />
        <div className={`flex ${style.popup_registration__inner}`}>
          <div className={style.popup_registration__bg} />
          <div className={`flex justify-content-center align-items-center ${style.popup_registration__content}`}>
            content
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupRegistration;

