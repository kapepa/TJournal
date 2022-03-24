import React, {FC, useRef} from "react";
import style from './style.module.scss';
import {IUser} from "../../dto/user";
import {IFile} from "../../dto/file";

interface IAvatarUpload {
  user: IUser
  icon: IFile
  loadIcon: (obj: IFile) => void
}

const AvatarUpload: FC<IAvatarUpload> = ({user, icon,loadIcon}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const clickAvatar = (e: React.MouseEvent<HTMLDivElement>) => {
    const reader = new FileReader();
    const input = (fileRef.current as HTMLInputElement);
    input.click();
    input.onchange = () => {
      const file = input.files && input.files[0];
      if(file) reader.readAsDataURL(file);
      reader.onload = function() {
        loadIcon({
          cover: file,
          reader: reader.result,
        });
      };
    }
  }

  return (
    <>
      { icon?.reader && <img src={String(icon.reader)}  alt='avatar' className={style.avatar_upload__same}/>}
      { !icon &&
        <div onClick={clickAvatar} className={`flex justify-content-center align-items-center ${style.avatar_upload__same} ${style.avatar_upload__icon}`}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      }
      <input ref={fileRef} name='file' type='file' className={style.avatar_upload__input_file} />
    </>
  )
};

export default AvatarUpload;