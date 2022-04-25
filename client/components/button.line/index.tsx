import React, {FC, useRef} from "react";
import style from './style.module.scss';

enum BtnStyle {
  anchor,
  image,
}

interface IButtonLine{
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void,
  text: string,
  classes?: string,
  type: keyof typeof BtnStyle
}

const ButtonLine: FC<IButtonLine> = ({text, cb, classes, type}) => {
  const iconRef = useRef<string>()

  switch (type){
    case 'anchor': iconRef.current = style.button_line__anchor; break;
    case 'image': iconRef.current = style.button_line__image; break;
  }

  return (
    <button
      className={`${style.button_line} ${classes ? classes : ''} ${iconRef.current}`}
      onClick={cb}
    >{text}</button>
  )
}

export default ButtonLine;