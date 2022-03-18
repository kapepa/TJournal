import type { NextPage } from 'next';
import Link from 'next/link'
import style from './button.default.module.scss';

interface IButtonDefault {
  text: string,
  path: string,
}

const ButtonDefault: NextPage<IButtonDefault> = ({text, path}) => {
  return (
    <Link href={path}>
      <a className={`${style.button_default} flex justify-content-center align-items-center`}>{text}</a>
    </Link>
  )
};

export default ButtonDefault;