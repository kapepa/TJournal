import {NextPage} from "next";
import style from './style.module.scss';
import LayoutDefault from "../../layout/layout.default";
import ArticleProps from "../../side.props/article.props";
import {IQuery} from "../../dto/query";
import {IUser} from "../../dto/user";
import {IArticle} from "../../dto/news";
import News from "../../components/news";

interface IArticlePage {
  query: IQuery,
  user: IUser,
  article: IArticle,
}

const Article: NextPage<IArticlePage> = ({query, user, article}) => {
  return (
    <LayoutDefault title={'Article'} query={query} user={user}>
      <section className={`${style.article}`}>
        <News article={article}/>
      </section>
    </LayoutDefault>
  )
}

export const getServerSideProps = ArticleProps;

export default Article;