import Axios from "./axios";
import config from "../config";
import {setProfile} from "../redux/user/userSlice";
import {allArticle, setArticle, setShort} from "../redux/article/articleSlice";

export const RequestServer = (token: string | undefined , dispatch: any) => {
  Axios.defaults.baseURL = config.api;
  Axios.defaults.headers.common = { Authorization: `Bearer ${token}`};

  return {
    async Profile () {
      const profile = await Axios.get('/api/user')
        .then( res => res.data )
        .catch(err => {});
      dispatch(setProfile(Boolean(profile) ? profile : {}))
    },
    async Article (param: string) {
      const article = await Axios.get(`/api/article/one/${param}`)
        .then( res => res.data )
        .catch( err => console.error(err) );
      dispatch(setArticle(article ? article : {}))
    },
    async AllArticle (number: number, nav: string, word: string) {
      const all = await Axios.get(`/api/article/all?list=${number}&nav=${nav}&word=${word}`)
        .then( res => res.data )
        .catch( err => console.error(err));
      dispatch(allArticle(all ? all : []))
    },
    async ShortArticle ( number: number ) {
      const short = await Axios.get(`/api/article/short?list=${number}`)
        .then(res => res.data)
        .catch(err => console.error(err));
      if(Boolean(short)) dispatch(setShort(short))
    }
  }
}
