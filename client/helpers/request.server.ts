import Axios from "./axios";
import config from "../config";
import {setProfile} from "../redux/user/userSlice";

export const RequestServer = (token: string, dispatch: any) => {
  Axios.defaults.baseURL = config.url;
  Axios.defaults.headers.common = { Authorization: `Bearer ${token}`};

  return {
    async Profile () {
      const profile = await Axios.get('/api/user').then( res => res.data ).catch(err => {});
      dispatch(setProfile(profile))
      return profile
    },
  }
}
