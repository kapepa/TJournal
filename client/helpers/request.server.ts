import Axios from "./axios";
import config from "../config";
import {setProfile} from "../redux/user/userSlice";
import {setArticle} from "../redux/article/articleSlice";

export const RequestServer = (token: string, dispatch: any) => {
  Axios.defaults.baseURL = config.url;
  Axios.defaults.headers.common = { Authorization: `Bearer ${token}`};

  return {
    async Profile () {
      const profile = await Axios.get('/api/user')
        .then( res => res.data )
        .catch(err => {});
      dispatch(setProfile(profile))
      return profile;
    },
    async Article (param: string) {
      const article = await Axios.get(`/api/article/one/${param}`)
        .then( res => res.data )
        .catch( err => console.error(err) );
      dispatch(setArticle(article))
      return article;
    },
    async AllArticle () {
      const article = await Axios.get(`/api/article/all`)
        .then( res => res.data )
        .catch( err => console.error(err) );
      return article
    }
  }
}
