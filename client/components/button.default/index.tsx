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
  cb?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement >) => void,
  type: keyof typeof BtnStyle
  disabled?: boolean
  data?: string
}

const ButtonDefault: FC<IButtonDefault> = ({text, path, classes, cb, disabled= false, type= 'def', data}) => {
  const typeBtn = (type: string) => {
    let view;
    switch (type) {
      case 'def': view = style.button_default__def; break;
      case 'blue':view = style.button_default__blue; break;
      case 'yellow':view = style.button_default__yellow; break;
    }
    return view;
  }
  const classStr = `flex justify-content-center align-items-center ${ style.button_default } ${typeBtn(type)} ${classes ? classes : ''} ${disabled ? style.button_default__disabled : '' }`;

  return (
    <>
      { path &&
        <Link href={path}>
          <a
            onClick={cb}
            className={classStr}
            data-btn={data ? data : ''}
          >{text}</a>
        </Link>
      }
      { path === undefined &&
        <button
          onClick={cb}
          className={classStr}
          disabled={disabled}
          data-btn={data ? data : ''}
        >{text}</button>
      }
    </>
  )
};

export default ButtonDefault;