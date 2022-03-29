import React, {FC, useState} from "react";
import style from './style.module.scss';
import ButtonDefault from "../button.default";

interface IState {
  open: boolean,
}

interface IChatTextarea {
  classes?: string,
  placeholder: string,
}

const ChatTextarea: FC<IChatTextarea> = ({classes, placeholder}) => {
  const [state, setState] = useState<IState>({} as IState);

  return (
    <div className={`flex flex-direction-column ${style.chat_textarea} ${classes ? classes : ''} ${state.open ? style.chat_textarea__active : ''}`}
         data-chat='textarea'
         onClick={() => setState({...state, open: true})}
    >
      <span
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={style.chat_textarea__text}
        placeholder={placeholder}
      />
      {state.open && <div className={`flex ${style.chat_textarea__btn_wrapper}`}>
        <ButtonDefault text='Отправит' cb={(e) => {
          e.stopPropagation();
          setState({...state, open: false})
        }} type='blue'/>
      </div>}
    </div>
  )
}

export default ChatTextarea;