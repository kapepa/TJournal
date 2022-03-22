import React, {FC, useEffect, useRef, useState} from "react";
import style from './style.module.scss';
import ButtonDefault from "../button.default";

interface ICover {
  classes?: string,
  cover?: string
}

interface IFile{
  cover: File,
  reader: any
}

const Cover: FC<ICover> = ({classes, cover}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<IFile>({} as IFile);

  const clickAdd = () => {
    const input = (fileRef.current as HTMLInputElement);
    input.click();
    input.onchange = (e): void => {
      const readerFile = new FileReader();
      const input = (fileRef.current as HTMLInputElement);
      const file = input.files[0]

      readerFile.readAsText(file);

      readerFile.onload = function(e) {
        console.log(readerFile.result)
      }


      // readerFile.readAsText(new Blob([file], ));
      //
      // readerFile.onload = function(e) {
      //   // imageRef.current.src = reader.result;
      //
      //   console.log(readerFile.result)
      // }


      // const file = {...input.files}[0];
      // reader.readAsDataURL(file);;
      // reader.onload = function() {
      //   // setFile({cover: file, reader: reader.result});
      //   // const img = (imageRef.current as HTMLImageElement)
      //   // img.src = `data:image` + reader.result
      //   imageRef.current.src = reader.result
      //   console.log(reader.result)
      // };
    }
  }

  // useEffect(() => {
  //   if(window){
  //     const readerFile = new FileReader();
  //     readerFile.readAsText(file.cover);
  //     readerFile.onload = function() {
  //       console.log(readerFile.result)
  //     }
  //   }
  // },[file])

  // useEffect(() => {
  //   if(file) console.log(file)
  // },[file])

  return (
    <div className={`flex justify-content-center ${style.cover} ${classes ? classes : ''}`}>
      <ButtonDefault text='Добавить обложку' cb={clickAdd} type='def' />
      <input ref={fileRef} name='file' type='file' className={style.cover__file}/>
      <img ref={imageRef} className={`${style.cover__image}`} alt='cover'/>
    </div>
  )
};

export default Cover