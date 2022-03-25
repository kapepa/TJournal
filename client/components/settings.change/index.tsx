import React, {FC, useState} from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import {IUser} from "../../dto/user";
import style from './style.module.scss';
import InputTextarea from "../input.textarea";
import InputSelect from "../input.select";
import ButtonDefault from "../button.default";

interface ISettingsChange{
  user: IUser,
}

const SettingsChange: FC<ISettingsChange> = ({user}) => {
  const router = useRouter();
  const { nav } = router.query;

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

  }

  const changeSelect = (data: {name: string, value: string}) => {
    console.log(data)
  }

  return (
    <div className={style.settings_change}>
      <div className={` ${style.settings_change__cap_back}`}>
        <Link href='/profile'><a className={`flex align-items-center ${style.settings_change__link}`}>{user.name}</a></Link>
      </div>
      {( !nav || nav === 'profile' ) &&
        <>
          <div className={`flex flex-direction-column ${style.settings_change__content}`}>
            <InputTextarea change={changeText} placeholder='Пара слова о себе' label='Описание к блогу'/>
            <InputSelect change={changeSelect} label='Статус онлайн' name='online' list={['Показывать когда я онлайн','Скрыть от всех']}/>
            <InputSelect change={changeSelect} label='Лента по умолчанию' name='ribbon' list={['Популярное','Свежее','Моя лента']}/>
            <InputSelect change={changeSelect} label='Сортировка «Моей ленты»' name='sort' list={['По популярности','По дате']}/>
            <InputSelect change={changeSelect} label='Записи в блоге' name='show' list={['Показывать всем','Показывать только подписчикам']}/>
            <InputSelect change={changeSelect} label='Контент для взрослых' name='old' list={['Блюрить записи 18+ в лентe','Показать всё']}/>
          </div>
          <ButtonDefault text='Сохранить' type='blue' cb={() => {}}/>
        </>
      }
    </div>
  )
}

export default SettingsChange;