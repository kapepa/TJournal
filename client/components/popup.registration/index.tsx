import React, {FC} from "react";
import style from './style.module.scss';
import ButtonXClose from "../button.xclose";
import ButtonSocial from "../button.social";

interface IPopupRegistration {
  classes?: string,
  cb: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PopupRegistration: FC<IPopupRegistration> = ({cb, classes}) => {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {if((e.target as HTMLDivElement).classList.contains(style.popup_registration)) cb(e) }}
      className={`flex justify-content-center align-items-center ${style.popup_registration} ${classes ? classes : ''}`}
    >
      <div className={`flex ${style.popup_registration__frame}`}>
        <ButtonXClose cd={cb} classes={style.popup_registration__close} />
        <div className={`flex ${style.popup_registration__inner}`}>
          <div className={style.popup_registration__bg} />
          <div className={`flex justify-content-center flex-direction-column ${style.popup_registration__content}`}>
            <h3 className={style.popup_registration__h3}>Регистрация</h3>
            <ButtonSocial cb={() => {}} text="Почта" icon='email' classes={style.popup_registration__btn_social} />
            <ButtonSocial cb={() => {}} text="ВКонтакте" icon='vk' classes={style.popup_registration__btn_social}/>
            <ButtonSocial cb={() => {}} text="Google" icon='google' classes={style.popup_registration__btn_social}/>
            <div className={`flex ${style.popup_registration__gorizont}`}>
              <ButtonSocial cb={() => {}}  icon='email' />
              <ButtonSocial cb={() => {}}  icon='twitter' />
              <ButtonSocial cb={() => {}}  icon='apple' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupRegistration;

