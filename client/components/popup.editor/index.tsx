import React, {FC, useState} from 'react';
import style from './style.module.scss';
import ButtonXClose from "../button.xclose";
import InputTextarea from "../input.textarea";

interface IState {
  title: string,
  text: string,
}

interface IPopupEditor {
  cb: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const PopupEditor: FC<IPopupEditor> = ({cb}) => {
  const [state, setState] = useState<IState>({} as IState);

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const area = (e.target as HTMLTextAreaElement);
    setState({...state, title: area.value});
  }

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {if((e.target as HTMLDivElement).classList.contains(style.popup_editor)) cb(e) }}
      className={`flex justify-content-center align-items-center ${style.popup_editor}`}
    >
      <div className={`flex ${style.popup_editor__frame}`}>
        <ButtonXClose cd={cb} classes={style.popup_editor__close} />
        <InputTextarea placeholder='Заголовок' change={changeTitle} classes={`${style.popup_editor__title}`} name='title'/>
      </div>
    </div>
  )
};

export default PopupEditor;