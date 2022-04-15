import React, {FC, useContext} from "react";
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import ButtonIcon from "../button.icon";
import ChatTextarea from "../chat.textarea";
import ChatCommunication from "../chat.communication";
import {DataContext} from "../../layout/layout.default";

const Chat: FC = () => {
  const { article } = useContext(DataContext)
  return (
    <div className={`${style.chat}`}>
      <div className={`flex flex-direction-column ${style.chat__frame} ${style.chat__area}`}>
        <div className={`flex justify-content-between ${style.chat__head}`}>
          <h5 className={`${style.chat__h5}`}>{`${article.comments} комментария`}</h5>
          <div className={`flex ${style.chat__action}`}>
            <ButtonIcon type="settings" cb={() => {}} />
            <ButtonIcon type="bell" cb={() => {}} />
          </div>
        </div>
        <ChatTextarea placeholder='Написать комментарий...'/>
        <ChatCommunication article={article}/>
      </div>
    </div>
  );
};

export default Chat;