import Axios from "./axios";
import {ILogin, IRegistraition} from "../dto/user";

export const LoadingList = async (last: number) => {
  return await Axios.get(`/api/article/list?last=${last}`).then(res => res.data);
}

export const SubmitRegistraition = async (data: IRegistraition, wrong: (message: string) => void) => {
  return await Axios.post(`/api/auth/create`, data).then(res => {
    return res.data
  }).catch((err) => {
    wrong(err.response.request.statusText)
  });
}

export const SubmitLogin = async (data: ILogin, wrong: (message: string) => void) => {
  return Axios.post('/api/auth/login', data).then(res => {
    return res.data
  }).catch((err) => {
    wrong(err.response.request.statusText)
  })
}