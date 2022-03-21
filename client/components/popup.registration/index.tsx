import React, {FC, useState} from "react";
import style from './style.module.scss';
import ButtonXClose from "../button.xclose";
import ButtonSocial from "../button.social";
import InputDefault from "../input.default";
import ButtonDefault from "../button.default";

interface IPopupRegistration {
  classes?: string,
  cb: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const PopupRegistration: FC<IPopupRegistration> = ({cb, classes}) => {
  const [view, setVies] = useState({
    select: 'regist',
    regist: false,
    login: false,
  })

  const clickAnchor = (e: React.MouseEvent<HTMLSpanElement>) => {
    const elem = (e.target as HTMLSpanElement).dataset.popup;
    if(elem === 'login'){
      setVies(view.login ? {...view, select: 'regist',  regist: true, login: false} : {...view, select: 'regist' });
    }
    if(elem === 'regist'){
      setVies(view.regist ? {...view, select: 'login',  regist: false, login: true} : {...view, select: 'login' });
    }
  }

  const clickEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(view.select === 'regist') setVies({ ...view, regist: true });
    if(view.select === 'login') setVies({ ...view, login: true });
  }

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {if((e.target as HTMLDivElement).classList.contains(style.popup_registration)) cb(e) }}
      className={`flex justify-content-center align-items-center ${style.popup_registration} ${classes ? classes : ''}`}
    >
      <div className={`flex ${style.popup_registration__frame}`}>
        <ButtonXClose cd={cb} classes={style.popup_registration__close} />
        <div className={`flex ${style.popup_registration__inner}`}>
          <div className={style.popup_registration__bg} />
          <div className={`flex justify-content-center flex-direction-column ${style.popup_registration__content}`}>
            { (view.regist || view.login) &&
              <div
                className={style.popup_registration__back}
                onClick={() => {setVies({...view, regist: false, login: false,})}}
              >Назад</div>
            }
            <h3 className={style.popup_registration__h3}>{view.select === 'regist' ? 'Регистрация' : 'Вход в аккаунт' }</h3>
            { !(view.regist || view.login) &&
              <>
                <ButtonSocial cb={clickEmail} text="Почта" icon='email' classes={style.popup_registration__btn_social} />
                <ButtonSocial cb={() => {}} text="ВКонтакте" icon='vk' classes={style.popup_registration__btn_social}/>
                <ButtonSocial cb={() => {}} text="Google" icon='google' classes={style.popup_registration__btn_social}/>
                <div className={`flex ${style.popup_registration__gorizont}`}>
                  <ButtonSocial cb={() => {}}  icon='facebook' />
                  <ButtonSocial cb={() => {}}  icon='twitter' />
                  <ButtonSocial cb={() => {}}  icon='apple' />
                </div>
              </>
            }
            { view.regist &&
              <>
                <InputDefault
                  classesLabel={style.popup_registration__label}
                  name='name'
                  defaultValue='Имя и фамилия'
                  change={() => {}}
                />
                <InputDefault
                  classesLabel={style.popup_registration__label}
                  name='email'
                  defaultValue='Почта'
                  change={() => {}}
                />
                <InputDefault
                  classesLabel={style.popup_registration__label}
                  name='password'
                  defaultValue='Пароль'
                  change={() => {}}
                />
                <div className={style.popup_registration__recaptcha}>need make recaptcha this</div>
                <ButtonDefault text='Зарегистрироваться' type='blue' cb={() => {}}/>
              </>
            }
            { view.login &&
              <>
                <InputDefault
                  classesLabel={style.popup_registration__label}
                  name='email'
                  defaultValue='Почта'
                  change={() => {}}
                />
                <InputDefault
                  classesLabel={style.popup_registration__label}
                  name='password'
                  defaultValue='Пароль'
                  change={() => {}}
                />
                <ButtonDefault text='Войти' type='blue' cb={() => {}}/>
              </>
            }
            <div className={`${style.popup_registration__entre}`}>
              <span className={`${style.popup_registration__span}`}>
                {view.select === 'regist'
                  ? <>Есть аккаунт<span
                      className={`${style.popup_registration__desc}`}
                      data-popup='regist'
                      onClick={clickAnchor}
                    >Войти</span></>
                  : <span
                      className={`${style.popup_registration__desc}`}
                      data-popup='login'
                      onClick={clickAnchor}
                    >Регистрация</span>
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupRegistration;

