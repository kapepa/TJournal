import React, {FC, useRef} from "react";
import style from './style.module.scss';
import ZoomImage from "../zoom.image";

interface IZoomSlider {
  images: string[],
}

const ZoomSlider: FC<IZoomSlider> = ({images}) => {
  const classRef = useRef<string>();
  const picture = images.length < 5 ? images.slice(1) : images.slice(1,4) ;

  switch (picture.length){
    case 2 : classRef.current = style.zoom_slider__two; break;
    case 3 : classRef.current = style.zoom_slider__three; break;
    case 4 : classRef.current = style.zoom_slider__four; break;
    default : classRef.current = '';
  }

  return (
    <div className={`${style.zoom_slider} ${classRef.current}`}>
      {picture.map((el, i) => <ZoomImage key={`slider-${i}`} classes={`${style.zoom_slider__picture}`} image={el} alt='image'/>)}
    </div>
  )
}

export default ZoomSlider;