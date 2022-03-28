import React, {FC} from "react";
import style from './style.module.scss';
import ZoomImage from "../zoom.image";

interface IZoomSlider {
  images: string[],
}

const ZoomSlider: FC<IZoomSlider> = ({images}) => {
  const picture = images.length < 5 ? images.slice(1) : images.slice(1,4) ;
  const computerClass = (num: number) => {
    let css;
    switch (num){
      case 2 : css = style.zoom_slider__two; break;
      case 3 : css = style.zoom_slider__three; break;
      case 4 : css = style.zoom_slider__four; break;
      default : css = ''
    }
    return css;
  }

  return (
    <div className={`${style.zoom_slider} ${computerClass(picture.length)}`}>
      {picture.map((el, i) => <ZoomImage key={`slider-${i}`} classes={`${style.zoom_slider__picture}`} image={el} alt='image'/>)}
    </div>
  )
}

export default ZoomSlider;