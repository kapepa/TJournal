import React, {FC, useContext, useEffect} from "react";
import style from './style.module.scss';
import AnswerComment from "../chat.answer";
import {IArticle} from "../../dto/news";
import {DataContext} from "../../layout/layout.default";
import {getOneAnswer, selectAnswer} from "../../redux/article/articleAction";
import {useDispatch} from "react-redux";

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
  const { socket } = useContext(DataContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if(socket.connected && window) {
      socket.on('noticeListening',async (args: { index : number | null }) => {
        if(article.chat && article.chat?.answer)
          await dispatch(selectAnswer(article.chat?.id, 0, 1, args.index));
      })
    }
  },[socket.connected])

  useEffect(() => {
    if(socket.connected && window && article.chat?.answer) {
      socket.on('updateLikesAnswer',(data: {answerID: string, position: number}) => {
        const limit = article.chat?.answer;
        if (limit && limit.length >= data.position) dispatch(getOneAnswer(limit[data.position].id, data.position));
      })
    }
  },[socket.connected, article.chat?.answer?.length])

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
        userId={el?.user?.id}
        articleID={article.id}
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
            userId={nested?.user?.id}
            articleID={article.id}
          />
        )}
      </AnswerComment>)}
    </div>
  )
};

export default ChatCommunication;