import React from 'react';
import type { NextPage } from 'next';
import style from './button.hamburger.module.scss';

interface IButtonHamburger{
  cd: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const ButtonHamburger: NextPage<IButtonHamburger> = ({cd}) => {
  return (
    <button className={style.button_hamburger} onClick={cd}>
      <div className={style.button_hamburger__line} />
      <div className={style.button_hamburger__line} />
      <div className={style.button_hamburger__line} />
    </button>
  )
}

export default ButtonHamburger;
