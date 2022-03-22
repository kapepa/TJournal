import type { NextPage } from 'next';
import LayoutDefault from "../../layout/layout.default";
import ProfileProps from "../../side.props/profile.props";
import {IUser} from "../../dto/user";
import {IQuery} from "../../dto/query";
import style from "./style.module.scss";
import Cover from "../../components/cover";

interface IProfile {
  user: IUser,
  query: IQuery,
}

const Profile: NextPage<IProfile> = ({user, query}) => {
  return (
    <LayoutDefault title='Profile' user={user} query={query}>
      <section className={`flex flex-direction-column ${style.profile}`}>
        <Cover/>
      </section>
    </LayoutDefault>
  )
}

export const getServerSideProps = ProfileProps;

export default Profile;