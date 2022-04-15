import {NextPage} from "next";
import style from './style.module.scss';
import LayoutDefault from "../../layout/layout.default";
import ServerSideProps from "../../side.props/server.side";
import {IQuery} from "../../dto/query";
import News from "../../components/news";
import Chat from "../../components/chat";
import React from "react";

interface IArticlePage {
  query: IQuery,
}

const Article: NextPage<IArticlePage> = ({query}) => {
  return (
    <LayoutDefault title={'Article'} query={query}>
      <section className={`${style.article}`}>
        <News />
        <Chat />
      </section>
    </LayoutDefault>
  )
}

export const getServerSideProps = ServerSideProps;

export default Article;