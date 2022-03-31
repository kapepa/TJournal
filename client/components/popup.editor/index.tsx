import React, {FC, useRef, useState} from 'react';
import dynamic from "next/dynamic";
import style from './style.module.scss';
import ButtonXClose from "../button.xclose";
import ButtonDefault from "../button.default";


let Redactor = dynamic(() => import('../сustom.editor/index'), {
  ssr: false
});

interface IState {
  title: string,
  text: string,
}

interface IPopupEditor {
  cb: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const PopupEditor: FC<IPopupEditor> = ({cb}) => {
  const refRedactor = useRef<any>(null);
  const [state, setState] = useState<IState>({} as IState);

  const sendArticle = () => {
    const data = refRedactor.current.props.data.blocks;
    console.log(data)
  }

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {if((e.target as HTMLDivElement).classList.contains(style.popup_editor)) cb(e) }}
      className={`flex justify-content-center align-items-center ${style.popup_editor}`}
    >
      <div className={`flex ${style.popup_editor__frame}`}>
        <ButtonXClose cd={cb} classes={style.popup_editor__close} />
        <div className={`flex flex-direction-column ${style.popup_editor__area}`}>
          <h4 className={`${style.popup_editor__title}`}>Редактор</h4>
          {Redactor && <Redactor refRedactor={refRedactor} classes={style.popup_editor__redactor}/>}
          <div className={`flex justify-content-center`}>
            <ButtonDefault type='blue' text='Опубликовать' cb={sendArticle}/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PopupEditor;