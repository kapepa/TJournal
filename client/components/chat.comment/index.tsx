import React, {FC, useState} from "react";
import style from './style.module.scss';
import ButtonTransparent from "../button.transparent";

interface IChatComment{
  comment: any
}

const ChatComment: FC<IChatComment> = ({comment}) => {
  const [likes, setLikes] = useState<number>(comment.likes)
  const clickLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = (e.target as HTMLButtonElement);
    const data = element.dataset.likes;

    if(data === 'decrease') setLikes(likes - 1);
    if(data === 'increase') setLikes(likes + 1);
  }

  return (
    <div className={`${style.chat_comment}`}>
      <div className={`flex justify-content-between`}>
        <div className={`flex ${style.chat_comment__user}`}>
          <img className={`${style.chat_comment__avatar}`} src={comment.avatar} alt='avatar'/>
          <div className={`flex ${style.chat_comment__nic}`}>
            <span className={`${style.chat_comment__aliase}`}>{comment.name}</span>
          </div>
        </div>
        <div className={`flex align-items-center ${style.chat_comment__likes}`}>
          <button data-likes='decrease' className={`${style.chat_comment__btn}`} onClick={clickLikes}/>
          <span className={`${style.chat_comment__number}`}>{likes}</span>
          <button data-likes='increase' className={`${style.chat_comment__btn}`} onClick={clickLikes}/>
        </div>
      </div>
      <div className={`${style.chat_comment__scope}`}>
        <span className={`${style.chat_comment__span_text}`}>{comment.comments}</span>
      </div>
      <ButtonTransparent text='Ответить' cb={() => {}} picture={true}/>
    </div>
  )
};

export default ChatComment;