import React, {FC} from 'react';
import style from './style.module.scss';

interface IButtonHamburger{
  cd: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const ButtonHamburger: FC<IButtonHamburger> = ({cd}) => {
  return (
    <button className={style.button_hamburger} onClick={cd}>
      <div className={style.button_hamburger__line} />
      <div className={style.button_hamburger__line} />
      <div className={style.button_hamburger__line} />
    </button>
  )
}

export default ButtonHamburger;
