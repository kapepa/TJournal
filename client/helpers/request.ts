import Axios from "./axios";
import {IRegistraition} from "../dto/user";

export const LoadingList = async (last: number) => {
  return await Axios.get(`/api/article/list?last=${last}`).then(res => res.data);
}

export const SubmitRegistraition = async (data: IRegistraition, wrong: (message: string) => void) => {
  return await Axios.post(`/api/auth/create`, data).then(res => {
    if(res.status !== 201 && res){
      wrong(res.data);
      return false;
    }
    return res.data
  });
}