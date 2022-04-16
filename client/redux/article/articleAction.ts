import {AppThunk} from "../store";
import {articleSlice} from "./articleSlice";
import Axios from "../../helpers/axios";

export const articleShort = (number: number): AppThunk => async dispatch => {
  const short = await Axios.get(`/api/article/short?list=${number}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.setShort(short));
};

export const articleAll = (number: number): AppThunk => async dispatch => {
  const all = await Axios.delete(`/api/article/all?list=${number}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  console.log(all)
  // dispatch(articleSlice.actions.allArticle(all));
};

export const articleDelete = (id: string): AppThunk => async dispatch => {
  const del = await Axios.delete(`/api/article?id=${id}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.allArticle(del));
};

