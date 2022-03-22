import {useState} from "react";
import type { NextPage } from 'next';
import LayoutDefault from "../../layout/layout.default";
import ProfileProps from "../../side.props/profile.props";
import {IUser} from "../../dto/user";
import {IQuery} from "../../dto/query";
import style from "./style.module.scss";
import Cover from "../../components/cover";
import {IFile} from "../../dto/file";

interface IProfile {
  user: IUser,
  query: IQuery,
}

interface IState{
  file: IFile,
}

const Profile: NextPage<IProfile> = ({user, query}) => {
  const [state, setState] = useState<IState>({} as IState);
  const loadCover = (file: IFile) => setState({...state, file});



  return (
    <LayoutDefault title='Profile' user={user} query={query}>
      <section className={`flex flex-direction-column ${style.profile}`}>
        {!(state?.file?.reader && state?.file?.cover) && <Cover cb={loadCover}/>}

      </section>
    </LayoutDefault>
  )
}

export const getServerSideProps = ProfileProps;

export default Profile;