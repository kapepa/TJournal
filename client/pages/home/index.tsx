import type { NextPage } from 'next';
import LayoutDefault from "../../layout/layout.default";
import HomeProps from "../../side.props/home.props";
import {IQuery} from "../../dto/query";
import {IUser} from "../../dto/user";
import {IListNews} from "../../dto/news";
import style from './style.module.scss';
import ShortDesc from "../../components/short.desc";

interface IHomePage {
  query: IQuery,
  user: IUser,
  listNews: IListNews[],
}

const Home: NextPage<IHomePage> = ({query, user, listNews}) => {
  return (
    <LayoutDefault title="Home" user={user} query={query}>
      <div className={`flex flex-direction-column ${style.home}`}>
        <ShortDesc list={listNews} />
      </div>
    </LayoutDefault>
  )
};

export const getServerSideProps = HomeProps;

export default Home;
