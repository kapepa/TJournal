import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import dynamic from "next/dynamic";
import style from './style.module.scss';
import ButtonXClose from "../button.xclose";
import ButtonDefault from "../button.default";
import {CreateArticle} from "../../helpers/request";
import {useRouter} from "next/router";
import InputSelect from "../input.select";
import {DataContext} from "../../layout/layout.default";

const Redactor = dynamic(() => import('../сustom.editor/index'), {
  ssr: false
});

interface IState {
  title: string,
  text: string,
  type: string,
  file: File,
}

interface IPopupEditor {
  cb: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const PopupEditor: FC<IPopupEditor> = ({cb}) => {
  const route = useRouter();
  const { wrong } = useContext(DataContext);
  const [file, setFile] = useState<File>();
  const [state, setState] = useState<IState>({type: 'news', file} as IState);

  const sendArticle = async () => {
    const form = new FormData();
    if(!state.title) return wrong('Title');
    if(!state.text) return wrong('Text');
    if(!file) return wrong('Image');
    Object.keys(state).forEach(key => form.append(key, state[(key as keyof IState)]));
    await CreateArticle(form).then(art => route.push(`/article/${art}`));
  }

  const writeArticle = (data: {title: string, text: string}) => {setState({...state, ...data})};

  const writeImage = (file: File) => {
    setFile(file)
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        resolve(e.target?.result);
      }
    })
  }

  useEffect(() => {
    file && setState({...state, file});
  },[file])

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
          <div className={`flex justify-content-center`}>
            <InputSelect
              classes={`${style.popup_editor__select}`}
              name='type'
              selected='news'
              change={(data) => { setState({...state, type: String(data.val) }) }}
              list={[{ name: 'Новости', val: 'news'},{ name: 'Интернет', val: 'network'},{ name: 'Разборы', val: 'break'},{ name: 'Истории', val: 'history'},{ name: 'Технологии', val: 'tehnolegy'},{ name: 'Гость', val: 'guest'},]}
            />
          </div>
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