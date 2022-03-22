import React, {FC} from 'react';
import style from './style.module.scss';

interface IButtonHamburger{
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const ButtonHamburger: FC<IButtonHamburger> = ({cb}) => {
  return (
    <button className={style.button_hamburger} onClick={cb}>
      <div className={style.button_hamburger__line} />
      <div className={style.button_hamburger__line} />
      <div className={style.button_hamburger__line} />
    </button>
  )
}

export default ButtonHamburger;
