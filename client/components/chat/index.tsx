import React, {FC, useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from './style.module.scss';
import ButtonIcon from "../button.icon";
import ChatTextarea from "../chat.textarea";
import ChatCommunication from "../chat.communication";
import { messageChat } from "../../redux/article/articleAction";

interface IState {
  answer: string,
  to: string,
}

const Chat: FC = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<IState>({} as IState);
  const { detailed } = useSelector(( store: any ) => store.article);
  const sendMessage = () => {
    dispatch(messageChat(state));
  }
  const changeText = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    const to = e.currentTarget.dataset.to;
    const answer =e.currentTarget.textContent;

    if( answer && to ) setState({ answer, to })
  }

  return (
    <div className={`${style.chat}`}>
      <div className={`flex flex-direction-column ${style.chat__frame} ${style.chat__area}`}>
        <div className={`flex justify-content-between ${style.chat__head}`}>
          <h5 className={`${style.chat__h5}`}>{`${detailed.comments} комментария`}</h5>
          <div className={`flex ${style.chat__action}`}>
            <ButtonIcon type="settings" cb={() => {}} />
            <ButtonIcon type="bell" cb={() => {}} />
          </div>
        </div>
        <ChatTextarea placeholder='Написать комментарий...' cb={sendMessage} change={changeText}/>
        {/*<ChatCommunication article={detailed}/>*/}
      </div>
    </div>
  );
};

export default Chat;