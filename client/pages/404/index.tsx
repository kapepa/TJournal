import {NextPage} from "next";
import {useRouter} from "next/router";
import style from './style.module.scss';
import LayoutDefault from "../../layout/layout.default";
import {IUser} from "../../dto/user";
import {IQuery} from "../../dto/query";
import ButtonDefault from "../../components/button.default";

interface IError404 {
  user: IUser,
  query: IQuery,
}

const Error404: NextPage<IError404> = ({user, query}) => {
  const router = useRouter();
  return (
    <LayoutDefault title='404' query={query} >
      <section className={`flex justify-content-center align-items-center ${style.error}`}>
        <div className={`${style.error__layer}`}>
          <h5 className={`${style.error__h5}`}>Ошибка 404</h5>
          <span className={`${style.error__span}`}>К сожалению запрашиваемая страница не найдена</span>
          <div className={`flex justify-content-center ${style.error__btn_area}`}>
            <ButtonDefault text='Назад' type='blue' cb={() => router.back()}/>
          </div>
        </div>
      </section>
    </LayoutDefault>
  )
};

export default Error404;