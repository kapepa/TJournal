import type {NextPage} from "next";
import React from "react";
import style from "./button.xclose.module.scss";

interface IButtonXclose{
  classes: string,
  cd: (e: React.MouseEvent<HTMLDivElement>) => void,
}

const ButtonXClose: NextPage<IButtonXclose> = ({ cd, classes }) => {
  return (
    <div
      className={`${style.x_close} ${classes ? classes : ''}`}
      onClick={cd}
    />
  )
}

export default ButtonXClose;