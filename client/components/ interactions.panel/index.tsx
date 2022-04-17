import React, {FC, useState} from "react";
import style from './style.module.scss';
import ButtonIcon from "../button.icon";
import {IArticle} from "../../dto/news";

interface IInteractionsPanel {
  article: IArticle | undefined,
  classes?: string,
  update: (article: IArticle) => void,
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const InteractionsPanel: FC<IInteractionsPanel> = ({article, classes, update, cb}) => {
  const [likes, setLikes] = useState<number>(article ? article.likes : 0);
  const clickLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = (e.target as HTMLButtonElement);
    const data = btn.dataset.likes;
    if(data === 'decrease' && article && likes > 0) {
      setLikes(likes - 1);
      update({...article, likes: likes - 1})
    }
    if(data === 'increase' && article) {
      setLikes(likes + 1);
      update({...article, likes: likes + 1})
    }
  }

  return (
    <div className={`flex justify-content-between ${style.interactions_panel} ${classes ? classes : ''}`}>
      <div className={`flex ${style.interactions_panel__left}`}>
        <ButtonIcon type='message' digit={article?.comments} cb={cb}/>
        <ButtonIcon type='create' cb={cb}/>
        <ButtonIcon type='share' cb={cb}/>
      </div>
      <div className={`${style.interactions_panel__right}`}>
        <div className={`flex justify-content-center align-items-center ${style.interactions_panel__btn_node}`}>
          <button data-likes='decrease' className={`${style.interactions_panel__btn_press}`} onClick={clickLikes} />
          <span className={`${style.interactions_panel__likes}`}>{likes}</span>
          <button data-likes='increase' className={`${style.interactions_panel__btn_press}`} onClick={clickLikes} />
        </div>
      </div>
    </div>
  )
};

export default InteractionsPanel;