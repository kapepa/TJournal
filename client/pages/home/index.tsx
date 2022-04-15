import type { NextPage } from 'next';
import LayoutDefault from "../../layout/layout.default";
import ServerSideProps from "../../side.props/server.side";
import {IQuery} from "../../dto/query";
import {IArticle, IListNews} from "../../dto/news";
import style from './style.module.scss';
import ShortDesc from "../../components/short.desc";
import ShortNews from "../../components/short.news";
import {useSelector} from "react-redux";

interface IHomePage {
  query: IQuery,
}

const Home: NextPage<IHomePage> = ({query}) => {
  const { all } = useSelector(( store: any ) => store.article);
  const profile = useSelector(( store: any ) => store.user);
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
