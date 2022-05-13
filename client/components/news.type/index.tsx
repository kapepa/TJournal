import React, {FC, useRef} from "react";
import Link from 'next/link'
import style from './style.module.scss';
import {useRouter} from "next/router";

interface INewsType{
  type: string,
  query: string,
}

const NewsType: FC<INewsType> = ({type, query}) => {
  const viewRef = useRef<{alias: string, classes: string}>();
  const router = useRouter();

  const putQuery = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push({query: { nav: type }})
  }

  switch (type){
    case 'news': viewRef.current = {alias: 'Новости', classes: style.news_type__news}; break;
    case 'network': viewRef.current = {alias: 'Интернет', classes: style.news_type__network}; break;
    case 'break': viewRef.current = {alias: 'Разборы', classes: style.news_type__break}; break;
    case 'history': viewRef.current = {alias: 'Истории', classes: style.news_type__history}; break;
    case 'tehnolegy': viewRef.current = {alias: 'Технологии', classes: style.news_type__tehnolegy}; break;
    case 'guest': viewRef.current = {alias: 'Гость', classes: style.news_type__guest}; break;
    default: viewRef.current = {alias: 'Новости', classes: style.news_type__news}; break;
  }

  return (
    <Link href={`${query}`}>
      <a
        onClick={putQuery}
        className={`${style.news_type} ${viewRef.current.classes ? viewRef.current.classes : ''}`}
      >{viewRef.current.alias}</a>
    </Link>
  )
}

export default NewsType;