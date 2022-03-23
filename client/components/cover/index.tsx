import React, {FC, useEffect, useRef, useState} from "react";
import style from './style.module.scss';
import ButtonDefault from "../button.default";
import {IFile} from "../../dto/file";

interface ICover {
  classes?: string,
  cover?: string
  cb: (data: IFile) => void ;
}

const Cover: FC<ICover> = ({classes, cb}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<IFile>({} as IFile);

  const clickAdd = () => {
    const input = (fileRef.current as HTMLInputElement);
    input.click();
    input.onchange = (e): void => {
      const readerFile = new FileReader();
      const input = (fileRef.current as HTMLInputElement);
      const file = {...input.files}[0]
      readerFile.readAsDataURL(file);
      readerFile.onload = function(e) {
        setFile({cover: file, reader: readerFile.result});
        cb({cover: file, reader: readerFile.result})
      }
    }
  }

  return (
    <div className={`flex justify-content-center ${style.cover} ${classes ? classes : ''}`}>
      <ButtonDefault text='Добавить обложку' cb={clickAdd} type='def' />
      <input ref={fileRef} name='file' type='file' className={style.cover__file}/>
    </div>
  )
};

export default Cover