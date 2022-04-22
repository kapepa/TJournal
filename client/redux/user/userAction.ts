import {AppThunk} from "../store";
import Cookie from "js-cookie";
import Axios from "../../helpers/axios";
import {userSlice} from "./userSlice";

export const changeIconUser =
  (form: FormData, query: string): AppThunk =>
    async dispatch => {
      Axios.defaults.headers.common = {
        'Authorization': `Bearer ${Cookie.get('token')}`,
        'Content-Type': 'multipart/form-data',
      };
      const image = await Axios.put(`/api/user/file?name=${query}`,form)
        .then(res => res.data)
        .catch(err => console.log(err));
      dispatch(userSlice.actions.changeAvatar(image));
    };

export const changeDataUser =
  (form: FormData): AppThunk =>
    async dispatch => {
      Axios.defaults.headers.common = {
        ...Axios.defaults.headers.common,
        'Content-Type': 'multipart/form-data',
      }
      const data = await Axios.put(`/api/user/change`, form)
        .then(res => res.data)
        .catch(err => console.log(err));
      dispatch(userSlice.actions.changeData(data));
    };

export const changeSettings =
  (id: string, obj: any): AppThunk =>
    async dispatch => {
      const data = await Axios.put(`/api/settings/change?id=${id}`, obj)
        .then(res => res.data)
        .catch(err => console.log(err));
      dispatch(userSlice.actions.changeSettings(data))
    }

export const changeMessage =
  (obj: any): AppThunk =>
    async dispatch => {
      const data = await Axios.put(`/api/settings/message`, obj)
        .then(res => res.data)
        .catch(err => console.log(err));
      dispatch(userSlice.actions.changeMessage(data))
    }