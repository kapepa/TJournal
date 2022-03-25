import React, {FC, useEffect, useState} from "react";
import Link from 'next/link';
import style from './style.module.scss';
import {IUser} from "../../dto/user";
import ButtonSocial from "../button.social";
import ButtonDefault from "../button.default";
import {IFile} from "../../dto/file";
import AvatarUpload from "../avatar.upload";

interface IProfilePanel {
  user: IUser,
  file: IFile,
  icon: IFile,
  query: string | undefined,
  loadIcon: (obj: IFile) => void,
}

const ProfilePanel: FC<IProfilePanel> = ({user, query, file, icon, loadIcon}) => {
  const data = new Date(user.created_at);
  const [nav, setNav] = useState<string | undefined>(query);
  const day = data.getDate();
  const manth = data.getMonth() + 1;
  const year = data.getFullYear();

  return (
    <div className={style.profile_panel}>
      <div className={`flex ${style.profile_panel__frame}`}>
        <div className={`flex flex-direction-column ${ file?.reader ? style.profile_panel__head_frame : ''}`}>
          { file?.reader &&
            <div className={`${style.profile_panel__cover_frame}`}>
              <div className={`flex justify-content-center align-items-center ${style.profile_panel__cover_btn}`}>
                <ButtonDefault text='Сменить обложку' type='def' cb={() => {}}/>
                <ButtonDefault text='Удалить' type='def' cb={() => {}}/>
              </div>
              <img className={`${style.profile_panel__cover_img}`} src={String(file?.reader)} alt='image cover' />
            </div>
          }
          <AvatarUpload user={user} icon={icon} loadIcon={loadIcon}/>
          <div className={`${style.profile_panel__fullname}`}>
            <span className={`${style.profile_panel__name}`}>{user.name}</span>
          </div>
          <div className={`flex ${style.profile_panel__action} ${file?.reader ? style.profile_panel__action__image : ''}`}>
            <ButtonSocial icon='settings' size='fourty' cb={() => {}} link='/setting' />
            <ButtonDefault text='Написать' type='blue' cb={() => {}}/>
          </div>
          <Link href='/setting'>
            <a className={`${style.profile_panel__describe}`}>Изменить описание</a>
          </Link>
          <div className={`${style.profile_panel__subs}`}>{user.subs} подписчик</div>
          <div>
            {`На проекте ${day < 10 ? '0'+day : day }/${manth < 10 ? '0'+manth : manth }/${year}`}
          </div>
        </div>
      </div>
      <nav className={`flex ${style.profile_panel__nav}`}>{console.log(nav)}
        <Link href={`/profile?nav=article`}><a
          className={`flex align-items-center ${nav === "undefined" || nav === 'article' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
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