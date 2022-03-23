import React, {FC} from "react";
import Link from 'next/link';
import style from './style.module.scss';
import {IUser} from "../../dto/user";
import ButtonDefault from "../button.default";

interface IProfileContent {
  user: IUser
}

const ProfileContent: FC<IProfileContent> = ({user}) => {
  return (
    <div className={`${style.profile_content}`}>
      <div className={`flex ${style.profile_content__writted}`}>
        sad
      </div>
      <div className={`flex flex-direction-column ${style.profile_content__subs}`}>
        <div className={`flex ${style.profile_content__cap}`}>
          <h4 className={`${style.profile_content__h4}`}>Подписчики</h4>
          <span className={`${style.profile_content__span}`}>{user.subs}</span>
        </div>
        <span className={`${style.profile_content__desc}`}>У вас нет ещё подписчиков</span>
      </div>
      <div className={`flex justify-content-center flex-direction-column align-items-center ${style.profile_content__create}`}>
        <span className={`${style.profile_content__desc}`}>Напишите первую статью, чтобы привлечь читателей в ваш блог</span>
        <div className={`${style.profile_content__btn_wrapper}`}>
          <ButtonDefault type='def' cb={()=>{}} text='Создать запись'/>
        </div>
      </div>
      <div className={`${style.profile_content__listening}`}>
        <div className={`flex ${style.profile_content__cap}`}>
          <h4 className={`${style.profile_content__h4}`}>Подписки</h4>
        </div>
        <Link href={`/profile/subs`}><a className={`${style.profile_content__link}`}>Настроить ленту</a></Link>
      </div>
    </div>
  )
}

export default ProfileContent;