import React, {FC, useEffect, useState} from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import {IUser} from "../../dto/user";
import style from './style.module.scss';
import InputTextarea from "../input.textarea";
import InputSelect from "../input.select";
import ButtonDefault from "../button.default";
import InputDefault from "../input.default";
import CheckList from "../check.list";
import Validator from "../../helpers/validator";
import {useDispatch} from "react-redux";
import {changeDataUser} from "../../redux/user/userAction";

interface ISettingsChange{
  user: IUser,
}

interface IProfile {
  name: string,
  email: string,
}

const SettingsChange: FC<ISettingsChange> = ({user}) => {
  const router = useRouter();
  const { nav } = router.query;
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<IProfile>(
    {name: user.name, email: user.email} as IProfile
  );
  const nameValidator = Validator.name(profile.name);
  const emailValidator = Validator.email(profile.email);
  const list = [
    {name: 'Ответы на мои комментарии', checked: false},
    {name: 'Оценки записей и комментариев', checked: true},
    {name: 'Упоминания в комментариях к постам', checked: false},
    {name: 'Новые сообщения', checked: false},
    {name: 'Лучшее за неделю', checked: false},
  ];
  const message = [
    {name: 'Ответы на мои комментарии', checked: false},
    {name: 'Упоминания в комментариях к постам', checked: false},
    {name: 'Оценки записей и комментариев', checked: false},
    {name: 'Новые комментарии к постам', checked: false},
    {name: 'Новые подписчики', checked: false},
  ]

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

  }

  const changeSelect = (data: {name: string, value: string}) => {
    console.log(data)
  }

  const changePassword = () => {
    console.log('change password');
  }

  const changeChecBox = (name: string, checked: boolean) => {
    console.log(name, checked)
  }

  const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setProfile({...profile, [name]: e.target.value})
  }

  const sendUser = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement >) => {
    if(nameValidator && emailValidator){
      const form = new FormData();
      if(profile.name !== user.name) form.append('name', profile.name);
      if(profile.email !== user.email) form.append('email', profile.email);
      dispatch(changeDataUser(form))
    }
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
      {( nav === 'basic' ) &&
        <>
          <div className={`flex flex-direction-column ${style.settings_change__basic}`}>
            <InputDefault warning={!nameValidator} defaultValue={user.name} change={changeUser} type='text' name='name' label='Отображаемое имя' />
            <InputDefault warning={!emailValidator} defaultValue={user.email} change={changeUser} type='text' name='email' label='Почта и пароль'/>
            <div onClick={changePassword} className={`${style.settings_change__pass}`}>Изменить пароль</div>
          </div>
          <ButtonDefault disabled={!(profile.name !== user.name || profile.email !== user.email)} text='Сохранить' type='blue' cb={sendUser}/>
        </>
      }
      {( nav === 'function' ) &&
        <>
          <div className={`flex flex-direction-column`}>
            <div className={`flex ${style.settings_change__up}`}>
              <div className={`flex ${style.settings_change__cap}`}>
                <div className={`${style.settings_change__price}`}>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB'}).format(75)}</div>
                <div className={`flex justify-content-center align-items-center ${style.settings_change__price_desc}`}>в месяц за доступ к приятным функциям</div>
              </div>
              <div className={'flex justify-content-center align-items-center'}>
                <ButtonDefault text='Купить' type='yellow' cb={() => {}}/>
              </div>
              <div>
              </div>
            </div>
            <div className={`flex flex-direction-column`}>
              <h4 className={`${style.settings_change__h4}`}>Настройки преимуществ</h4>
              <ul className={`flex flex-direction-column ${style.settings_change__advantage}`}>
                <li className={`${style.settings_change__li}`}>Отключить рекламу</li>
                <li className={`${style.settings_change__li}`}>Отключить виджет «Вакансии»</li>
                <li className={`${style.settings_change__li}`}>Скрыть профиль от поисковиков и анонимных пользователей</li>
                <li className={`${style.settings_change__li}`}>Скрыть мой Plus от других пользователей</li>
              </ul>
            </div>
          </div>
        </>
      }
      {( nav === 'message' ) &&
        <>
          <div className={`flex flex-direction-column ${style.settings_change__message}`}>
            <CheckList list={list} title='Письма на почту' cb={changeChecBox}/>
            <CheckList list={message} title='Уведомления на сайте' cb={changeChecBox}/>
          </div>
          <ButtonDefault text='Сохранить' type='blue' cb={() => {}}/>
        </>
      }
      {( nav === 'black_list' ) &&
        <>
          <div className={`flex flex-direction-column ${style.settings_change__black_list}`}>
            <div className={`flex align-items-end`}>
              <InputDefault type='text' wrapper={`${style.settings_change__input_filter}`} label='Фильтр ленты по словам' defaultValue='Ключевое слово или тег' name='filter' change={() => {}}/>
              <ButtonDefault text='Добавить' type='def' cb={() => {}} classes={style.settings_change__btn_filter}/>
            </div>
            <InputDefault type='text' label='Пользователи' defaultValue='Имя или ссылка' name='name' change={() => {}}/>
          </div>
          <ButtonDefault text='Сохранить' type='blue' cb={() => {}}/>
        </>
      }
    </div>
  )
};

export default SettingsChange;