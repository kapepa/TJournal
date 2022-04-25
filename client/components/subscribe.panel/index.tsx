import React, {FC, useRef} from "react";
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import Link from 'next/link'
import ButtonDefault from "../button.default";
import {useDispatch} from "react-redux";
import {appendSubscribe} from "../../redux/article/articleAction";

interface ISubscribePanel {
  classes?: string,
  article: IArticle,
  query: string,
}

const SubscribePanel: FC<ISubscribePanel> = ({classes, article, query}) => {
  const dispatch = useDispatch();
  const viewRef = useRef<{alias: string, classesStyle: string}>()

  switch (article.type){
    case 'news': viewRef.current = {alias: 'Новости', classesStyle: style.subscribe_panel__news}; break;
    case 'network': viewRef.current = {alias: 'Интернет', classesStyle: style.subscribe_panel__network}; break;
    case 'break': viewRef.current = {alias: 'Разборы', classesStyle: style.subscribe_panel__break}; break;
    case 'history': viewRef.current = {alias: 'Истории', classesStyle: style.subscribe_panel__history}; break;
    case 'tehnolegy': viewRef.current = {alias: 'Технологии', classesStyle: style.subscribe_panel__tehnolegy}; break;
    case 'guest': viewRef.current = {alias: 'Гость', classesStyle: style.subscribe_panel__guest}; break;
    default: viewRef.current = {alias: 'Новости', classesStyle: style.subscribe_panel__news}; break;
  }

  const clickSubscribe = () => dispatch(appendSubscribe(article.subscribe));

  return (
    <div className={`flex justify-content-between ${style.subscribe_panel} ${classes ? classes : ''}`}>
      <Link href={query}>
        <a
          className={`${style.subscribe_panel__link} ${viewRef.current.classesStyle}`}
          title={viewRef.current.alias}
        />
      </Link>
      <ButtonDefault
        text={ article.subscribe?.sub ? 'Отписаться ':' Подписаться'}
        type='blue'
        cb={clickSubscribe}
        classes={style.subscribe_panel__btn}
      />
    </div>
  )
};

export default SubscribePanel;