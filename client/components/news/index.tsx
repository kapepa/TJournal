import React, {FC, useContext, useEffect} from "react";
import style from './style.module.scss';
import NewsType from "../news.type";
import TimeCreate from "../time.create";
import ZoomImage from "../zoom.image";
import ZoomSlider from "../zoom.slider";
import InteractionsPanel from "../ interactions.panel";
import SubscribePanel from "../subscribe.panel";
import {useDispatch, useSelector} from "react-redux";
import {IArticle} from "../../dto/news";
import {articleLikes, getArticleLikes} from "../../redux/article/articleAction";
import {DataContext} from "../../layout/layout.default";

interface INews {
  article: IArticle;
}

const News: FC<INews> = ({article}) => {
  const { socket } = useContext(DataContext);
  const dispatch = useDispatch();
  const user = useSelector(( store: any ) => store.user);
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

  const likeArticle = async (article: IArticle) => {
    await dispatch(articleLikes(article));
    socket.emit('changeLikesArticle',{ articleID: article.id })
  };

  useEffect(() => {
    if(window && socket.connected) {
      socket.emit('join', {articleID: article.id});
      socket.on('updateLikesArticle',() => dispatch(getArticleLikes(article.id)))
    }
    return () => {
      if(window && socket.connected) socket.emit('leave', {articleID: article.id});
    }
  },[socket.connected])

  return (
    <article className={`${style.article}`}>
      <div className={`${style.article__head} ${style.article__frame}`}>
        <div className={`flex ${style.article__info}`}>
          <NewsType type={article?.type} query={`/home?nav=${article?.type}`}/>
          {article.created_at && <TimeCreate time={article.created_at}/>}
        </div>
        <h4 className={style.article__h4}>{article?.title}</h4>
        <span className={style.article__short_desc}>{article?.shortDesc}</span>
      </div>
      {article?.image?.length && <ZoomImage image={article.image[0]} alt={article.title} classes={style.article__first_image} />}
      <div className={`${style.article__frame} ${style.article__text}`}>
        {splitText(String(article?.text)).map((el,i) => <p key={`p-${i}`} className={`${style.article__p}`}>{el}</p>)}
      </div>
      {article?.image?.length > 0 &&<ZoomSlider images={article?.image}/>}
      <InteractionsPanel like={likeArticle} user={user} cb={() => {}} article={article} classes={`${style.article__frame}`}/>
      <SubscribePanel article={article} classes={`${style.article__frame}`} query={`/home?nav=${article.type}`}/>
    </article>
  );
};

export default News;