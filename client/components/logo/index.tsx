import type { NextPage } from 'next';
import Link from 'next/link'
import style from './logo.module.scss';

const Logo: NextPage = () => {
  return (
    <div className={`${style.logo}`}>
      <Link href="/home">
        <a className={style.logo__image} />
      </Link>
    </div>
  )
}

export default Logo;