import React, {FC} from "react";
import style from './style.module.scss';
import ChatComment from "../chat.comment";
import {IArticle} from "../../dto/news";

interface IChatCommunication {
  article: IArticle,
}

const ChatCommunication: FC<IChatCommunication> = ({article}) => {

  return (
    <div className={`flex flex-direction-column ${style.chat_communication}`}>
      {/*{article.сhat && article.сhat.map((el, i) => <ChatComment key={`comment-${i}`} comment={el}/>)}*/}
    </div>
  )
};

export default ChatCommunication;