import { createContext } from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/home.module.css';
import LayoutDefault from "../../layout/layout.default";
import HomeProps from "../../side.props/home.props";
import {IQuery} from "../../dto/query";
import {IUser} from "../../dto/user";

interface INextPage {
  query: IQuery,
  user: IUser,
}

const Home: NextPage<INextPage> = ({query, user}) => {
  return (
    <LayoutDefault title="Home" user={user} query={query}>
      <div>Home</div>
    </LayoutDefault>
  )
}

export const getServerSideProps = HomeProps;

export default Home;
