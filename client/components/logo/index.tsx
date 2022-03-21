import React, {FC} from "react";
import Link from 'next/link'
import style from './style.module.scss';

const Logo: FC = () => {
  return (
    <div className={`${style.logo}`}>
      <Link href="/home">
        <a className={style.logo__image} />
      </Link>
    </div>
  )
}

export default Logo;