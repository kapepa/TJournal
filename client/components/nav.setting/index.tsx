import React, {FC} from "react";
import style from './style.module.scss';
import { useRouter } from 'next/router'

const NavSetting: FC = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const nav = router.query.nav;

  return (
    <div className={`flex flex-direction-column ${style.nav_setting}`}>
      <h4 className={`${style.nav_setting__h4}`}>Настройки</h4>
      <nav className={`${style.nav_setting__nav}`}>
        <div
          className={`flex align-items-center 
          ${style.nav_setting__line} 
          ${style.nav_setting__line__people} 
          ${(nav === 'profile' || nav === undefined ) ? style.nav_setting__active : '' }`}
          onClick={() => { router.push({
            pathname,
            query: {nav: 'profile'},
          },) }}
        >Профиль</div>
        <div
          className={`flex align-items-center ${style.nav_setting__line} ${style.nav_setting__line__settings} ${( nav === 'basic' ) ? style.nav_setting__active : '' }`}
          onClick={() => { router.push({
            pathname,
            query: {nav: 'basic'},
          },) }}
        >Основные</div>
        <div
          className={`flex align-items-center ${style.nav_setting__line} ${style.nav_setting__line__diamond} ${( nav === 'function' ) ? style.nav_setting__active : '' }`}
          onClick={() => { router.push({
            pathname,
            query: {nav: 'function'},
          },) }}
        >Функции</div>
        <div
          className={`flex align-items-center ${style.nav_setting__line} ${style.nav_setting__line__bell} ${( nav === 'message' ) ? style.nav_setting__active : '' }`}
          onClick={() => { router.push({
            pathname,
            query: {nav: 'message'},
          },) }}
        >Уведомления</div>
        <div
          className={`flex align-items-center ${style.nav_setting__line} ${style.nav_setting__line__stop} ${( nav === 'black_list' ) ? style.nav_setting__active : '' }`}
          onClick={() => { router.push({
            pathname,
            query: {nav: 'black_list'},
          },) }}
        >Черный список</div>
      </nav>
    </div>
  )
}

export default NavSetting;