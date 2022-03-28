import {GetServerSideProps} from "next";

const ArticleProps: GetServerSideProps = async (ctx) => {

  return {
    props: {
      query: {
        registration:  false,
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
      article:{
        _id: 'asdasdas12312asdasdartysdas',
        title: 'Фото: Перфоманс в Петербурге, где активистка облила себя красной краской, протестуя против действий России на Украине',
        comments: 1,
        shortDesc: 'Её задержали после скандирований фразы «Сердце кровью обливается».',
        text: '27 марта на ступени здания Городской думы в Петербурге поднялась девушка в белом и облила себя красной краской в знак протеста против «военной спецоперации» России на Украине, сообщает «Фонтанка». Очевидцы рассказали корреспонденту издания, что это автор городского телеграм-канала «Добрососедство Коломны» Евгения Исаева. Под ногами она расстелила плакат, где написано: «Я чувствую, что бесполезно призывать к разуму, поэтому обращаюсь к вашим сердцам». По данным телеграм-канала «Подвиг», который опубликовал фотографии акции, перфоманс продлился 10 минут, после чего Исаеву задержали.',
        image: ['https://leonardo.osnova.io/abe33c2c-c088-5dd0-a665-a1259acf824f/-/preview/1100/-/format/webp/', 'https://leonardo.osnova.io/338989a0-5fc5-5d0c-a8d8-4b121f3957a4/-/resize/680/', 'https://leonardo.osnova.io/486cd11b-63b8-54c3-b0af-7d2d21becc43/-/resize/680/', 'https://leonardo.osnova.io/082c492b-3635-5490-9341-28fc0f480f9d/-/resize/680/'],
        type: 'news',
        likes: 5,
        created_at: Date.now(),
      }
    },
  }
}



export default ArticleProps;