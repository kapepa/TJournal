import React, {FC, useContext} from "react";
import style from './style.module.scss';
import NewsType from "../news.type";
import TimeCreate from "../time.create";
import ZoomImage from "../zoom.image";
import ZoomSlider from "../zoom.slider";
import InteractionsPanel from "../ interactions.panel";
import SubscribePanel from "../subscribe.panel";
import {useSelector} from "react-redux";

const News: FC = () => {
  const { detailed } = useSelector(( store: any ) => store.article);
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
      <div className={`${style.article__head} ${style.article__frame}`}>
        <div className={`flex ${style.article__info}`}>
          <NewsType type={detailed?.type}/>
          <TimeCreate time={detailed?.created_at}/>
        </div>
        <h4 className={style.article__h4}>{detailed?.title}</h4>
        <span className={style.article__short_desc}>{detailed?.shortDesc}</span>
      </div>
      {detailed?.image?.length && <ZoomImage image={detailed.image[0]} alt={detailed.title} classes={style.article__first_image} />}
      <div className={`${style.article__frame} ${style.article__text}`}>
        {splitText(String(detailed?.text)).map((el,i) => <p key={`p-${i}`} className={`${style.article__p}`}>{el}</p>)}
      </div>
      {detailed?.image.length > 0 &&<ZoomSlider images={detailed?.image}/>}
      <InteractionsPanel article={detailed} classes={`${style.article__frame}`}/>
      <SubscribePanel article={detailed} classes={`${style.article__frame}`}/>
    </article>
  );
};

export default News;