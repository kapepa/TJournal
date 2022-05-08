import React, {FC, useContext, useEffect, useRef, useState} from "react";
import style from './style.module.scss';
import ButtonDefault from "../button.default";
import {DataContext} from "../../layout/layout.default";

interface IState {
  open: boolean,
}

enum ETo {
  answer,
  chat
}

interface IChatTextarea {
  classes?: string,
  placeholder: string,
  send: (id: string, index: number | null) => void,
  change: (e: React.KeyboardEvent<HTMLSpanElement>) => void,
  to: keyof typeof ETo,
  id: string,
  open?: boolean,
  text?: string | undefined,
}

const ChatTextarea: FC<IChatTextarea> = ({classes, placeholder, send, change, open, to, id, text}) => {
  const { win } = useContext(DataContext);
  const refSpan = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<IState>({} as IState);

  const clickOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setState({...state, open: true});
    if(refSpan.current?.textContent === placeholder) refSpan.current.textContent = '';
  }

  useEffect(() => {
    if(state.open){
      setState({...state, open: false});
      if(refSpan.current?.textContent === '') refSpan.current.textContent = placeholder;
    }
  },[win])

  useEffect(() => {
    if(open) setState({...state, open: true});
    if(refSpan.current) refSpan.current.textContent = text ? text : placeholder;
  },[])

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
        onKeyDown={(e) => {
          change(e)
          setState({...state, open: true})
        }}
        data-to={to}
        data-id={id}
        ref={refSpan}
      />
      {state.open && <div className={`flex ${style.chat_textarea__btn_wrapper}`}>
        <ButtonDefault
          text={ Boolean(refSpan.current?.textContent) ? 'Отправит' : 'Закрыть' }
          type='blue'
          classes={style.chat_textarea__btn}
          cb={(e) => {
            e.stopPropagation();
            setState({...state, open: false})
            send(id, null);
            if(refSpan.current) refSpan.current.textContent = text ? text : placeholder;
          }}
        />
      </div>}
    </div>
  )
}

export default ChatTextarea;