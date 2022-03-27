import React, {FC} from "react";
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import NewsType from "../news.type";
import TimeCreate from "../time.create";

interface INews {
  article: IArticle,
}

const News: FC<INews> = ({article}) => {
  return (
    <article className={`${style.article}`}>
      <div className={`${style.article__head}`}>
        <div className={`flex ${style.article__info}`}>
          <NewsType type={article.type}/>
          <TimeCreate time={article.created_at}/>
        </div>
        <h4 className={style.article__h4}>{article.title}</h4>
        <span className={style.article__short_desc}>{article.shortDesc}</span>
      </div>
      {article.image[0] && <img className={style.article__first_image} src={article.image[0]} alt={article.title}/>}
      <div className={`${style.article__frame}`}>
        <p>{article.text}</p>
      </div>
    </article>
  )
}

export default News;