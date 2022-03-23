import React, {FC} from "react";
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
  const iconBtn = (type: string) => {
    let icon;
    switch (type){
      case 'anchor': icon = style.button_line__anchor
        break;
      case 'image': icon = style.button_line__image
        break;
    }
    return icon;
  }

  return (
    <button
      className={`${style.button_line} ${classes ? classes : ''} ${iconBtn(type)}`}
      onClick={cb}
    >{text}</button>
  )
}

export default ButtonLine;