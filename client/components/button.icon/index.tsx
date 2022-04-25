import React, {FC, useRef} from "react";
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
  const typeRef = useRef<{ icon: string, title: string }>();

  switch (type) {
    case 'message' : typeRef.current = {icon: style.button_icon__message, title: 'сообщение'} ; break;
    case 'create' : typeRef.current = {icon: style.button_icon__create, title: 'создать'}; break;
    case 'share' : typeRef.current = {icon: style.button_icon__share, title: 'поделиться'}; break;
    case 'bell' : typeRef.current = {icon: style.button_icon__bell, title: 'поделиться'}; break;
    case 'settings' : typeRef.current = {icon: style.button_icon__settings, title: 'settings'}; break;
    default: typeRef.current = {icon: '', title: ''};
  }

  return (
    <>
      {href && <Link href={href}><a
        data-types={type}
        title={typeRef.current.title}
        className={`flex align-items-center ${style.button_icon} ${typeRef.current.icon} ${classes ? classes : ''} ${digit ? style.button_icon__digit : ''}`}
      />{digit ? digit : ''}</Link>}
      {!href && <button
        data-types={type}
        onClick={cb}
        title={typeRef.current.title}
        className={`flex align-items-center ${style.button_icon} ${typeRef.current.icon} ${classes ? classes : ''} ${digit ? style.button_icon__digit : ''}`}
      >{digit ? digit : ''}</button>}
    </>
  )
};

export default ButtonIcon;