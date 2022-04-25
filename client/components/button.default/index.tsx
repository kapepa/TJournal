import React, {FC, useRef} from "react";
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
  const typeRef = useRef<string>();

  switch (type) {
    case 'def': typeRef.current = style.button_default__def; break;
    case 'blue': typeRef.current = style.button_default__blue; break;
    case 'yellow': typeRef.current = style.button_default__yellow; break;
  }

  const classStr = `flex justify-content-center align-items-center ${ style.button_default } ${typeRef.current} ${classes ? classes : ''} ${disabled ? style.button_default__disabled : '' }`;

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