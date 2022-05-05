import React, {FC, useRef} from 'react';
import Link from 'next/link'
import style from './style.module.scss';
import config from "../../config";
import {useSelector} from "react-redux";

enum ESize {
  fourty,
  thirty,
}

enum IType {
  circle,
  square,
}

interface IAvatar{
  size?: keyof typeof ESize,
  type?: keyof typeof IType,
  image?: string,
  name: string,
  path?: string,
  userId?: string,
}

const Avatar: FC<IAvatar> = ({ size, image, name, path, type, userId }) => {
  const online = useSelector(( store: any ) => store.online);
  const sizeImageRef = useRef<string>();
  const viewRef = useRef<string>();
  const symbol = name.charAt(0).toUpperCase();
  const urlConfig = (image && /http/.test(image)) ? image : `${config.url}/${image}`

  switch (type){
    case "circle": viewRef.current = style.avatar__circle; break;
    case "square": viewRef.current = style.avatar__square; break;
    default: viewRef.current = style.avatar__square; break;
  }

  switch (size){
    case 'thirty': sizeImageRef.current = style.avatar__thirty; break;
    default: sizeImageRef.current = style.avatar__fourty
  }

  return (
    <>
      {path
        ? <Link href={path}>
          <a className={`flex justify-content-center align-items-center ${style.avatar} ${sizeImageRef.current} ${image ? '' : style.avatar__color}`}>
            {online.includes(userId) && <div className={style.avatar__online} />}
            {image ?
              <img
                className={`${style.avatar__image} ${viewRef.current} ${type}`}
                src={urlConfig}
                alt='avatar'
              /> :
              <span
                className={`${style.avatar__symbol}`}
              >{symbol}</span>
            }
          </a>
        </Link>
        : <div className={`flex justify-content-center align-items-center ${style.avatar} ${sizeImageRef.current} ${image ? '' : style.avatar__color}`}>
          {online.includes(userId) && <div className={style.avatar__online} />}
          {image ?
            <img className={`${style.avatar__image} ${viewRef.current} ${type}`} src={urlConfig} alt='avatar'/> :
            <span className={`${style.avatar__symbol}`}>{symbol}</span>
          }
        </div>
      }
    </>
  )
}

export default Avatar;