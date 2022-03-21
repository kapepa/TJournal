import React, { FC, useState, useRef } from 'react';
import style from './style.module.scss';

interface ISearch {
  classes?: string,
}

const Search: FC<ISearch> = ({classes}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [trigger, setTrigger] = useState<Boolean>(false);
  const clickSearch = (e: React.MouseEvent<HTMLDivElement>) => {
    trigger ? setTrigger(false) : setTrigger(true);
    setTimeout(() => {if(inputRef.current) inputRef.current.focus()},0);
  };

  return (
    <>
      <div className={`${style.search__btn} ${classes ? classes : ''}`} onClick={clickSearch} />
      <div className={`${style.search__wrapper} ${trigger ? style.search__wrapper__active : '' }`}>
        <label className={`${style.search__label} ${classes ? classes : ''}`} >
          <input ref={inputRef} className={style.search__input} name='search' type='text' placeholder='Поиск'/>
        </label>
      </div>
    </>
  )
};

export default Search;