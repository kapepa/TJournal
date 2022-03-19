import type {NextPage} from 'next';
import Link from 'next/link'
import {useState} from "react";
import style from './nav.aside.module.scss';

const NavAside: NextPage = () => {
  const [link, setLing] = useState<string>('flame')
  return (
    <nav className={style.nav_aside}>
      <ul className={style.nav_aside__ul}>
        <li className={style.nav_aside__li}>
          <Link href="/">
            <a
              className={`flex align-items-center ${style.nav_aside__link} ${link === 'flame' ? style.nav_aside__link__active : ''}`}
              onClick={() => {setLing('flame')}}
            >
              <svg className={style.nav_aside__svg} height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 611.999 611.999" >
                <g>
                  <path className={style.nav_aside__path} d="M216.02,611.195c5.978,3.178,12.284-3.704,8.624-9.4c-19.866-30.919-38.678-82.947-8.706-149.952c49.982-111.737,80.396-169.609,80.396-169.609s16.177,67.536,60.029,127.585c42.205,57.793,65.306,130.478,28.064,191.029c-3.495,5.683,2.668,12.388,8.607,9.349c46.1-23.582,97.806-70.885,103.64-165.017c2.151-28.764-1.075-69.034-17.206-119.851c-20.741-64.406-46.239-94.459-60.992-107.365c-4.413-3.861-11.276-0.439-10.914,5.413c4.299,69.494-21.845,87.129-36.726,47.386c-5.943-15.874-9.409-43.33-9.409-76.766c0-55.665-16.15-112.967-51.755-159.531c-9.259-12.109-20.093-23.424-32.523-33.073c-4.5-3.494-11.023,0.018-10.611,5.7c2.734,37.736,0.257,145.885-94.624,275.089c-86.029,119.851-52.693,211.896-40.864,236.826C153.666,566.767,185.212,594.814,216.02,611.195z"/>
                </g>
              </svg>
              <span className={style.nav_aside__span}>Популярное</span>
            </a>
          </Link>
        </li>
        <li className={style.nav_aside__li}>
          <Link href="/">
            <a
              className={`flex align-items-center ${style.nav_aside__link} ${link === 'clock' ? style.nav_aside__link__active : ''}`}
              onClick={() => {setLing('clock')}}
            >
              <svg className={style.nav_aside__svg} height="24" width="24" version="1.1"  xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 471.999 501.999" >
                <g>
                  <path className={style.nav_aside__path} d="M244.5,0C109.3,0,0,109.3,0,244.5S109.3,489,244.5,489S489,379.8,489,244.5S379.8,0,244.5,0z M265.3,447.4V437c0-11.4-9.4-20.8-20.8-20.8s-20.8,9.4-20.8,20.8v10.4c-95.8-9.8-172.3-86.3-182-182H51c11.4,0,20.8-9.4,20.8-20.8s-9.4-20.8-20.8-20.8h-9.3c9.8-95.8,86.3-172.3,182-182V51c0,11.4,9.4,20.8,20.8,20.8s20.8-9.4,20.8-20.8v-9.3c95.8,9.8,172.3,86.3,182,182H437c-11.4,0-20.8,9.4-20.8,20.8s9.4,20.8,20.8,20.8h10.4C437.6,361.1,361.1,437.6,265.3,447.4z"/>
                  <path className={style.nav_aside__path} d="M244.5,124.9c-11.4,0-20.8,9.4-20.8,20.8v91.5L129,353.8c-7.3,9.4-5.2,21.8,3.1,29.1c11.6,8.5,23.9,2.1,28.1-3.1l101-122.8c2.1-3.1,4.2-7.3,4.2-12.5v-98.8C265.3,134.2,256,124.9,244.5,124.9z"/>
                </g>
              </svg>
              <span className={style.nav_aside__span}>Свежее</span>
            </a>
          </Link>
        </li>
        <li className={style.nav_aside__li}>
          <Link href="/">
            <a
              className={`flex align-items-center ${style.nav_aside__link} ${link === 'lightning' ? style.nav_aside__link__active : ''}`}
              onClick={() => {setLing('lightning')}}
            >
              <svg className={style.nav_aside__svg} height="24" width="24"  viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet"xmlns="http://www.w3.org/2000/svg">
                <path className={style.nav_aside__path} d="M10.52,34h-3a1,1,0,0,1-.88-1.44L12.55,21H6a1,1,0,0,1-.85-1.54l10.68-17A1,1,0,0,1,16.64,2H30.07a1,1,0,0,1,.77,1.69L21.78,14h5.38a1,1,0,0,1,.73,1.66l-16.63,18A1,1,0,0,1,10.52,34ZM9.18,32h.91L24.86,16H19.59a1,1,0,0,1-.77-1.69L27.88,4H17.19L7.77,19H14.2a1,1,0,0,1,.88,1.44Z"></path>
              </svg>
              <span className={style.nav_aside__span}>Рейтинг TJ</span>
            </a>
          </Link>
        </li>
        <li className={style.nav_aside__li}>
          <Link href="/">
            <a
              className={`flex align-items-center ${style.nav_aside__link}  ${link === 'document' ? style.nav_aside__link__active : ''}`}
              onClick={() => {setLing('document')}}
            >
              <svg className={style.nav_aside__svg} height="24" width="24" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                <path className={style.nav_aside__path} d="M23.93,2H8.07a2.8,2.8,0,0,0-2.8,2.8V27.2A2.8,2.8,0,0,0,8.07,30H23.93a2.8,2.8,0,0,0,2.8-2.8V4.8A2.8,2.8,0,0,0,23.93,2Zm.94,25.2a.94.94,0,0,1-.94.93H8.07a.94.94,0,0,1-.94-.93V4.8a.94.94,0,0,1,.94-.93H23.93a.94.94,0,0,1,.94.93Z"/>
                <path className={style.nav_aside__path} d="M21.83,10.4H10.17a.94.94,0,1,0,0,1.87H21.83a.94.94,0,1,0,0-1.87Z"/>
                <path className={style.nav_aside__path} d="M21.83,15.07H10.17a.93.93,0,1,0,0,1.86H21.83a.93.93,0,1,0,0-1.86Z"/>
                <path className={style.nav_aside__path} d="M21.83,19.73H10.17a.94.94,0,1,0,0,1.87H21.83a.94.94,0,1,0,0-1.87Z"/>
              </svg>
              <span className={style.nav_aside__span}>Популярное</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default NavAside;