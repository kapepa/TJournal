import Axios from "./axios";

export const LoadingList = async (last: number) => {
  const list = await Axios.get(`/api/article/list?last=${last}`).then(res => res.data);
  return list;
}