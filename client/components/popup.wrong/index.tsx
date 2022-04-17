import React, {FC} from "react";
import style from './style.module.scss';
import ButtonDefault from "../button.default";
import ButtonXClose from "../button.xclose";

interface IPopupWrong {
  close: () => void,
  message: string,
}

const PopupWrong: FC<IPopupWrong> = ({close, message}) => {
  let text;
  switch (message){
    case 'Conflict': text = 'Такой email уже используется.'; break;
    case 'Unauthorized': text = 'Неправильно введен пароль или логин.' ; break;
    case 'Image': text = 'Выберите картинку для статьи'; break;
    case 'Title': text = 'Выберите заголовок для статьии'; break;
    case 'Text': text = 'Выберите текст для статьии'; break;
  }

  return (
    <div
      className={`flex justify-content-center align-items-center ${style.popup_wrong}`}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if(e.currentTarget.classList.contains(style.popup_wrong)) close();
      }}
    >
      <div className={`flex flex-direction-column ${style.popup_wrong__frame}`}>
        <ButtonXClose cd={close} classes={`${style.popup_wrong__xclose}`}/>
        <h5 className={`${style.popup_wrong__h5}`}>Ошибка</h5>
        <span className={`${style.popup_wrong__span}`}>{text}</span>
        <div className={`flex justify-content-center ${style.popup_wrong__area_btn}`}>
          <ButtonDefault text='OK' cb={close} type='blue' classes={`${style.popup_wrong__btn}`} />
        </div>
      </div>
    </div>
  )
}

export default PopupWrong;