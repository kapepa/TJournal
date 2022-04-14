import React, {FC, useRef} from "react";
import style from './style.module.scss';
import {IUser} from "../../dto/user";
import {IFile} from "../../dto/file";
import ButtonDefault from "../button.default";
import config from "../../config";

interface IAvatarUpload {
  user: IUser
  icon: IFile
  loadIcon: (obj: IFile) => void
  cb: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

const AvatarUpload: FC<IAvatarUpload> = ({user, icon,loadIcon, cb}) => {
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
  };

  const avatarImge = () => {
    if (icon?.reader) return icon?.reader;
    if (user?.avatar) return (user.avatar && /http/.test(user.avatar)) ? user.avatar : `${config.url}/${user.avatar}`;
    if (icon?.cover) return icon?.cover;
    return false;
  }

  const currentUrl = avatarImge();

  return (
    <div
      onClick={clickAvatar}
      className={`${style.avatar_upload} ${ icon?.reader ? style.avatar_upload__save : ''}`}
    >
      { currentUrl && <img src={String(currentUrl)}  alt='avatar' className={style.avatar_upload__same}/>}
      { !currentUrl &&
        <div className={`flex justify-content-center align-items-center ${style.avatar_upload__same} ${style.avatar_upload__icon}`}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      }
      <input ref={fileRef} name='avatar' type='file' className={style.avatar_upload__input_file} />
      <ButtonDefault text='Cохранить' type='blue' classes={`${style.avatar_upload__btn}`} cb={cb} data={'avatar'} />
    </div>
  )
};

export default AvatarUpload;