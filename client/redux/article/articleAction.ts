import {AppThunk} from "../store";
import {articleSlice} from "./articleSlice";
import Axios from "../../helpers/axios";

export const articleShort = (number: number): AppThunk => async dispatch => {
  const short = await Axios.get(`/api/article/short?list=${number}`)
  dispatch(articleSlice.actions.setShort(short));
};