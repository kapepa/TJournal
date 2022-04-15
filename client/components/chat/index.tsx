import React, {FC, useContext} from "react";
import {useSelector} from "react-redux";
import style from './style.module.scss';
import ButtonIcon from "../button.icon";
import ChatTextarea from "../chat.textarea";
import ChatCommunication from "../chat.communication";

const Chat: FC = () => {
  const { detailed } = useSelector(( store: any ) => store.article);
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
        <ChatTextarea placeholder='Написать комментарий...'/>
        <ChatCommunication article={detailed}/>
      </div>
    </div>
  );
};

export default Chat;