import React, {FC, useContext, useEffect, useState} from "react";
import style from './style.module.scss';
import ButtonDefault from "../button.default";
import {DataContext} from "../../layout/layout.default";

interface IState {
  open: boolean,
}

interface IChatTextarea {
  classes?: string,
  placeholder: string,
  cb: () => void,
  change: (e: React.KeyboardEvent<HTMLSpanElement>) => void
}

const ChatTextarea: FC<IChatTextarea> = ({classes, placeholder, cb, change}) => {
  const { win } = useContext(DataContext);
  const [state, setState] = useState<IState>({} as IState);

  const clickOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setState({...state, open: true});
  }

  useEffect(() => {
    if(state) setState({...state, open: false});
  },[win])

  return (
    <div
      className={`flex flex-direction-column ${style.chat_textarea} ${classes ? classes : ''} ${state.open ? style.chat_textarea__active : ''}`}
      data-chat='textarea'
      onClick={clickOpen}
    >
      <span
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={style.chat_textarea__text}
        placeholder={placeholder}
        onKeyDown={change}
        data-to='chat'
      />
      {state.open && <div className={`flex ${style.chat_textarea__btn_wrapper}`}>
        <ButtonDefault text='Отправит' cb={(e) => {
          e.stopPropagation();
          // setState({...state, open: false})
          cb()
        }} type='blue'/>
      </div>}
    </div>
  )
}

export default ChatTextarea;