import React, {FC, useRef} from "react";
import style from './style.module.scss';
import ButtonDefault from "../button.default";
import {IFile} from "../../dto/file";

interface ICover {
  classes?: string,
  cover?: string
  cb: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement >) => void ;
}

const Cover: FC<ICover> = ({classes, cb}) => {

  return (
    <div className={`flex justify-content-center ${style.cover} ${classes ? classes : ''}`}>
      <ButtonDefault text='Добавить обложку' cb={cb} type='def' />
    </div>
  )
};

export default Cover