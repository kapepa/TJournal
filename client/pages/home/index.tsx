import type { NextPage } from 'next';
import LayoutDefault from "../../layout/layout.default";
import ServerSideProps from "../../side.props/server.side";
import {IQuery} from "../../dto/query";
import {IArticle, IListNews} from "../../dto/news";
import style from './style.module.scss';
import ShortDesc from "../../components/short.desc";
import ShortNews from "../../components/short.news";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {articleAll} from "../../redux/article/articleAction";

interface IHomePage {
  query: IQuery,
}

const Home: NextPage<IHomePage> = ({query}) => {
  const dispatch = useDispatch();
  const { all } = useSelector(( store: any ) => store.article);
  const profile = useSelector(( store: any ) => store.user);
  const refScroll = useRef<number>(0);

  const scrollLoad = (e: Event) => {
    const postion = window.scrollY;
    if(postion >= refScroll.current){
      const screenHeight = document.body.clientHeight;
      const fullHeight = document.body.scrollHeight;
      refScroll.current = fullHeight - screenHeight;
    }

    if(postion >= refScroll.current && refScroll.current !== 0) dispatch(articleAll(all.length));
  }

  useEffect(() => {
    if(window) window.addEventListener('scroll', scrollLoad);
    return () => window.removeEventListener('scroll', scrollLoad);
  },[])

  return (
    <LayoutDefault title="Home" query={query}>
      <div className={`flex flex-direction-column ${style.home}`}>
        <ShortDesc />
        {all.map((art: IArticle, i: number) => (<ShortNews key={`article-${i}`} article={art} user={profile} />))}
      </div>
    </LayoutDefault>
  )
};

export const getServerSideProps = ServerSideProps;

export default Home;
