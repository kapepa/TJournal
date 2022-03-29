import React, {FC} from 'react';
import style from './style.module.scss';


interface IButtonTransparent {
  picture?: boolean,
  text: string,
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void,
};

const ButtonTransparent: FC<IButtonTransparent> = ({text, cb, picture}) => {
  return (
    <button className={`${style.button_transparent} flex align-items-center`} onClick={cb}>
      {!picture &&
        <svg className={style.button_transparent__svg} width={22} height={22} version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 1000 1000" >
          <g>
            <path className={style.button_transparent__path} d="M929.2,990c-16.9,0-30.6-13.7-30.6-30.6c0-211-178.8-382.7-398.6-382.7c-219.8,0-398.6,171.7-398.6,382.7c0,16.9-13.7,30.6-30.6,30.6c-16.9,0-30.6-13.7-30.6-30.6c0-244.8,206.3-444,459.8-444c253.6,0,459.9,199.2,459.9,444C959.9,976.3,946.2,990,929.2,990z"/>
            <path className={style.button_transparent__path} d="M503.8,576.7c-156.2,0-283.3-127.1-283.3-283.3S347.6,10,503.8,10C660,10,787.1,137.1,787.1,293.3S660,576.7,503.8,576.7z M503.8,71.3c-122.4,0-222.1,99.6-222.1,222.1s99.6,222.1,222.1,222.1s222.1-99.6,222.1-222.1S626.2,71.3,503.8,71.3z"/>
          </g>
        </svg>
      }
      <span className={style.button_transparent__span}>{text}</span>
    </button>
  )
};

export default ButtonTransparent;