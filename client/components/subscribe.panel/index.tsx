import React, {FC} from "react";
import style from './style.module.scss';
import {IArticle} from "../../dto/news";
import Link from 'next/link'
import ButtonDefault from "../button.default";

interface ISubscribePanel {
  classes?: string,
  article: IArticle,
}

const SubscribePanel: FC<ISubscribePanel> = ({classes, article}) => {
  const view = (type: string) => {
    let obj;
    switch (type){
      case 'news': obj = {alias: 'Новости', href:'/home', classesStyle: style.subscribe_panel__news}; break;
      case 'network': obj = {alias: 'Интернет', href:'/network', classesStyle: style.subscribe_panel__network}; break;
      case 'break': obj = {alias: 'Разборы', href:'/break', classesStyle: style.subscribe_panel__break}; break;
      case 'history': obj = {alias: 'Истории', href:'/history', classesStyle: style.subscribe_panel__history}; break;
      case 'tehnolegy': obj = {alias: 'Технологии', href:'/tehnolegy', classesStyle: style.subscribe_panel__tehnolegy}; break;
      case 'guest': obj = {alias: 'Гость', href:'/guest', classesStyle: style.subscribe_panel__guest}; break;
      default: obj = {alias: 'Новости', href:'/home', classesStyle: style.subscribe_panel__news}; break;
    }
    return obj;
  }
  const {alias, href, classesStyle} = view(article.type)

  return (
    <div className={`flex justify-content-between ${style.subscribe_panel}`}>
      <Link href={href}>
        <a className={`${style.subscribe_panel__link} ${classesStyle}`} title={alias}/>
      </Link>
      <ButtonDefault text='Подписаться' type='blue' cb={() => {}}/>
    </div>
  )
};

export default SubscribePanel;