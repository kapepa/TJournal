import React, {FC, useState, useRef, useEffect} from 'react';
import style from './style.module.scss';
import {articleAll} from "../../redux/article/articleAction";
import {useDispatch} from "react-redux";
import {cleanerArticle} from "../../redux/article/articleSlice";
import {useRouter} from "next/router";

interface ISearch {
  classes?: string,
}

const Search: FC<ISearch> = ({classes}) => {
  const dispatch = useDispatch();
  const { push, query } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<any>();
  const [trigger, setTrigger] = useState<Boolean>(false);
  const clickSearch = (e: React.MouseEvent<HTMLDivElement>) => {
    trigger ? setTrigger(false) : setTrigger(true);
    setTimeout(() => {if(inputRef.current) inputRef.current.focus()},0);
  };

  const searchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const { word, ...other } = query;
      const calcQuery = Boolean(val) ? {...query, word: val} : other;
      const nav = query.nav ? String(query.nav) : 'all';

      push({query: calcQuery});
      dispatch(cleanerArticle([]));
      dispatch(articleAll(0, nav, val));
    },2000)
  }

  const searchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {

  }

  useEffect(() => {
    if(query.word && inputRef.current) inputRef.current.value = String(query.word);
  },[])

  return (
    <>
      <div className={`${style.search__btn} ${classes ? classes : ''}`} onClick={clickSearch} />
      <div className={`${style.search__wrapper} ${trigger ? style.search__wrapper__active : '' }`}>
        <label className={`${style.search__label} ${classes ? classes : ''}`} >
          <input
            onInput={searchInput}
            onKeyPress={searchEnter}
            ref={inputRef}
            className={style.search__input}
            name='search'
            type='text'
            placeholder='Поиск'
          />
        </label>
      </div>
    </>
  )
};

export default Search;