import React, {FC, useState} from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import {ISettings} from "../../dto/settings";
import style from './style.module.scss';
import InputTextarea from "../input.textarea";
import InputSelect from "../input.select";
import ButtonDefault from "../button.default";
import InputDefault from "../input.default";
import CheckList from "../check.list";
import Validator from "../../helpers/validator";
import {useDispatch, useSelector} from "react-redux";
import {changeDataUser, changeSettings, changeMessage} from "../../redux/user/userAction";
import {IList} from "../../dto/list";
import {IMessage} from "../../dto/message";
import {ResetArticle} from "../../helpers/request";
import PopupPassword from "../popup.password";

interface IProfile {
  name: string,
  email: string,
}

const SettingsChange: FC = () => {
  const router = useRouter();
  const { nav } = router.query;
  const user = useSelector(( store: any ) => store.user);
  const dispatch = useDispatch();
  const [settings, setSettings] = useState<ISettings | undefined>( user.settings );
  const [password, setPassword] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile>(
    {name: user.name, email: user.email} as IProfile
  );
  const [list, setList] = useState<IList>(() => {
    if (!user.list) return {} as IList;
    const { id, updated_at, created_at, ...other} = user.list;
    return ( other as IList );
  });
  const [message, setMessage] = useState<IMessage>(() => {
    if (!user.message) return {} as IMessage;
    const { id, updated_at, created_at, ...other} = user.message;
    return ( other as IMessage );
  });
  const nameValidator = Validator.name(profile.name);
  const emailValidator = Validator.email(profile.email);

  const changePassword = () => {setPassword(true) }

  const resetAllArticle = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement >) => {
    await ResetArticle().then(() => router.push('/home'));
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

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    if(settings) setSettings({...settings, [name]: e.target.value})
  }

  const sendSettings = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const obj = {} as any;
    if(settings?.description !== user.settings?.description) obj.description = settings?.description;
    if(settings?.online !== user.settings?.online) obj.online = settings?.online;
    if(settings?.ribbon !== user.settings?.ribbon) obj.ribbon = settings?.ribbon;
    if(settings?.sorting !== user.settings?.sorting) obj.sorting = settings?.sorting;
    if(settings?.entry !== user.settings?.entry) obj.entry = settings?.entry;
    if(settings?.adult !== user.settings?.adult) obj.adult = settings?.adult;

    if(settings?.id) dispatch(changeSettings(settings?.id, obj))
  }

  const changeSelect = (obj:{ name: string, val: string | boolean}) => {
    if(settings) setSettings({...settings, [obj.name]: obj.val})
  }

  const changeChecBoxList = (name: keyof IList, checked: boolean) => {
    const current = JSON.parse(JSON.stringify(list[name]))
    setList({...list, [name]: {...current, checked} })
  }

  const changeChecBoxMessage = (name: keyof IMessage, checked: boolean) => {
    const current = JSON.parse(JSON.stringify(message[name]))
    setMessage({...message, [name]: {...current, checked} })
  }

  const sendMessage = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
    const obj = {} as {list: IList, message: IMessage};
    const changelist = Object.keys(list).reduce((accum , field) => {
      const key = (list[(field as keyof IList)] as { name: string, checked: boolean } ).checked;
      const profile = ( user.list && ( user.list[(field as keyof IList)] as { name: string, checked: boolean } ).checked);

      return key !== profile ? { [field]: list[(field as keyof IList)], ...accum } : accum;
    },{} as IList);

    const exchangeMessage = Object.keys(message).reduce((accum , field) => {
      const key = (message[(field as keyof IMessage)] as { name: string, checked: boolean } ).checked;
      const profile = ( user.message && ( user.message[(field as keyof IMessage)] as { name: string, checked: boolean } ).checked);

      return key !== profile ? { [field]: message[(field as keyof IMessage)], ...accum } : accum;
    },{} as IMessage);

    if(changelist && user.list?.id) obj.list = {...changelist, id: user.list.id};
    if(exchangeMessage && user.message?.id) obj.message = {...exchangeMessage, id: user.message.id};

    if(user.list?.id) dispatch(changeMessage(obj));
  }

  return (
    <div className={style.settings_change}>
      {password && <PopupPassword close={() => {setPassword(false)} } />}
      <div className={` ${style.settings_change__cap_back}`}>
        <Link href='/profile'><a className={`flex align-items-center ${style.settings_change__link}`}>{user.name}</a></Link>
      </div>
      {( !nav || nav === 'profile' ) &&
        <>
          <div className={`flex flex-direction-column ${style.settings_change__content}`}>
            <InputTextarea
              name='description'
              defaultValue={settings?.description}
              change={changeText}
              placeholder='Пара слова о себе'
              label='Описание к блогу'
            />
            <InputSelect
              change={changeSelect}
              label='Статус онлайн'
              name='online'
              list={[{name: 'Показывать когда я онлайн', val: true},{name:'Скрыть от всех', val: false}]}
              selected={settings?.online}
            />
            <InputSelect
              change={changeSelect}
              label='Лента по умолчанию'
              name='ribbon'
              list={[{name:'Популярное', val: 'default'},{name:'Свежее', val: 'recently'},{name:'Моя лента', val: 'yourself'}]}
              selected={settings?.ribbon}
            />
            <InputSelect
              change={changeSelect}
              label='Сортировка «Моей ленты»'
              name='sorting'
              list={[{name:'По популярности', val: 'popular'},{name:'По дате', val: 'date'}]}
              selected={settings?.sorting}
            />
            <InputSelect
              change={changeSelect}
              label='Записи в блоге'
              name='entry'
              list={[{name:'Показывать всем', val: 'all'},{name:'Показывать только подписчикам', val: 'subscribers'}]}
              selected={settings?.entry}
            />
            <InputSelect
              change={changeSelect}
              label='Контент для взрослых'
              name='adult'
              list={[{name:'Блюрить записи 18+ в лентe', val: 'adult'},{name:'Показать всё', val: 'all'}]}
              selected={settings?.adult}
            />
          </div>
          <ButtonDefault
            disabled={(
              settings?.description === user.settings?.description &&
              settings?.online === user.settings?.online &&
              settings?.ribbon === user.settings?.ribbon &&
              settings?.sorting === user.settings?.sorting &&
              settings?.entry === user.settings?.entry &&
              settings?.adult === user.settings?.adult
            )}
            text='Сохранить'
            type='blue'
            cb={sendSettings}
          />
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
                <div className={`${style.settings_change__price}`}>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB'}).format(user.donate)}</div>
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
            <CheckList list={list} title='Письма на почту' cb={changeChecBoxList}/>
            <CheckList list={message} title='Уведомления на сайте' cb={changeChecBoxMessage}/>
          </div>
          <ButtonDefault
            text='Сохранить'
            type='blue'
            cb={sendMessage}
            disabled={(
              user.list?.answer.checked === list.answer.checked &&
              user.list?.ratings.checked === list.ratings.checked &&
              user.list?.reminders.checked === list.reminders.checked &&
              user.list?.message.checked === list.message.checked &&
              user.list?.best.checked === list.best.checked &&
              user.message.answer.checked === message.answer.checked &&
              user.message.ratings.checked === message.ratings.checked &&
              user.message.reminders.checked === message.reminders.checked &&
              user.message.comments.checked === message.comments.checked &&
              user.message.subscribers.checked === message.subscribers.checked
            )}
          />
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
            <div className={`flex align-items-center`}>
              <span className={`${style.settings_change__reset_span}`}>Cбросить все скрытые статьи</span>
              <ButtonDefault text='Cбросить' type='def' cb={resetAllArticle} classes={style.settings_change__rest_btn}/>
            </div>
          </div>
          <ButtonDefault text='Сохранить' type='blue' cb={() => {}}/>
        </>
      }
    </div>
  )
};

export default SettingsChange;