import React, {FC} from "react";
import Link from 'next/link'
import style from './style.module.scss';

enum BtnStyle {
  def,
  blue,
  yellow,
}

interface IButtonDefault {
  text: string,
  path?: string,
  classes?: string,
  cb: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement >) => void,
  type: keyof typeof BtnStyle
  disabled?: boolean
}

const ButtonDefault: FC<IButtonDefault> = ({text, path, classes, cb, disabled= false, type= 'def'}) => {
  const typeBtn = (type: string) => {
    let view;
    switch (type) {
      case 'def': view = style.button_default__def; break;
      case 'blue':view = style.button_default__blue; break;
      case 'yellow':view = style.button_default__yellow; break;
    }
    return view;
  }

  return (
    <>
      { path &&
        <Link href={path}>
          <a
            onClick={cb}
            className={`flex justify-content-center align-items-center ${ style.button_default } ${typeBtn(type)} ${classes ? classes : ''} `}
          >{text}</a>
        </Link>
      }
      { path === undefined &&
        <button
          onClick={cb}
          className={`flex justify-content-center align-items-center ${ style.button_default } ${typeBtn(type)} ${classes ? classes : ''}`}
          disabled={disabled}
        >{text}</button>
      }
    </>
  )
};

export default ButtonDefault;