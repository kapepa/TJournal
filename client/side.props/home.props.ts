import {GetServerSideProps} from "next";

const HomeProps: GetServerSideProps = async (ctx) => {
  const regist = ctx.query.registration;

  return {
    props: {
      query: {
        registration: regist === 'true' ? Boolean(regist) : false,
      },
      user: true
    },
  }
}

export default HomeProps;
