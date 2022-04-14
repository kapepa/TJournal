import React, {FC} from 'react';
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import NewsType from "../news.type";
import ButtonDrop from "../button.drop";
import InteractionsPanel from "../ interactions.panel";
import config from "../../config";

interface IShortNews{
  article: IArticle,
}

const ShortNews: FC<IShortNews> = ({article}) => {
  const clickComplaint = () => {console.log(`complaint`)};
  const clickHide = () => {console.log(`hide`)};

  return (
    <div className={`flex flex-direction-column ${style.short_news}`}>
      <div className={`flex justify-content-between ${style.short_news__head}`}>
        <NewsType type={article.type}/>
        <ButtonDrop list={[{name: 'Пожаловаться', cb: clickComplaint}, {name: 'Скрыть', cb: clickHide}]} />
      </div>
      <div className={`${style.short_news__short_description}`}>
        <span className={`${style.short_news__span}`}>{`${article.text.substring(0, 130)} ...`}</span>
      </div>
      <div className={`${style.short_news__picture}`}>
        <img className={`${style.short_news__image}`} src={`${config.url}/${article.image[0]}`} alt={article.title}/>
      </div>
      <InteractionsPanel article={article}/>
    </div>
  )
}

export default ShortNews;