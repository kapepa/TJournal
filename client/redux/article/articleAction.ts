import {AppThunk} from "../store";
import {articleSlice} from "./articleSlice";
import Axios from "../../helpers/axios";

export const articleShort = (number: number): AppThunk => async dispatch => {
  const short = await Axios.get(`/api/article/short?list=${number}`)
  dispatch(articleSlice.actions.setShort(short));
};

export const articleDelete = (id: string): AppThunk => async dispatch => {
  const short = await Axios.delete(`/api/article?id=${id}`)
  // dispatch(articleSlice.actions.setShort(short));
};