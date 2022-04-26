import React, {FC} from "react";
import style from './style.module.scss';
import AnswerComment from "../chat.answer";
import {IArticle} from "../../dto/news";

interface IChatCommunication {
  article: IArticle,
}

const ChatCommunication: FC<IChatCommunication> = ({article}) => {
  return (
    <div className={`flex flex-direction-column ${style.chat_communication}`}>
      {article.chat?.answer?.map((el, i) => <AnswerComment key={`answer-${i}`} i={i} answer={el}/>)}
    </div>
  )
};

export default ChatCommunication;