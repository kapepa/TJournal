import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {IListNews} from "../../dto/news";
import {articleShort} from "../../redux/article/articleAction";
import {IUser} from "../../dto/user";
import {DataContext} from "../../layout/layout.default";

interface IShortDesc {
  user: IUser,
}

const ShortDesc: FC<IShortDesc> = ({user}) => {
  const dispatch = useDispatch();
  const { wrong } = useContext(DataContext);
  const { short } = useSelector(( store: any ) => store.article);
  const [state, setState] = useState(short);
  const [disabled, setDisabled] = useState<boolean>(false);
  const clickLoad = () => {
    dispatch(articleShort(state.length));
    short.length === state.length && setDisabled(true);
  }

  const checkAuth = (e: React.MouseEvent<HTMLAnchorElement>):void => {
    if(!Boolean(Object.keys(user).length)){
      e.preventDefault();
      wrong('Auth');
    }
  }

  useEffect(() => {
    if(state.length !== short.length) setState(short);
  },[short.length])

  return (
    <div className={`flex flex-direction-column ${style.short_desc}`}>
      <div className={`flex flex-direction-column`}>
        {state?.map((el: IListNews, i: number) => (
          <div key={`desc-${i}`}>
            <Link href={`/article/${el.id}`}>
              <a
                onClick={checkAuth}
                className={`${style.short_desc__link}`}
              >{el.title} <span className={`${style.short_desc__message}`}>{el.comments}</span></a>
            </Link>
          </div>
        ))}
      </div>
      <div className={`${style.short_desc__footer}`}>
        <button
          disabled={disabled}
          onClick={clickLoad}
          className={`${style.short_desc__btn} ${disabled ? style.short_desc__disabled : ''}`}
        >Показать ещё</button>
      </div>
    </div>
  )
}

export default ShortDesc;