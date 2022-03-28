import React, {FC} from "react";
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import NewsType from "../news.type";
import TimeCreate from "../time.create";
import ZoomImage from "../zoom.image";
import ZoomSlider from "../zoom.slider";
import InteractionsPanel from "../ interactions.panel";
import SubscribePanel from "../subscribe.panel";

interface INews {
  article: IArticle,
}

const News: FC<INews> = ({article}) => {

  const splitText = (text: string) => {
    const step = 140;
    const list = [];
    let start = 0;
    let suggest = text.indexOf('.',step) + 1;

    while (start < text.length){
      list.push(text.substring(start,suggest).trim());
      start = suggest;
      suggest = text.indexOf('.',start + step) + 1;
      if(!suggest) suggest = text.length;
    };

    return list;
  };

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
      {article.image[0] && <ZoomImage image={article.image[0]} alt={article.title} classes={style.article__first_image} />}
      <div className={`${style.article__frame}`}>
        {splitText(article.text).map((el,i) => <p key={`p-${i}`} className={`${style.article__p}`}>{el}</p>)}
      </div>
      <ZoomSlider images={article.image}/>
      <InteractionsPanel article={article}/>
      <SubscribePanel/>
    </article>
  )
}

export default News;