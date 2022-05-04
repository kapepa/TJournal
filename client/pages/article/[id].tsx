import {NextPage} from "next";
import style from './style.module.scss';
import LayoutDefault, {DataContext} from "../../layout/layout.default";
import ServerSideProps from "../../side.props/server.side";
import {IQuery} from "../../dto/query";
import News from "../../components/news";
import Chat from "../../components/chat";
import React, {useContext, useEffect} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

interface IArticlePage {
  query: IQuery,
}

const Article: NextPage<IArticlePage> = ({query}) => {
  const { detailed } = useSelector(( store: any ) => store.article);
  const router = useRouter();

  useEffect(() =>{
    if(window && !detailed.id) router.push('/home');
  },[])

  return (
    <LayoutDefault title={'Article'} query={query}>
      <section className={`${style.article}`}>
        <News article={detailed} />
        <Chat article={detailed} />
      </section>
    </LayoutDefault>
  )
}

export const getServerSideProps = ServerSideProps;

export default Article;