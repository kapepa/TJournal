import Axios from "./axios";
import config from "../config";
import {setProfile} from "../redux/user/userSlice";
import {allArticle, setArticle, setShort} from "../redux/article/articleSlice";

export const RequestServer = (token: string, dispatch: any) => {
  Axios.defaults.baseURL = config.url;
  Axios.defaults.headers.common = { Authorization: `Bearer ${token}`};

  return {
    async Profile () {
      const profile = await Axios.get('/api/user')
        .then( res => res.data )
        .catch(err => {});
      dispatch(setProfile(profile))
    },
    async Article (param: string) {
      const article = await Axios.get(`/api/article/one/${param}`)
        .then( res => res.data )
        .catch( err => console.error(err) );
      dispatch(setArticle(article))
    },
    async AllArticle (number: number) {
      const all = await Axios.get(`/api/article/all?list=${number}`)
        .then( res => res.data )
        .catch( err => console.error(err));
      dispatch(allArticle(all))
    },
    async ShortArticle ( number: number ) {
      const short = await Axios.get(`/api/article/short?list=${number}`)
        .then(res => res.data)
        .catch(err => console.error(err));
      dispatch(setShort(short))
    }
  }
}
