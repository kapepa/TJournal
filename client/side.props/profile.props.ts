import {GetServerSideProps} from "next";
import HomeProps from "./home.props";

const ProfileProps: GetServerSideProps = async (ctx) => {

  return {
    props: {
      query: {
        registration:  false,
      },
      user: true
    },
  }
}



export default ProfileProps;