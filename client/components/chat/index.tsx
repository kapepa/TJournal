import React, {FC, useEffect, useRef, useState} from "react";
import {useDispatch, useStore} from "react-redux";
import style from './style.module.scss';
import ButtonIcon from "../button.icon";
import ChatTextarea from "../chat.textarea";
import ChatCommunication from "../chat.communication";
import {appendAnswer, loadAnswer, messageChat} from "../../redux/article/articleAction";
import {IArticle} from "../../dto/news";

interface IState {
  [key: string]: {
    answer: string,
    to: string,
    id: string,
  }
}

interface IChat {
  article: IArticle,
}

const Chat: FC<IChat> = ({article}) => {
  const dispatch = useDispatch();
  const store = useStore();
  const [state, setState] = useState<IState>({} as IState);
  const refScroll = useRef<number>(0);
  const refLength = useRef<number>(0);
  const changeText = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    const to = e.currentTarget.dataset.to;
    const id = String(e.currentTarget.dataset.id);
    const answer = e.currentTarget.textContent;

    if(article.chat && answer && to) setState({...state, [id]: { id, answer, to }});
  }
  const sendMessage = (id: string, index: number | null) => {
    index === null ? dispatch(messageChat(state[id])) : dispatch(appendAnswer(state[id], index));
    setState({...state, [id]: { ...state[id], answer: '' }} );
  }

  const answerLoad = (e: Event) => {
    const position = window.scrollY;

    if(position >= refScroll.current){
      const screenHeight = document.body.clientHeight;
      const fullHeight = document.body.scrollHeight;
      refScroll.current = fullHeight - screenHeight;
    }

    if(position >= refScroll.current && refScroll.current !== 0){
      const chatID = store.getState().article.detailed.chat.id
      const answer = store.getState().article.detailed.chat.answer.length;
      if(refLength.current !== answer){
        dispatch(loadAnswer(chatID, answer));
        refLength.current = answer;
      }
    }
  }

  useEffect(() => {
    if( window ) window.addEventListener('scroll', answerLoad);
    return () => window.removeEventListener('scroll', answerLoad);
  },[])

  return (
    <div className={`${style.chat}`}>
      <div className={`flex flex-direction-column ${style.chat__frame} ${style.chat__area}`}>
        <div className={`flex justify-content-between ${style.chat__head}`}>
          <h5 className={`${style.chat__h5}`}>{`${article.chat?.count} комментария`}</h5>
          <div className={`flex ${style.chat__action}`}>
            <ButtonIcon type="settings" cb={() => {}} />
            <ButtonIcon type="bell" cb={() => {}} />
          </div>
        </div>
        {article.chat?.id && <ChatTextarea
          placeholder='Написать комментарий...'
          send={sendMessage}
          change={changeText}
          to='chat'
          id={article.chat?.id}
          text={state[article.id]?.answer}
        />}
        <ChatCommunication article={article} send={sendMessage} change={changeText} textList={state} />
      </div>
    </div>
  );
};

export default Chat;