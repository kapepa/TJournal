import React, {FC, useContext} from "react";
import style from './style.module.scss';
import ButtonIcon from "../button.icon";
import {IArticle} from "../../dto/news";
import {IUser} from "../../dto/user";

interface IInteractionsPanel {
  article: IArticle,
  classes?: string,
  like: (article: IArticle) => void,
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void,
  user: IUser,
}

const InteractionsPanel: FC<IInteractionsPanel> = ({article, classes, like, cb, user}) => {
  const clickLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const existUser = Boolean(Object.keys(user).length);
    const { subscribe, chat, ...other } = article;
    const btn = (e.target as HTMLButtonElement);
    const data = btn.dataset.likes;
    if(existUser && data === 'decrease' && article.myLikes) like({ ...other, myLikes: false });
    if(existUser && data === 'increase' && !article.myLikes) like({ ...other, myLikes: true });
  }

  return (
    <div className={`flex justify-content-between ${style.interactions_panel} ${classes ? classes : ''}`}>
      <div className={`flex ${style.interactions_panel__left}`}>
        <ButtonIcon type='message' digit={article?.chat?.count} cb={cb}/>
        <ButtonIcon type='create' cb={cb}/>
        <ButtonIcon type='share' cb={cb}/>
      </div>
      <div className={`${style.interactions_panel__right}`}>
        <div className={`flex justify-content-center align-items-center ${style.interactions_panel__btn_node}`}>
          <button data-likes='decrease' className={`${style.interactions_panel__btn_press}`} onClick={clickLikes} />
          <span className={`${style.interactions_panel__likes}`}>{article.likes}</span>
          <button data-likes='increase' className={`${style.interactions_panel__btn_press}`} onClick={clickLikes} />
        </div>
      </div>
    </div>
  )
};

export default InteractionsPanel;