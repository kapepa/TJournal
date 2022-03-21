import React, {FC} from "react";
import style from "./style.module.scss";

interface IButtonXclose{
  classes: string,
  cd: (e: React.MouseEvent<HTMLDivElement>) => void,
}

const ButtonXClose: FC<IButtonXclose> = ({ cd, classes }) => {
  return (
    <div
      className={`${style.x_close} ${classes ? classes : ''}`}
      onClick={cd}
    />
  )
}

export default ButtonXClose;