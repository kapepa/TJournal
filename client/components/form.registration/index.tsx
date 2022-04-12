import React, {FC, useContext, useRef, useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import style from './style.module.scss';
import InputDefault from "../input.default";
import ButtonDefault from "../button.default";
import Validator from "../../helpers/validator";
import {SubmitRegistraition} from "../../helpers/request";
import {DataContext} from "../../layout/layout.default";

interface IState {
  name: string,
  email: string,
  password: string,
  confirme: string,
}

// 6Le5IGsfAAAAADUZV6u2jkJ7kVm-DU04kMnXgaJt
// 6Le5IGsfAAAAAKroi6hQ3xzt0Bf1fkyiYkoYoWYj

const FormRegistration: FC = () => {
  const router = useRouter();
  const data = useContext(DataContext);
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const [warning, setWarning] = useState<boolean>(false);
  const [state, setState] = useState({} as IState);
  const nameValidator = Validator.name(state.name);
  const emailValidator = Validator.email(state.email);
  const passwordValidator = Validator.password(state.password, state.confirme);
  const validate = (nameValidator && emailValidator && passwordValidator);

  const changeRegist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setState({...state, [name]: e.target.value})
  }

  const submitRegist = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {confirme, ...other} = state;
    // if(validate){
    //   setWarning(false);
    //   SubmitRegistraition(other, data.wrong).then(token => {
    //     if(!token) return;
    //     Cookies.set('token', token);
    //     router.push('/home', { query: {}});
    //   });
    // } else {
    //   setWarning(true);
    // }
    const token = await recaptchaRef.current?.executeAsync();

    console.log(token)

  }


  return (
    <form onSubmit={submitRegist} className={`flex justify-content-center flex-direction-column ${style.form_regist}`}>
      <InputDefault
        classesLabel={style.form_regist__label}
        name='name'
        type='text'
        placeholder='Имя и фамилия'
        change={changeRegist}
        defaultValue={state.name}
        warning={(warning && !nameValidator)}
      />
      <InputDefault
        classesLabel={style.form_regist__label}
        name='email'
        type='text'
        placeholder='Почта'
        change={changeRegist}
        defaultValue={state.email}
        warning={(warning && !emailValidator)}
      />
      <InputDefault
        classesLabel={style.form_regist__label}
        name='password'
        type='password'
        placeholder='Пароль'
        change={changeRegist}
        defaultValue={state.password}
        warning={(warning && !passwordValidator)}
      />
      <InputDefault
        classesLabel={style.form_regist__label}
        name='confirme'
        type='password'
        placeholder='Подтверждение'
        change={changeRegist}
        defaultValue={state.confirme}
      />
      <div className={style.popup_registration__recaptcha}>
        <ReCAPTCHA
          sitekey="6Le5IGsfAAAAADUZV6u2jkJ7kVm-DU04kMnXgaJt"
          size="invisible"
          ref={recaptchaRef}
        />
      </div>
      <ButtonDefault
        disabled={!validate}
        text='Зарегистрироваться'
        type='blue'
      />
    </form>
  )
}

export default FormRegistration;