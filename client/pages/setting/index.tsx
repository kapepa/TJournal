import {NextPage} from "next";
import LayoutDefault from "../../layout/layout.default";
import ServerSideProps from "../../side.props/server.side";
import NavSetting from "../../components/nav.setting";
import SettingsChange from "../../components/settings.change";
import {IUser} from "../../dto/user";
import {IQuery} from "../../dto/query";
import style from './style.module.scss';

interface ISetting {
  user: IUser,
  query: IQuery,
}

const Setting: NextPage<ISetting> = ({ query}) => {

  return (
    <LayoutDefault title='Setting' query={query} >
      <section className={`flex ${style.setting}`}>
        <main className={`${style.setting__main}`}>
          <SettingsChange />
        </main>
        <aside className={`flex ${style.setting__aside}`}>
          <NavSetting/>
        </aside>
      </section>
    </LayoutDefault>
  )
};

export const getServerSideProps = ServerSideProps;

export default Setting;