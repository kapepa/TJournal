import React, {FC} from "react";
import style from './style.module.scss';
import InputDefault from "../input.default";
import ButtonDefault from "../button.default";

const FormLogin: FC = () => {
  return (
    <form className={`flex justify-content-center flex-direction-column ${style.form_login}`}>
      <InputDefault
        classesLabel={style.form_login__label}
        name='email'
        defaultValue='Почта'
        change={() => {}}
      />
      <InputDefault
        classesLabel={style.form_login__label}
        name='password'
        defaultValue='Пароль'
        change={() => {}}
      />
      <ButtonDefault text='Войти' type='blue' cb={() => {}}/>
    </form>
  )
}

export default  FormLogin