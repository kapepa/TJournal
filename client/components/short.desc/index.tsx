import React, {FC, useContext, useState} from 'react';
import Link from 'next/link';
import {IListNews} from "../../dto/news";
import style from './style.module.scss';
import {LoadingList} from "../../helpers/request";
import {DataContext} from "../../layout/layout.default";

const ShortDesc: FC = () => {
  const { short } = useContext(DataContext);
  const [state, setState] = useState(short);
  const clickLoad = () => {
    state && LoadingList(state.length).then(short => setState([...state, ...short]));
  }

  return (
    <div className={`flex flex-direction-column ${style.short_desc}`}>
      <div className={`flex flex-direction-column`}>
        {state?.map((el, i) => (
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