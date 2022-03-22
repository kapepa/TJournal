import React, {FC} from "react";
import style from "./style.module.scss";

enum EIcon {
  email,
  vk,
  google,
  facebook,
  twitter,
  apple,
}

enum ESize {
  def,
  small,
}

interface IButtonSocial {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void,
  text?: string,
  classes?: string,
  icon: keyof typeof EIcon,
  size?: keyof typeof ESize,
}

const ButtonSocial: FC<IButtonSocial> = ({ cb, classes, size, text, icon }) => {

  const iconGenerate = (icon: string) => {
    let image;
    switch (icon){
      case 'email' : image = style.button_social__icon__email;
        break;
      case 'vk' : image = style.button_social__icon__vk;
        break;
      case 'google' : image = style.button_social__icon__google;
        break;
      case 'facebook' : image = style.button_social__icon__facebook;
        break;
      case 'twitter' : image = style.button_social__icon__twitter;
        break;
      case 'apple' : image = style.button_social__icon__apple;
        break;
    }
    return image
  }

  const sizeGenerate = (size: string | undefined) => {
    let vol;
    switch (size){
      case 'small' : vol = style.button_social__small;
        break;
      default : vol =  style.button_social__def;
        break;
    }
    return vol
  }

  return (
    <button
      onClick={cb}
      className={`${style.button_social} ${sizeGenerate(size)} ${classes ? classes : ''} ${!text ? style.button_social__static : ''}`}
    >
      <div
        className={`${style.button_social__icon} ${iconGenerate(icon)} ${!text ? style.button_social__icon__static : ''}`}
      />
      {text && <span className={style.button_social__span}>{text}</span>}
    </button>
  )
};

export default ButtonSocial;