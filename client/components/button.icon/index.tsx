import React, {FC} from "react";
import Link from 'next/link'
import style from './style.module.scss';

enum EType {
  message,
  create,
  share,
  bell,
  settings,
}

interface IButtonIcon {
  classes?: string,
  digit?: number,
  href?: string,
  type: keyof typeof EType,
  cb?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const ButtonIcon: FC<IButtonIcon> = ({classes, digit, href, type, cb= () => {}}) => {
  const classType = (type: string) => {
    let obj;
    switch (type) {
      case 'message' : obj = {icon: style.button_icon__message, title: 'сообщение'} ; break;
      case 'create' : obj = {icon: style.button_icon__create, title: 'создать'}; break;
      case 'share' : obj = {icon: style.button_icon__share, title: 'поделиться'}; break;
      case 'bell' : obj = {icon: style.button_icon__bell, title: 'поделиться'}; break;
      case 'settings' : obj = {icon: style.button_icon__settings, title: 'settings'}; break;
      default: obj = {icon: '', title: ''};
    }
    return obj;
  }

  const {icon, title} = classType(type)

  return (
    <>
      {href && <Link href={href}><a
        data-types={type}
        title={title}
        className={`flex align-items-center ${style.button_icon} ${icon} ${classes ? classes : ''} ${digit ? style.button_icon__digit : ''}`}
      />{digit ? digit : ''}</Link>}
      {!href && <button
        data-types={type}
        onClick={cb}
        title={title}
        className={`flex align-items-center ${style.button_icon} ${icon} ${classes ? classes : ''} ${digit ? style.button_icon__digit : ''}`}
      >{digit ? digit : ''}</button>}
    </>
  )
};

export default ButtonIcon;