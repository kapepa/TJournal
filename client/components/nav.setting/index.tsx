import React, {FC} from "react";
import style from './style.module.scss';

const NavSetting: FC = () => {

  return (
    <div className={`flex flex-direction-column ${style.nav_setting}`}>
      <h4 className={`${style.nav_setting__h4}`}>Настройки</h4>
      <nav className={`${style.nav_setting__nav}`}>
        <div className={`flex align-items-center ${style.nav_setting__line}`}>Профиль</div>
        <div className={`flex align-items-center ${style.nav_setting__line}`}>Основные</div>
        <div className={`flex align-items-center ${style.nav_setting__line}`}>Функции</div>
        <div className={`flex align-items-center ${style.nav_setting__line}`}>Уведомления</div>
        <div className={`flex align-items-center ${style.nav_setting__line}`}>Черный список</div>
      </nav>
    </div>
  )
}

export default NavSetting;