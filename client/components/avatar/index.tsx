import React, {FC} from 'react';
import Link from 'next/link'
import style from './style.module.scss';
import config from "../../config";

enum ESize {
  fourty,
}

interface IAvatar{
  size?: keyof typeof ESize,
  image?: string,
  name: string,
  path?: string,
}

const Avatar: FC<IAvatar> = ({ size, image, name, path }) => {
  let sizeImage;
  const symbol = name.charAt(0);
  const urlConfig = (image && /http/.test(image)) ? image : `${config.url}/${image}`

  switch (size){
    default: sizeImage = style.avatar__fourty
  }

  return (
    <>
      {path ?
        <Link href={path}>
          <a className={`flex justify-content-center align-items-center ${style.avatar} ${sizeImage}`}>
            {image ?
              <img className={`${style.avatar__image}`} src={urlConfig} alt='avatar'/> :
              <span className={`${style.avatar__symbol}`}>{symbol}</span>
            }
          </a>
        </Link>:
        <div className={`flex justify-content-center align-items-center ${style.avatar} ${sizeImage}`}>
          {image ?
            <img className={`${style.avatar__image}`} src={urlConfig} alt='avatar'/> :
            <span className={`${style.avatar__symbol}`}>{symbol}</span>
          }
        </div>
      }
    </>
  )
}

export default Avatar;