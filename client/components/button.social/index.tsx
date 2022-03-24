import React, {FC} from "react";
import Link from 'next/link'
import style from "./style.module.scss";

enum EIcon {
  email,
  vk,
  google,
  facebook,
  twitter,
  apple,
  settings,
}

enum ESize {
  def,
  fourty,
  small,
}

interface IButtonSocial {
  cb: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
  text?: string,
  classes?: string,
  icon: keyof typeof EIcon,
  size?: keyof typeof ESize,
  link?: string
}

const ButtonSocial: FC<IButtonSocial> = ({ cb, link, classes, size, text, icon }) => {

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
      case 'settings' : image = style.button_social__icon__settings;
        break;
    }
    return image
  }

  const sizeGenerate = (size: string | undefined) => {
    let vol;
    switch (size){
      case 'small' : vol = style.button_social__small;
        break;
      case 'fourty' : vol = style.button_social__fourty;
        break;
      default : vol =  style.button_social__def;
        break;
    }
    return vol
  }

  return (
    <>
      {!link &&
        <button
          onClick={cb}
          className={`${style.button_social} ${sizeGenerate(size)} ${classes ? classes : ''} ${!text ? style.button_social__static : ''}`}
        >
          <div
            className={`${style.button_social__icon} ${iconGenerate(icon)} ${!text ? style.button_social__icon__static : ''}`}
          />
          {text && <span className={style.button_social__span}>{text}</span>}
        </button>
      }
      {link &&
        <Link href={link}>
          <a
            onClick={cb}
            className={`${style.button_social} ${sizeGenerate(size)} ${classes ? classes : ''} ${!text ? style.button_social__static : ''}`}
          >
            <div
              className={`${style.button_social__icon} ${iconGenerate(icon)} ${!text ? style.button_social__icon__static : ''}`}
            />
            {text && <span className={style.button_social__span}>{text}</span>}
          </a>
        </Link>
      }
    </>
  )
};

export default ButtonSocial;