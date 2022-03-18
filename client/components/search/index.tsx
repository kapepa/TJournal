import type { NextPage } from 'next';
import style from './search.module.scss';

const Search: NextPage = () => {
  return (
    <label className={style.search__label} >
      <input className={style.search__input} name='search' type='text' placeholder='Поиск'/>
    </label>
  )
};

export default Search;