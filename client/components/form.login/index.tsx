import React, {FC, useContext, useState} from "react";
import style from './style.module.scss';
import InputDefault from "../input.default";
import ButtonDefault from "../button.default";
import Validator from "../../helpers/validator";
import {DataContext} from "../../layout/layout.default";
import {SubmitLogin} from "../../helpers/request";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

interface ILogin{
  email: string,
  password: string,
}

const FormLogin: FC = () => {
  const router = useRouter();
  const { wrong } = useContext(DataContext);
  const [warning, setWarning] = useState<boolean>(false);
  const [login, setLogin] = useState<ILogin>({email: 'kapepa@mail.ru', password: '123456'} as ILogin);
  const emailValidator = Validator.email(login.email);
  const passwordValidator = Validator.password(login.password, login.password);
  const validate = (emailValidator && passwordValidator);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setLogin({...login, [name]: e.target.value});
  }

  const submitLogin = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(validate){
      setWarning(false);
      SubmitLogin(login, wrong).then(token => {
        if(!token) return;
        Cookies.set('token', token);
        router.push('/home', { query: {}});
      })
    } else {
      setWarning(true);
    }
  }

  return (
    <form
      onSubmit={submitLogin}
      className={`flex justify-content-center flex-direction-column ${style.form_login}`
    }>
      <InputDefault
        classesLabel={style.form_login__label}
        name='email'
        placeholder='Почта'
        change={changeInput}
        type='text'
        defaultValue={login.email}
        warning={(warning && !emailValidator)}
      />
      <InputDefault
        classesLabel={style.form_login__label}
        name='password'
        placeholder='Пароль'
        change={changeInput}
        type='password'
        defaultValue={login.password}
        warning={(warning && !passwordValidator)}
      />
      <ButtonDefault
        text='Войти'
        type='blue'
        disabled={!validate}
      />
    </form>
  )
}

export default  FormLogin