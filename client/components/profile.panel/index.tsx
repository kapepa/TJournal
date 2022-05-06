import React, {FC, useContext, useRef, useState} from "react";
import Link from 'next/link';
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import style from './style.module.scss';
import ButtonSocial from "../button.social";
import ButtonDefault from "../button.default";
import {IFile} from "../../dto/file";
import AvatarUpload from "../avatar.upload";
import {changeIconUser} from "../../redux/user/userAction";
import {useRouter} from "next/router";
import {setProfile} from "../../redux/user/userSlice";
import config from "../../config";
import Cover from "../cover";
import Axios from "../../helpers/axios";
import SocketIO from "../../helpers/socket.io";
import {DataContext} from "../../layout/layout.default";

interface IState{
  file: IFile,
  icon: IFile
}

interface IProfilePanel {
  query: string | undefined,
}

const ProfilePanel: FC<IProfilePanel> = ({query,}) => {
  const { socket } = useContext(DataContext);
  const router = useRouter();
  const user = useSelector(( store: any ) => store.user);
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const data = new Date(user.created_at);
  const [nav, setNav] = useState<string | undefined>(query);
  const [state, setState] = useState<IState>({file: {}} as IState);
  const loadCover = (file: IFile) => setState({...state, file});
  const loadIcon = (icon: IFile) => setState({...state, icon});
  const urlConfig = (user.cover && /http/.test(user.cover)) ? user.cover : `${config.url}/${user.cover}`
  const currentUrl = state.file?.reader ?? urlConfig;
  const day = data.getDate();
  const manth = data.getMonth() + 1;
  const year = data.getFullYear();

  const clickAdd = () => {
    const input = (fileRef.current as HTMLInputElement);
    input.click();
    input.onchange = (e): void => {
      const readerFile = new FileReader();
      const input = (fileRef.current as HTMLInputElement);
      const file = {...input.files}[0]
      readerFile.readAsDataURL(file);
      readerFile.onload = function(e) {;
        loadCover({cover: file, reader: readerFile.result});
      }
    }
  }

  const changeAvatar = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.stopPropagation();
    const btn = e.currentTarget.dataset.btn;
    if(!btn) return;
    const form = new FormData();
    if(btn === 'avatar' && state.icon.cover) {
      form.append('file',  state.icon.cover);
      loadIcon({cover: null, reader: null});
    }
    if(btn === 'cover' && state.file.cover) {
      form.append('file',  state.file.cover);
      loadCover({cover: null, reader: null});
    }
    dispatch(changeIconUser(form, btn));
  }

  const exitProfile = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    Cookies.remove('token');
    Axios.defaults.headers.common = {'Authorization': ``};
    await router.push('/home');
    dispatch(setProfile({}))
    socket.emit('exit');
  }

  const cleanCover = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => loadCover({cover: null, reader: null})

  return (
    <>
      {(!(state?.file?.reader && state?.file?.cover) && !user.cover) && <Cover cb={clickAdd}/>}
      <input ref={fileRef} name='сover' type='file' className={style.profile_panel__file}/>
      <div className={style.profile_panel}>
        <div className={`flex ${style.profile_panel__frame}`}>
          <div className={`flex flex-direction-column ${ state.file?.reader || user.cover ? style.profile_panel__head_frame : ''}`}>
            { (state.file?.reader || user.cover ) &&
              <div className={`${style.profile_panel__cover_frame}`}>
                <div className={`flex justify-content-center align-items-center ${style.profile_panel__cover_btn}`}>
                  { state.file.cover ?
                    <ButtonDefault text='Установить обложку' type='def' cb={changeAvatar} data={'cover'} />:
                    <ButtonDefault text='Сменить обложку' type='def' cb={clickAdd} data={'cover'} />
                  }
                  <ButtonDefault text='Удалить' type='def' cb={cleanCover} />
                </div>
                <img className={`${style.profile_panel__cover_img}`} src={String(currentUrl)} alt='image cover' />
              </div>
            }
            <AvatarUpload user={user} icon={state.icon} loadIcon={loadIcon} cb={changeAvatar}/>
            <div className={`${style.profile_panel__fullname}`}>
              <span className={`${style.profile_panel__name}`}>{user.name}</span>
            </div>
            <div className={`flex ${style.profile_panel__action} ${state.file?.reader ? style.profile_panel__action__image : ''}`}>
              <ButtonSocial icon='settings' size='fourty' cb={() => {}} link='/setting' />
              <ButtonDefault text='Выйти' type='blue' cb={exitProfile}/>
            </div>
            <Link href='/setting'>
              <a className={`${style.profile_panel__describe}`}>Изменить описание</a>
            </Link>
            <div className={`${style.profile_panel__subs}`}>{user.subs} подписчик</div>
            <div>
              {`На проекте ${day < 10 ? '0'+day : day }/${manth < 10 ? '0'+manth : manth }/${year}`}
            </div>
          </div>
        </div>
        <nav className={`flex ${style.profile_panel__nav}`}>
          <Link href={`/profile?nav=article`}><a
            className={`flex align-items-center ${nav === "undefined" || nav === 'article' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
            onClick={(e) => {
              setNav('article');
            }}
          >Статьи</a></Link>
          <Link href={`/profile?nav=comment`}><a
            className={`flex align-items-center ${nav === 'comment' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
            onClick={(e) => {
              setNav('comment');
            }}
          >Комментарии</a></Link>
          <Link href={`/profile?nav=drafts`}><a
            className={`flex align-items-center ${nav === 'drafts' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
            onClick={(e) => {
              setNav('drafts')
            }}
          >Черновики</a></Link>
          <Link href={`/profile?nav=donations`}><a
            className={`flex align-items-center ${nav === 'donations' ? style.profile_panel__link__active : ''} ${style.profile_panel__link}`}
            onClick={(e) => {
              setNav('donations')
            }}
          >Донаты</a></Link>
        </nav>
      </div>
    </>
  )
};

export default ProfilePanel;