import React, {FC, useContext, useState} from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import {IUser} from "../../dto/user";
import NewsType from "../news.type";
import ButtonDrop from "../button.drop";
import InteractionsPanel from "../ interactions.panel";
import config from "../../config";
import {useDispatch} from "react-redux";
import {articleDelete, articleUpdate, excludeArticleUser} from "../../redux/article/articleAction";
import {DataContext} from "../../layout/layout.default";
import {excludeArticle} from "../../redux/article/articleSlice";

interface IShortNews{
  article: IArticle,
  user: IUser,
  index: number,
  query: string
}

const ShortNews: FC<IShortNews> = ({article, user, index, query}) => {
  const { socket } = useContext(DataContext);
  const dispatch = useDispatch();
  const existUser = Boolean(Object.keys(user).length);
  const { wrong } = useContext(DataContext);

  const clickDelete = async () => dispatch(articleDelete( article.id, index ));

  const clickHide = () => {
    existUser ? dispatch(excludeArticleUser(article.id, index)) : dispatch(excludeArticle({index}));
  };

  const updateArticle = async (article: IArticle) => {
    await dispatch(articleUpdate(article, index))
    socket.emit('changeLikesArticle',{ articleID: article.id })
  }

  const interaction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = e.currentTarget.dataset.types;
    console.log(data)
  }

  const checkAuth = (e: React.MouseEvent<HTMLAnchorElement>):void => {
    if(!Boolean(Object.keys(user).length)){
      e.preventDefault();
      wrong('Auth');
    }
  }

  return (
    <div className={`flex flex-direction-column ${style.short_news}`}>
      <div className={`flex justify-content-between ${style.short_news__head}`}>
        <NewsType type={article.type} query={query}/>
        <ButtonDrop list={[
          {name: 'Скрыть', cb: clickHide},
          {name: 'Удалить', cb: clickDelete},
        ]} />
      </div>
      <Link href={`/article/${article.id}`}>
        <a onClick={checkAuth} className={`${style.short_news__short_description}`}>
          <span className={`${style.short_news__span}`}>{`${article.text.substring(0, 130)} ...`}</span>
        </a>
      </Link>
      <Link href={`/article/${article.id}`}>
        <a onClick={checkAuth} className={`${style.short_news__picture}`}>
          <img className={`${style.short_news__image}`} src={`${config.url}/${article.image[0]}`} alt={article.title}/>
        </a>
      </Link>
      <InteractionsPanel article={article} user={user} like={updateArticle} cb={interaction}/>
    </div>
  )
}

export default ShortNews;