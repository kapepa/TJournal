import React, {FC, useRef, useState} from "react";
import style from './style.module.scss';
import {useDispatch} from "react-redux";
import ButtonTransparent from "../button.transparent";
import Avatar from "../avatar";
import {IAnswer} from "../../dto/сhat";
import {answerLikes} from "../../redux/article/articleAction";

interface IAnswerComment{
  answer: IAnswer
  i: number
}

const AnswerComment: FC<IAnswerComment> = ({answer, i}) => {
  const dispatch = useDispatch();
  const monthRef = useRef<string>();
  const date = new Date(answer.created_at);
  const getDay = date.getDate();
  const getMonth = date.getMonth();
  const clickLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = (e.target as HTMLButtonElement);
    const data = element.dataset.likes;

    if(data === 'decrease' && answer.myLikes) dispatch(answerLikes({...answer, myLikes: false }, i))
    if(data === 'increase' && !answer.myLikes) dispatch(answerLikes({...answer, myLikes: true }, i))
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

  return (
    <div className={`${style.chat_comment}`}>
      <div className={`flex justify-content-between`}>
        <div className={`flex ${style.chat_comment__user}`}>
          {answer.user && <Avatar image={answer.user.avatar} name={answer.user.name} size='thirty' type='circle' />}
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
      <ButtonTransparent text='Ответить' cb={() => {}} picture={true}/>
    </div>
  )
};

export default AnswerComment;