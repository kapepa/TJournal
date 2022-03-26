import {GetServerSideProps} from "next";

const SettingProps: GetServerSideProps = async (ctx) => {

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
      }
    },
  }
}



export default SettingProps;