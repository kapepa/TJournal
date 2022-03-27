import {GetServerSideProps} from "next";

const HomeProps: GetServerSideProps = async (ctx) => {
  const regist = ctx.query.registration;

  return {
    props: {
      query: {
        registration: regist === 'true' ? Boolean(regist) : false,
      },
      user: {
        id: 'dsf234234',
        name: 'New Name',
        email: 'test@gmail.com',
        subs: 5,
        listening: 2,
        donate: 0,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiZhF32GBxYMToEL_8Y_1VJpyz52NCK_U5ng&usqp=CAU',
        cover: 'https://media.gettyimages.com/photos/aerial-view-of-cousine-islandseychelles-picture-id541050212?s=612x612',
        comments: [],
        created_at: Date.now(),
      },
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
  }
}

export default HomeProps;
