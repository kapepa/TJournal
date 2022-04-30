import React, {FC, useContext, useState} from "react";
import style from './style.module.scss';
import ButtonXClose from "../button.xclose";
import InputDefault from "../input.default";
import ButtonDefault from "../button.default";
import Validator from "../../helpers/validator";
import {DataContext} from "../../layout/layout.default";
import {SwapPassword} from "../../helpers/request";

interface IPopupPassword {
  close: () => void,
}

interface IState {
  password: string,
  confirme: string,
}

const PopupPassword: FC<IPopupPassword> = ({close}) => {
  const { wrong } = useContext(DataContext);
  const [state, setState] = useState<IState>({} as IState);
  const passwordValidator = Validator.password(state.password, state.confirme);
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({...state, [name]: value });
  }

  const sendPassword = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement >) => {
    if(!passwordValidator) return wrong('Coincidence');
    await SwapPassword({password: state.password}).then(() => {
      setState({} as IState);
      close();
    });
  }

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if( (e.target as HTMLDivElement ).classList.contains(style.popup_password) ) close();
      }}
      className={`flex justify-content-center align-items-center ${style.popup_password}`}
    >
      <div className={`flex flex-direction-column ${style.popup_password__frame}`}>
        <ButtonXClose cd={close} classes={`${style.popup_password__close}`} />
        <h5 className={`${style.popup_password__h5}`}>Сменить пароль</h5>
        <InputDefault name='password' type='password' placeholder='Новый пароль' change={changePassword} />
        <InputDefault name='confirme' type='password' placeholder='Повторить пароль' change={changePassword} />
        <ButtonDefault text='Сменить' type='blue' cb={sendPassword}/>
      </div>
    </div>
  )
}

export default PopupPassword;