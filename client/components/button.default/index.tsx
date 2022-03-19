import type { NextPage } from 'next';
import Link from 'next/link'
import style from './button.default.module.scss';

interface IButtonDefault {
  text: string,
  path: string,
  classes?: string,
}

const ButtonDefault: NextPage<IButtonDefault> = ({text, path, classes}) => {
  return (
    <Link href={path}>
      <a className={`flex justify-content-center align-items-center ${ style.button_default } ${classes ? classes : ''}`}
      >{text}</a>
    </Link>
  )
};

export default ButtonDefault;