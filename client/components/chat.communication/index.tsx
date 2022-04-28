import React, {FC} from "react";
import style from './style.module.scss';
import AnswerComment from "../chat.answer";
import {IArticle} from "../../dto/news";

interface IChatCommunication {
  article: IArticle,
  send: (id: string, index: number | null) => void,
  change: (e: React.KeyboardEvent<HTMLSpanElement>) => void,
  textList: { [key: string]: {
      answer: string,
      to: string,
      id: string,
    }
  }
}

const ChatCommunication: FC<IChatCommunication> = ({article, send, change, textList}) => {
  return (
    <div className={`flex flex-direction-column ${style.chat_communication}`}>
      {article.chat?.answer?.map((el, i) => <AnswerComment
        key={`chat-answer-${i}`}
        i={i}
        answer={el}
        send={send}
        change={change}
        text={textList[el.id]?.answer}
        query={el.id}
      >
        {Boolean(el.nested?.length) && el.nested?.map((nested,index) =>
          <AnswerComment
            key={`chat-nested-${index}`}
            answer={nested}
            i={i}
            send={send}
            change={change}
            text={textList[el.id]?.answer}
            nested={true}
            query={el.id}
          />
        )}
      </AnswerComment>)}
    </div>
  )
};

export default ChatCommunication;