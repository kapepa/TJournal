import React, {FC, useState} from 'react';
import Link from 'next/link';
import {IListNews} from "../../dto/news";
import style from './style.module.scss';
import {LoadingList} from "../../helpers/request";

interface IShortDesc {
  list: IListNews[],
}

const ShortDesc: FC<IShortDesc> = ({list}) => {
  const [state, setState] = useState(list);
  const clickLoad = () => {
    LoadingList(state.length).then(list => setState([...state, ...list]));
  }
  console.log()
  return (
    <div className={`flex flex-direction-column ${style.short_desc}`}>
      <div className={`flex flex-direction-column`}>
        {state.map((el, i) => (
          <Link href={`/article/${el.id}`} key={`desc-${i}`}>
            <a className={`${style.short_desc__link}`} >{el.title} <span className={`${style.short_desc__message}`}>{el.comments}</span></a>
          </Link>
        ))}
      </div>
      <div className={`${style.short_desc__footer}`}>
        <button onClick={clickLoad} className={`${style.short_desc__btn}`}>Показать ещё</button>
      </div>
    </div>
  )
}

export default ShortDesc;