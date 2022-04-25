import React, {FC} from "react";
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
  const view = (type: string) => {
    let obj;
    switch (type){
      case 'news': obj = {alias: 'Новости', classesStyle: style.subscribe_panel__news}; break;
      case 'network': obj = {alias: 'Интернет', classesStyle: style.subscribe_panel__network}; break;
      case 'break': obj = {alias: 'Разборы', classesStyle: style.subscribe_panel__break}; break;
      case 'history': obj = {alias: 'Истории', classesStyle: style.subscribe_panel__history}; break;
      case 'tehnolegy': obj = {alias: 'Технологии', classesStyle: style.subscribe_panel__tehnolegy}; break;
      case 'guest': obj = {alias: 'Гость', classesStyle: style.subscribe_panel__guest}; break;
      default: obj = {alias: 'Новости', classesStyle: style.subscribe_panel__news}; break;
    }
    return obj;
  }
  const {alias, classesStyle} = view(article.type);
  const clickSubscribe = () => dispatch(appendSubscribe(article.subscribe));

  return (
    <div className={`flex justify-content-between ${style.subscribe_panel} ${classes ? classes : ''}`}>
      <Link href={query}>
        <a className={`${style.subscribe_panel__link} ${classesStyle}`} title={alias}/>
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