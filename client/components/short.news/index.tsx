import React, {FC, useState} from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import {IUser} from "../../dto/user";
import NewsType from "../news.type";
import ButtonDrop from "../button.drop";
import InteractionsPanel from "../ interactions.panel";
import config from "../../config";
import {useDispatch} from "react-redux";
import {articleDelete, articleUpdate} from "../../redux/article/articleAction";

interface IShortNews{
  article: IArticle,
  user: IUser,
  index: number,
  query: string
}

const ShortNews: FC<IShortNews> = ({article, user, index, query}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<IArticle>(article);
  const clickComplaint = () => {console.log(`complaint`)};
  const clickHide = () => {console.log(`hide`)};

  const clickDelete = async () => dispatch(articleDelete( article.id, index ))

  const updateArticle = (article: IArticle) => {
    dispatch(articleUpdate(article, index))
  }

  const interaction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = e.currentTarget.dataset.types;
    console.log(data)
  }

  return (
    <div className={`flex flex-direction-column ${style.short_news}`}>
      <div className={`flex justify-content-between ${style.short_news__head}`}>
        <NewsType type={state.type} query={query}/>
        <ButtonDrop list={[
          {name: 'Пожаловаться', cb: clickComplaint},
          {name: 'Скрыть', cb: clickHide},
          {name: 'Удалить', cb: clickDelete},
        ]} />
      </div>
      <Link href={`/article/${state.id}`}>
        <a className={`${style.short_news__short_description}`}>
          <span className={`${style.short_news__span}`}>{`${state.text.substring(0, 130)} ...`}</span>
        </a>
      </Link>
      <Link href={`/article/${state.id}`}>
        <a className={`${style.short_news__picture}`}>
          <img className={`${style.short_news__image}`} src={`${config.url}/${state.image[0]}`} alt={state.title}/>
        </a>
      </Link>
      <InteractionsPanel article={state} update={updateArticle} cb={interaction}/>
    </div>
  )
}

export default ShortNews;