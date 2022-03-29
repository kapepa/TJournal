import React, {FC, useState} from 'react';
import style from './style.module.scss';
import {IArticle} from "../../dto/news";

interface IShortNews{
  article: IArticle,
}

const ShortNews: FC<IShortNews> = ({article}) => {
  console.log(article)
  return (
    <div className={`${style.short_news}`}>
      ShortNews
    </div>
  )
}

export default ShortNews;