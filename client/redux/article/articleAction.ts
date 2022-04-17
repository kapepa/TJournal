import {AppThunk} from "../store";
import {articleSlice} from "./articleSlice";
import Axios from "../../helpers/axios";
import {IArticle} from "../../dto/news";

export const articleShort = (number: number): AppThunk => async dispatch => {
  const short = await Axios.get(`/api/article/short?list=${number}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.setShort(short));
};

export const articleAll = (number: number): AppThunk => async dispatch => {
  const all = await Axios.get(`/api/article/all?list=${number}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.allArticle(all));
};

export const articleDelete = (id: string, index: number): AppThunk => async dispatch => {
  const del = await Axios.delete(`/api/article?id=${id}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.delArticleOne({index}));
};

export const articleUpdate = (article: IArticle, index: number): AppThunk => async dispatch => {
  const update = await Axios.put(`/api/article/update`, article)
    .then(res => res.data)
    .catch(err => console.error(err));
  dispatch(articleSlice.actions.updateArticleOne({article: update, index}));
}

