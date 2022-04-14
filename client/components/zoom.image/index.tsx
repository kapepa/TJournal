import React, {FC, useEffect, useState} from "react";
import style from './style.module.scss';
import config from "../../config";

interface IZoomImage {
  image: string,
  classes?: string,
  alt: string,
}

const ZoomImage: FC<IZoomImage> = ({ image,classes, alt }) => {
  const [state, setState] = useState<boolean>(false)
  const clickZoom = (e: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => {
    state ? setState(false) : setState(true);
  }

  const wheelMove = () => {if(!state) setState(false)}

  useEffect(() => {
    window.addEventListener('wheel', wheelMove)
    return () => window.removeEventListener('wheel', wheelMove);
  },[]);


  return (
    <>
      { state &&
        <div
          className={`${style.zoom_image} ${style.zoom_image__deploy}`}
          onClick={clickZoom}
        >
          <img src={`${config.url}/${image}`} className={`${style.zoom_image__picture} ${classes ? classes : ''}`} alt={alt} />
        </div>
      }
      <img onClick={clickZoom} src={`${config.url}/${image}`} className={`${style.zoom_image__picture} ${classes ? classes : ''}`} alt={alt} />
    </>
  )
}

export default ZoomImage