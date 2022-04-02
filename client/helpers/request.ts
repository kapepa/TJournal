import Axios from "./axios";
import {IRegistraition} from "../dto/user";

export const LoadingList = async (last: number) => {
  return await Axios.get(`/api/article/list?last=${last}`).then(res => res.data);
}

export const SubmitRegistraition = async (data: IRegistraition) => {
  return await Axios.post(`/api/auth/create`, data).then(res => res.data);
}