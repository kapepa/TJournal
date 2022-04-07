import {AppThunk} from "../store";
import Axios from "../../helpers/axios";
import {userSlice} from "./userSlice";

export const changeIconUser =
  (form: FormData, query: string): AppThunk =>
    async dispatch => {
      Axios.defaults.headers.common = {
        ...Axios.defaults.headers.common,
        'Content-Type': 'multipart/form-data',
      }
      const image = await Axios.put(`/api/user/file?name=${query}`,form)
        .then(res => res.data)
        .catch(err => console.log(err));

      dispatch(userSlice.actions.changeAvatar(image));
    };



