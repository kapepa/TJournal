import type { NextPage } from 'next';
import LayoutDefault from "../../layout/layout.default";
import ServerSideProps from "../../side.props/server.side";
import {IUser} from "../../dto/user";
import {IQuery} from "../../dto/query";
import style from "./style.module.scss";
import ProfilePanel from "../../components/profile.panel";
import ProfileContent from "../../components/profile.content";
import {useRouter} from "next/router";

interface IProfile {
  user: IUser,
  query: IQuery,
}

const Profile: NextPage<IProfile> = ({query}) => {
  const router = useRouter();
  const { nav } = router.query;

  return (
    <LayoutDefault title='Profile' query={query}>
      <section className={`flex flex-direction-column ${style.profile}`}>
        <ProfilePanel query={String(nav)} />
        <ProfileContent />
      </section>
    </LayoutDefault>
  )
}

export const getServerSideProps = ServerSideProps;

export default Profile;