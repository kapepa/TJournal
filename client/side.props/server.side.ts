import {wrapper} from "../redux/store";
import {getCookies} from "cookies-next";
import { RequestServer } from "../helpers/request.server";
import {GetServerSideProps} from "next";
import {IUser} from "../dto/user";
import {IArticle} from "../dto/news";

const homeRedirect = () => { return { redirect: { permanent: false, destination: "/home" } } } ;

const ServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({resolvedUrl, params, query, req}) => {
  const data = {} as { user: IUser, article: IArticle, query: boolean };
  const regist = query.registration;
  const token = getCookies({req}).token;
  const page = resolvedUrl.split('/')[1];
  const request = token ? RequestServer(token, store.dispatch) : false;

  if(!store.getState().user.id && request) {
    await request.Profile();
    data.user = store.getState().user || {};
  }

  if(page === 'article' && params && request) {
    await request.Article(String(params.id));
    data.article = store.getState().article || {};
  }

  if(page === 'home' && request) {
    data.article = await request.AllArticle() || {};
  }

  data.query = regist === 'true' ? Boolean(regist) : false;

  // if(!profile.id) return { redirect: { permanent: false, destination: "/setting" } };

  return {
    props: {
      ...data,
      listNews: [
        {
          _id: 'asdasdas12312asdasdartysdas',
          title: 'Фото: Перфоманс в Петербурге, где активистка облила себя красной краской, протестуя против действий России на Украине',
          comments: 1,
        },{
          _id: 'asda3423as123123123dsrtyda2',
          title: 'ЦБ, «Сбера» и «Лаборатории Касперского» исключили из международного сообщества по борьбе с кибератаками',
          comments: 4,
        },{
          _id: 'as4234423asdsadasda1hhk2312',
          title: 'Сайт и страницы Невзорова во «ВКонтакте» и «Дзене» заблокировали после возбуждения дела о «фейках»',
          comments: 6,
        },{
          _id: 'as4234423as12312casdashazxc',
          title: 'Швейцарская компания Zurich Insurance отказалась от логотипа Z в соцсетях — это символ российской армии',
          comments: 2,
        }
      ],
    },
  };
});

export default ServerSideProps;