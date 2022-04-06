import {useState} from "react";
import type { NextPage } from 'next';
import LayoutDefault from "../../layout/layout.default";
import ServerSideProps from "../../side.props/server.side";
import {IUser} from "../../dto/user";
import {IQuery} from "../../dto/query";
import style from "./style.module.scss";
import Cover from "../../components/cover";
import {IFile} from "../../dto/file";
import ProfilePanel from "../../components/profile.panel";
import ProfileContent from "../../components/profile.content";
import {useRouter} from "next/router";

interface IProfile {
  user: IUser,
  query: IQuery,
}

interface IState{
  file: IFile,
  icon: IFile
}

const Profile: NextPage<IProfile> = ({user, query}) => {
  const router = useRouter();
  const { nav } = router.query;
  const [state, setState] = useState<IState>({file: {}} as IState);
  const loadCover = (file: IFile) => setState({...state, file});
  const loadIcon = (icon: IFile) => setState({...state, icon});

  return (
    <LayoutDefault title='Profile' user={user} query={query}>
      <section className={`flex flex-direction-column ${style.profile}`}>
        {!(state?.file?.reader && state?.file?.cover) && <Cover cb={loadCover}/>}
        <ProfilePanel user={user} query={String(nav)} file={state.file} icon={state.icon} loadIcon={loadIcon}/>
        <ProfileContent user={user} />
      </section>
    </LayoutDefault>
  )
}

export const getServerSideProps = ServerSideProps;

export default Profile;