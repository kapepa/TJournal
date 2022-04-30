import Axios from "./axios";
import {ILogin, IRegistraition} from "../dto/user";

export const CheckRecaptcha = async (recaptcha: string) => {
  return await Axios.post(`/api/auth/recaptcha`, {recaptcha})
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const SubmitRegistraition = async (data: IRegistraition, wrong: (message: string) => void) => {
  return await Axios.post(`/api/auth/create`, data)
    .then(res => res.data)
    .catch(err => {wrong(err.response.request.statusText)});
}

export const SubmitLogin = async (data: ILogin, wrong: (message: string) => void) => {
  return Axios.post('/api/auth/login', data)
    .then(res => res.data)
    .catch((err) => {wrong(err.response.request.statusText)})
}

export const CreateArticle = async (form: any) => {
  Axios.defaults.headers.common = {...Axios.defaults.headers.common, 'Content-Type': 'multipart/form-data'};
  return Axios.post('/api/article/create',form)
    .then(res => res.data)
    .catch(err => console.error(err));
}

export const ResetArticle = async () => {
  return Axios.put(`/api/article/reset`)
    .then(res => res.data)
    .catch(err => console.error(err));
}

export const SwapPassword = async (data: {password: string}) => {
  return Axios.put(`/api/user/swap`, data)
    .then(res => res.data)
    .catch(err => console.error(err))
}
