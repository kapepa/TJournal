import React, {FC, useRef} from "react";
import style from './style.module.scss';
import ButtonDefault from "../button.default";
import ButtonXClose from "../button.xclose";

interface IPopupWrong {
  close: () => void,
  message: string,
}

const PopupWrong: FC<IPopupWrong> = ({close, message}) => {
  const textRef = useRef<string>();

  switch (message){
    case 'Conflict': textRef.current = 'Такой email уже используется.'; break;
    case 'Unauthorized': textRef.current = 'Неправильно введен пароль или логин.' ; break;
    case 'Image': textRef.current = 'Выберите картинку для статьи'; break;
    case 'Title': textRef.current = 'Выберите заголовок для статьии'; break;
    case 'Text': textRef.current = 'Выберите текст для статьии'; break;
    case 'Auth': textRef.current = 'Авторизуйтесь для того чтобы прочитать'; break;
    case 'Coincidence': textRef.current = 'Пароли не совпадают!'; break;
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
        <span className={`${style.popup_wrong__span}`}>{textRef.current}</span>
        <div className={`flex justify-content-center ${style.popup_wrong__area_btn}`}>
          <ButtonDefault text='OK' cb={close} type='blue' classes={`${style.popup_wrong__btn}`} />
        </div>
      </div>
    </div>
  )
}

export default PopupWrong;