import React, {FC} from "react";
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import NewsType from "../news.type";

interface INews {
  article: IArticle,
}

const News: FC<INews> = ({article}) => {
  return (
    <article className={`${style.article}`}>
      <div className={`${style.article__head}`}>
        <NewsType type={article.type}/>
      </div>
    </article>
  )
}

export default News;