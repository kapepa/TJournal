import React, {FC, useRef} from "react";
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
  const sizeRef = useRef<string>();
  const iconRef = useRef<string>();

  switch (size){
    case 'small' : sizeRef.current = style.button_social__small; break;
    case 'fourty' : sizeRef.current = style.button_social__fourty; break;
    default : sizeRef.current =  style.button_social__def; break;
  }

  switch (icon){
    case 'email' : iconRef.current = style.button_social__icon__email; break;
    case 'vk' : iconRef.current = style.button_social__icon__vk; break;
    case 'google' : iconRef.current = style.button_social__icon__google; break;
    case 'facebook' : iconRef.current = style.button_social__icon__facebook; break;
    case 'twitter' : iconRef.current = style.button_social__icon__twitter; break;
    case 'apple' : iconRef.current = style.button_social__icon__apple; break;
    case 'settings' : iconRef.current = style.button_social__icon__settings; break;
  }

  return (
    <>
      {!link &&
        <button
          onClick={cb}
          data-btn={icon}
          className={`${style.button_social} ${sizeRef.current} ${classes ? classes : ''} ${!text ? style.button_social__static : ''}`}
        >
          <div
            className={`${style.button_social__icon} ${iconRef.current} ${!text ? style.button_social__icon__static : ''}`}
          />
          {text && <span className={style.button_social__span}>{text}</span>}
        </button>
      }
      {link &&
        <Link href={link}>
          <a
            onClick={cb}
            data-btn={icon}
            className={`${style.button_social} ${sizeRef.current} ${classes ? classes : ''} ${!text ? style.button_social__static : ''}`}
          >
            <div
              className={`${style.button_social__icon} ${iconRef.current} ${!text ? style.button_social__icon__static : ''}`}
            />
            {text && <span className={style.button_social__span}>{text}</span>}
          </a>
        </Link>
      }
    </>
  )
};

export default ButtonSocial;