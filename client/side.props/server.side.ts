import {wrapper} from "../redux/store";
import {getCookies} from "cookies-next";
import RequestServer from "../helpers/request.server";
import {GetServerSideProps} from "next";

const ServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({params, query, req}) => {
  const regist = query.registration;
  const token = getCookies({req}).token;
  const request = RequestServer(token, store.dispatch);

  if(!store.getState().user.id) await request.Profile();

  return {
    props: {
      query: {
        registration: regist === 'true' ? Boolean(regist) : false,
      },
      user: store.getState().user,
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
      article:{
        _id: 'asdasdas12312asdasdartysdas',
        title: 'Фото: Перфоманс в Петербурге, где активистка облила себя красной краской, протестуя против действий России на Украине',
        comments: 1,
        shortDesc: 'Её задержали после скандирований фразы «Сердце кровью обливается».',
        text: '27 марта на ступени здания Городской думы в Петербурге поднялась девушка в белом и облила себя красной краской в знак протеста против «военной спецоперации» России на Украине, сообщает «Фонтанка». Очевидцы рассказали корреспонденту издания, что это автор городского телеграм-канала «Добрососедство Коломны» Евгения Исаева. Под ногами она расстелила плакат, где написано: «Я чувствую, что бесполезно призывать к разуму, поэтому обращаюсь к вашим сердцам». По данным телеграм-канала «Подвиг», который опубликовал фотографии акции, перфоманс продлился 10 минут, после чего Исаеву задержали.',
        image: ['https://leonardo.osnova.io/abe33c2c-c088-5dd0-a665-a1259acf824f/-/preview/1100/-/format/webp/', 'https://leonardo.osnova.io/338989a0-5fc5-5d0c-a8d8-4b121f3957a4/-/resize/680/', 'https://leonardo.osnova.io/486cd11b-63b8-54c3-b0af-7d2d21becc43/-/resize/680/', 'https://leonardo.osnova.io/082c492b-3635-5490-9341-28fc0f480f9d/-/resize/680/'],
        type: 'news',
        сhat: [],
        likes: 5,
        created_at: Date.now(),
      }
    },
  };
});

export default ServerSideProps;