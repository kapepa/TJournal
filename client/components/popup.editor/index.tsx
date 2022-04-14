import React, {FC, useRef, useState} from 'react';
import dynamic from "next/dynamic";
import style from './style.module.scss';
import ButtonXClose from "../button.xclose";
import ButtonDefault from "../button.default";
import {CreateArticle} from "../../helpers/request";
import {useRouter} from "next/router";

let Redactor = dynamic(() => import('../сustom.editor/index'), {
  ssr: false
});

interface IState {
  title: string,
  text: string,
  file: File,
}

interface IPopupEditor {
  cb: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const PopupEditor: FC<IPopupEditor> = ({cb}) => {
  const route = useRouter()
  const [state, setState] = useState<IState>({} as IState);

  const sendArticle = async () => {
    const form = new FormData();
    Object.keys(state).forEach(key => form.append(key, state[(key as keyof IState)]));
    await CreateArticle(form).then(art => route.push(`/article/${art}`));
  }

  const writeArticle = (data: IState) => {setState({...state, ...data})};

  const writeImage = async (file: File) => {
    setState({...state, file: file})
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        resolve(e.target?.result);
      }
    })
  }

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if((e.target as HTMLDivElement).classList.contains(style.popup_editor)) cb(e)
      }}
      className={`flex justify-content-center align-items-center ${style.popup_editor}`}
    >
      <div className={`flex ${style.popup_editor__frame}`}>
        <ButtonXClose cd={cb} classes={style.popup_editor__close} />
        <div className={`flex flex-direction-column ${style.popup_editor__area}`}>
          <h4 className={`${style.popup_editor__title}`}>Редактор</h4>
          {Redactor && <Redactor
            classes={style.popup_editor__redactor}
            cb={writeArticle}
            picture={writeImage}
          />}
          <div className={`flex justify-content-center`}>
            <ButtonDefault type='blue' text='Опубликовать' cb={sendArticle}/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PopupEditor;