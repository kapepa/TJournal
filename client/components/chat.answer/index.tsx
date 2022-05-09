import React, {FC, useContext, useEffect, useRef, useState} from "react";
import style from './style.module.scss';
import {useDispatch} from "react-redux";
import ButtonTransparent from "../button.transparent";
import Avatar from "../avatar";
import {IAnswer} from "../../dto/сhat";
import {answerLikes} from "../../redux/article/articleAction";
import ChatTextarea from "../chat.textarea";
import {DataContext} from "../../layout/layout.default";

interface IAnswerComment{
  answer: IAnswer
  i: number
  send: (id: string, index: number | null) => void,
  change: (e: React.KeyboardEvent<HTMLSpanElement>) => void,
  text?: string | undefined,
  nested?: boolean,
  query: string,
  userId?: string,
  articleID: string,
}

const AnswerComment: FC<IAnswerComment> = ({answer, i, send, change, text, nested, query, children, userId, articleID}) => {
  const { win, socket } = useContext(DataContext);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const monthRef = useRef<string>();
  const date = new Date(answer.created_at);
  const getDay = date.getDate();
  const getMonth = date.getMonth();
  const clickLikes = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = (e.target as HTMLButtonElement);
    const data = element.dataset.likes;

    if(data === 'decrease' && answer.myLikes){
      await dispatch(answerLikes({...answer, myLikes: false }, query, i))
      socket.emit('changeLikesAnswer',{articleID, answerID: answer.id, position: i});
    }
    if(data === 'increase' && !answer.myLikes) {
      await dispatch(answerLikes({...answer, myLikes: true }, query, i))
      socket.emit('changeLikesAnswer',{articleID, answerID: answer.id, position: i});
    }
  }

  switch (getMonth){
    case 0 : monthRef.current = 'Январь'; break;
    case 1 : monthRef.current = 'Февраль'; break;
    case 2 : monthRef.current = 'Март'; break;
    case 3 : monthRef.current = 'Апрель'; break;
    case 4 : monthRef.current = 'Май'; break;
    case 5 : monthRef.current = 'Июнь'; break;
    case 6 : monthRef.current = 'Июль'; break;
    case 7 : monthRef.current = 'Август'; break;
    case 8 : monthRef.current = 'Сентябрь'; break;
    case 9 : monthRef.current = 'Октябрь'; break;
    case 10 : monthRef.current = 'Ноябрь'; break;
    case 11 : monthRef.current = 'Декабрь'; break;
  }

  useEffect(() => {
    if (open) setOpen(false);
  }, [win])

  return (
    <div className={`${style.chat_comment}`}>
      <div className={`flex justify-content-between`}>
        <div className={`flex ${style.chat_comment__user}`}>
          {answer.user && <Avatar image={answer.user.avatar} name={answer.user.name} size='thirty' type='circle' userId={userId} />}
          <div className={`flex flex-direction-column ${style.chat_comment__nic}`}>
            {answer.user && <span className={`${style.chat_comment__aliase}`}>{answer.user.name}</span>}
            {answer.user && <span className={`${style.chat_comment__date}`}>{`${getDay} ${monthRef.current}`}</span>}
          </div>
        </div>
        <div className={`flex align-items-center ${style.chat_comment__likes}`}>
          <button data-likes='decrease' className={`${style.chat_comment__btn}`} onClick={clickLikes}/>
          <span className={`${style.chat_comment__number}`}>{answer.likes}</span>
          <button data-likes='increase' className={`${style.chat_comment__btn}`} onClick={clickLikes}/>
        </div>
      </div>
      <div className={`${style.chat_comment__scope}`}>
        <span className={`${style.chat_comment__span_text}`}>{answer.text}</span>
      </div>
      {!nested &&
        <ButtonTransparent
          text='Ответить'
          picture={true}
          cb={(e) => {
            e.stopPropagation();
            setOpen(true)
          }}
        />
      }
      {open &&
        <div className={`${style.chat_comment__text_area}`}>
          <ChatTextarea
            placeholder='Написать комментарий...'
            send={(id: string) => { send(id, i); setOpen(false);}}
            change={change}
            open={true}
            to='answer'
            id={answer.id}
            text={text}
          />
        </div>
      }
      {children && <div className={`flex flex-direction-column ${style.chat_comment__nested}`}>{children}</div>}
    </div>
  )
};

export default AnswerComment;