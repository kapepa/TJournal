import React, {FC, useState} from "react";
import Link from 'next/link';
import style from './style.module.scss';
import {IUser} from "../../dto/user";
import ButtonSocial from "../button.social";
import ButtonDefault from "../button.default";

interface IProfilePanel {
  user: IUser,
}

const ProfilePanel: FC<IProfilePanel> = ({user}) => {
  const data = new Date(user.created_at);
  const [nav, setNav] = useState<string>('article');
  const day = data.getDate();
  const manth = data.getMonth() + 1;
  const year = data.getFullYear();

  return (
    <div className={style.profile_panel}>
      <div className={`flex ${style.profile_panel__frame}`}>
        <div className={`flex flex-direction-column ${style.profile_panel__user}`}>
          <div className={`flex justify-content-center align-items-center ${style.profile_panel__avatar}`} >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={`${style.profile_panel__fullname}`}>
            <span className={`${style.profile_panel__name}`}>{user.name}</span>
          </div>
          <Link href='/profile/setting'>
            <a className={`${style.profile_panel__describe}`}>Изменить описание</a>
          </Link>
          <div className={`${style.profile_panel__subs}`}>{user.subs} подписчик</div>
          <div>
            {`На проекте ${day < 10 ? '0'+day : day }/${manth < 10 ? '0'+manth : manth }/${year}`}
          </div>
        </div>
        <div className={`flex ${style.profile_panel__action}`}>
          <ButtonSocial icon='settings' size='fourty' cb={() => {}} />
          <ButtonDefault text='Написать' type='blue' cb={() => {}}/>
        </div>
      </div>
      <nav className={`flex ${style.profile_panel__nav}`}>
        <Link href={`/profile?nav=article`}><a
          className={`flex align-items-center ${nav === 'article' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
          onClick={(e) => {
            setNav('article');
          }}
        >Статьи</a></Link>
        <Link href={`/profile?nav=comment`}><a
          className={`flex align-items-center ${nav === 'comment' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
          onClick={(e) => {
            setNav('comment');
          }}
        >Комментарии</a></Link>
        <Link href={`/profile?nav=drafts`}><a
          className={`flex align-items-center ${nav === 'drafts' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
          onClick={(e) => {
            setNav('drafts')
          }}
        >Черновики</a></Link>
        <Link href={`/profile?nav=donations`}><a
          className={`flex align-items-center ${nav === 'donations' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
          onClick={(e) => {
            setNav('donations')
          }}
        >Донаты</a></Link>
      </nav>
    </div>
  )
};

export default ProfilePanel;