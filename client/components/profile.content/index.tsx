import React, {FC} from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'
import style from './style.module.scss';
import {IUser} from "../../dto/user";
import ButtonDefault from "../button.default";
import ButtonLine from "../button.line";

interface IProfileContent {
  user: IUser
}

const ProfileContent: FC<IProfileContent> = ({user}) => {
  const router = useRouter();
  const { nav } = router.query;

  return (
    <section className={`${style.profile_content}`}>
      <div className={`flex flex-direction-column ${style.profile_content__part}`}>
        { (nav === 'article' || nav === undefined) &&
          <>
            <div className={`flex flex-direction-column ${style.profile_content__writted} ${style.profile_content__containe}`}>
              <div className={`flex align-items-center ${style.profile_content__head}`}>
                <div className={`flex justify-content-center align-items-center ${style.profile_content__image}`}>{user.name.charAt(0).toUpperCase()}</div>
                <span className={`${style.profile_content__new}`}>Новая запись</span>
              </div>
              <div className={`flex ${style.profile_content__btn_section}`}>
                <ButtonLine text='Фото и видео' type='image' cb={() => {}} />
                <ButtonLine text='Ссылка' type='anchor' cb={() => {}} />
              </div>
            </div>
            <div className={`flex justify-content-center flex-direction-column align-items-center ${style.profile_content__create} ${style.profile_content__containe}`}>
              <span className={`${style.profile_content__desc}`}>Напишите первую статью, чтобы привлечь читателей в ваш блог</span>
              <div className={`${style.profile_content__btn_wrapper}`}>
              <ButtonDefault type='def' cb={()=>{}} text='Создать запись'/>
              </div>
            </div>
          </>
        }
        { (nav === 'comment') &&
          <div className={`flex justify-content-center align-items-center ${style.profile_content__comments} ${style.profile_content__containe}`}>
            { user.comments.length ? user.comments.length : 'Вы еще не оставили ни одного комментария' }
          </div>
        }
        { (nav === 'drafts') &&
          <div className={`flex justify-content-center flex-direction-column align-items-center ${style.profile_content__create} ${style.profile_content__containe}`}>
            <span className={`${style.profile_content__desc}`}>У вас нет черновиков</span>
            <div className={`${style.profile_content__btn_wrapper}`}>
              <ButtonDefault type='def' cb={()=>{}} text='Создать запись'/>
            </div>
          </div>
        }
        { (nav === 'donations') &&
          <div className={`${style.profile_content__containe} ${style.profile_content__donations}`}>
            <h4 className={`${style.profile_content__h4}`}>Текущий баланс</h4>
            {new Intl.NumberFormat('en-US',{
              style: 'currency',
              currency: 'USD',
            }).format(user.donate)}
          </div>
        }
      </div>
      <div className={`flex flex-direction-column ${style.profile_content__part}`}>
        <div className={`flex flex-direction-column ${style.profile_content__subs}  ${style.profile_content__containe}`}>
          <div className={`flex ${style.profile_content__cap}`}>
            <h4 className={`${style.profile_content__h4}`}>Подписчики</h4>
            <span className={`${style.profile_content__span}`}>{user.subs}</span>
          </div>
          <span className={`${style.profile_content__desc}`}>У вас нет ещё подписчиков</span>
        </div>
        <div className={`${style.profile_content__listening}  ${style.profile_content__containe}`}>
          <div className={`flex ${style.profile_content__cap}`}>
            <h4 className={`${style.profile_content__h4}`}>Подписки</h4>
          </div>
          <Link href={`/profile/subs`}><a className={`${style.profile_content__link}`}>Настроить ленту</a></Link>
        </div>
      </div>
    </section>
  )
}

export default ProfileContent;