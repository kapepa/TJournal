import type { NextPage } from 'next';
import LayoutDefault from "../../layout/layout.default";
import ServerSideProps from "../../side.props/server.side";
import {IQuery} from "../../dto/query";
import {IUser} from "../../dto/user";
import {IArticle, IListNews} from "../../dto/news";
import style from './style.module.scss';
import ShortDesc from "../../components/short.desc";
import ShortNews from "../../components/short.news";

interface IHomePage {
  article: IArticle[]
  query: IQuery,
  user: IUser,
  listNews: IListNews[],
}

const Home: NextPage<IHomePage> = ({query, user}) => {
  return (
    <LayoutDefault title="Home" user={user} query={query}>
      <div className={`flex flex-direction-column ${style.home}`}>
        <ShortDesc />
        {/*{article.map((art: IArticle, i: number) => (<ShortNews key={`article-${i}`} article={art} />))}*/}
      </div>
    </LayoutDefault>
  )
};

export const getServerSideProps = ServerSideProps;

export default Home;
