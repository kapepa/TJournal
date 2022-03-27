import React, {FC} from "react";
import Link from 'next/link'
import style from './style.module.scss';

interface INewsType{
  type: string,
}

const NewsType: FC<INewsType> = ({type}) => {
  const view = (type: string) => {
    let obj;
    switch (type){
      case 'news': obj = {alias: 'Новости', href:'/home', classes: style.news_type__news}; break;
      case 'network': obj = {alias: 'Интернет', href:'/network', classes: style.news_type__network}; break;
      case 'break': obj = {alias: 'Разборы', href:'/break', classes: style.news_type__break}; break;
      case 'history': obj = {alias: 'Истории', href:'/history', classes: style.news_type__history}; break;
      case 'tehnolegy': obj = {alias: 'Технологии', href:'/tehnolegy', classes: style.news_type__tehnolegy}; break;
      case 'guest': obj = {alias: 'Гость', href:'/guest', classes: style.news_type__guest}; break;
      default: obj = {alias: 'Новости', href:'/home', classes: style.news_type__news}; break;
    }
    return obj;
  }
  const {alias, href, classes} = view(type)

  console.log()
  return (
    <Link href={`${href}`}>
      <a className={`${style.news_type} ${classes ? classes : ''}`}>{alias}</a>
    </Link>
  )
}

export default NewsType;