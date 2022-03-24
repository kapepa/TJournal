import {NextPage} from "next";
import LayoutDefault from "../../layout/layout.default";
import SettingProps from "../../side.props/setting.props";
import {IUser} from "../../dto/user";
import {IQuery} from "../../dto/query";
import style from './style.module.scss';
import NavSetting from "../../components/nav.setting";

interface ISetting {
  user: IUser,
  query: IQuery,
}

const Setting: NextPage<ISetting> = ({user, query}) => {

  return (
    <LayoutDefault title='Setting' user={user} query={query} >
      <section className={`flex ${style.setting}`}>
        <main className={`${style.setting__main}`}>
          main
        </main>
        <aside className={`${style.setting__aside}`}>
          <NavSetting/>
        </aside>
      </section>
    </LayoutDefault>
  )
};

export const getServerSideProps = SettingProps;

export default Setting;