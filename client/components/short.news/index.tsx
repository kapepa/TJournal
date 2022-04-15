import React, {FC} from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import {IUser} from "../../dto/user";
import NewsType from "../news.type";
import ButtonDrop from "../button.drop";
import InteractionsPanel from "../ interactions.panel";
import config from "../../config";
import {useDispatch} from "react-redux";
import {articleDelete} from "../../redux/article/articleAction";

interface IShortNews{
  article: IArticle,
  user: IUser,
}

const ShortNews: FC<IShortNews> = ({article, user}) => {
  const dispatch = useDispatch();
  const clickComplaint = () => {console.log(`complaint`)};
  const clickHide = () => {console.log(`hide`)};

  const clickDelete = async () => dispatch(articleDelete(article.id))

  return (
    <div className={`flex flex-direction-column ${style.short_news}`}>
      <div className={`flex justify-content-between ${style.short_news__head}`}>
        <NewsType type={article.type}/>
        <ButtonDrop list={[
          {name: 'Пожаловаться', cb: clickComplaint},
          {name: 'Скрыть', cb: clickHide},
          {name: 'Удалить', cb: clickDelete},
        ]} />
      </div>
      <Link href={`/article/${article.id}`}>
        <a className={`${style.short_news__short_description}`}>
          <span className={`${style.short_news__span}`}>{`${article.text.substring(0, 130)} ...`}</span>
        </a>
      </Link>
      <Link href={`/article/${article.id}`}>
        <a className={`${style.short_news__picture}`}>
          <img className={`${style.short_news__image}`} src={`${config.url}/${article.image[0]}`} alt={article.title}/>
        </a>
      </Link>
      <InteractionsPanel article={article}/>
    </div>
  )
}

export default ShortNews;