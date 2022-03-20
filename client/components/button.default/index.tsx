import type { NextPage } from 'next';
import React from "react";
import Link from 'next/link'
import style from './button.default.module.scss';

interface IButtonDefault {
  text: string,
  path: string,
  classes?: string,
  cb: (e: React.MouseEvent<HTMLAnchorElement>) => void,
}

const ButtonDefault: NextPage<IButtonDefault> = ({text, path, classes, cb}) => {
  return (
    <Link href={path}>
      <a
        onClick={cb}
        className={`flex justify-content-center align-items-center ${ style.button_default } ${classes ? classes : ''}`}
      >{text}</a>
    </Link>
  )
};

export default ButtonDefault;