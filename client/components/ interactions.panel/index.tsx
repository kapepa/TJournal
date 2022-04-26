import React, {FC, useState} from "react";
import style from './style.module.scss';
import ButtonIcon from "../button.icon";
import {IArticle} from "../../dto/news";

interface IInteractionsPanel {
  article: IArticle,
  classes?: string,
  like: (article: IArticle) => void,
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const InteractionsPanel: FC<IInteractionsPanel> = ({article, classes, like, cb}) => {
  const clickLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { subscribe, chat, ...other } = article;
    const btn = (e.target as HTMLButtonElement);
    const data = btn.dataset.likes;
    if(data === 'decrease' && article.myLikes) like({ ...other, myLikes: false });
    if(data === 'increase' && !article.myLikes) like({ ...other, myLikes: true });
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