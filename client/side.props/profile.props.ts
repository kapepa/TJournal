import {GetServerSideProps} from "next";
import HomeProps from "./home.props";

const ProfileProps: GetServerSideProps = async (ctx) => {

  return {
    props: {
      query: {
        registration:  false,
      },
      user: {
        id: 'dsf234234',
        name: 'New Name',
        subs: 5,
        listening: 2,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiZhF32GBxYMToEL_8Y_1VJpyz52NCK_U5ng&usqp=CAU',
        cover: 'https://media.gettyimages.com/photos/aerial-view-of-cousine-islandseychelles-picture-id541050212?s=612x612',
        created_at: Date.now(),
      }
    },
  }
}



export default ProfileProps;