import React, {FC, useState} from "react";
import style from './style.module.scss';
import InputDefault from "../input.default";
import ButtonDefault from "../button.default";
import Validator from "../../helpers/validator";
import {SubmitRegistraition} from "../../helpers/request";

interface IState {
  name: string,
  email: string,
  password: string,
  confirme: string,
}

const FormRegistration: FC = () => {
  const [state, setState] = useState({} as IState);
  const validate = !(Validator.name(state.name) && Validator.email(state.email) && Validator.password(state.password, state.confirme))

  const changeRegist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setState({...state, [name]: e.target.value})
  }

  const submitRegist = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {confirme, ...other} = state;
    SubmitRegistraition(other).then(res => console.log(res));
  }

  return (
    <form onSubmit={submitRegist} className={`flex justify-content-center flex-direction-column ${style.form_regist}`}>
      <InputDefault
        classesLabel={style.popup_registration__label}
        name='name'
        type='text'
        placeholder='Имя и фамилия'
        change={changeRegist}
      />
      <InputDefault
        classesLabel={style.form_regist__label}
        name='email'
        type='text'
        placeholder='Почта'
        change={changeRegist}
      />
      <InputDefault
        classesLabel={style.form_regist__label}
        name='password'
        type='password'
        placeholder='Пароль'
        change={changeRegist}
      />
      <InputDefault
        classesLabel={style.form_regist__label}
        name='confirme'
        type='password'
        placeholder='Подтверждение'
        change={changeRegist}
      />
      <div className={style.popup_registration__recaptcha}>need make recaptcha this</div>
      <ButtonDefault
        disabled={validate}
        text='Зарегистрироваться'
        type='blue'
        cb={() => {}}
      />
    </form>
  )
}

export default FormRegistration;