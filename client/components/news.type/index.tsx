import React, {FC} from "react";
import Link from 'next/link'
import style from './style.module.scss';

interface INewsType{
  type: string,
  query: string,
}

const NewsType: FC<INewsType> = ({type, query}) => {
  const view = (type: string) => {
    let obj;
    switch (type){
      case 'news': obj = {alias: 'Новости', classes: style.news_type__news}; break;
      case 'network': obj = {alias: 'Интернет', classes: style.news_type__network}; break;
      case 'break': obj = {alias: 'Разборы', classes: style.news_type__break}; break;
      case 'history': obj = {alias: 'Истории', classes: style.news_type__history}; break;
      case 'tehnolegy': obj = {alias: 'Технологии', classes: style.news_type__tehnolegy}; break;
      case 'guest': obj = {alias: 'Гость', classes: style.news_type__guest}; break;
      default: obj = {alias: 'Новости', classes: style.news_type__news}; break;
    }
    return obj;
  }
  const {alias, classes} = view(type)

  return (
    <Link href={`${query}`}>
      <a className={`${style.news_type} ${classes ? classes : ''}`}>{alias}</a>
    </Link>
  )
}

export default NewsType;