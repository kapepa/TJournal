import {AppThunk} from "../store";
import {articleSlice} from "./articleSlice";
import Axios from "../../helpers/axios";
import {IArticle} from "../../dto/news";
import {ISubscribe} from "../../dto/subscribe";
import {IAnswer} from "../../dto/сhat";

export const articleShort = (number: number): AppThunk => async dispatch => {
  const short = await Axios.get(`/api/article/short?list=${number}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.setShort(short));
};

export const getOneAnswer = (id: string, index: number): AppThunk => async dispatch => {
  const answer = await Axios.get(`/api/chat/one?id=${id}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.updateAnswer({answer, i: index}))
}

export const loadAnswer = (id: string, length: number, take = 5): AppThunk => async dispatch => {
  const answer = await Axios.get(`/api/chat/answer?id=${id}&length=${length}&take=${take}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.addAnswer(answer));
};

export const selectAnswer = (id: string, length: number, take = 5, index: number | null): AppThunk => async dispatch => {
  const position = typeof index === 'number' ? index : length;
  const answer = await Axios.get(`/api/chat/select?id=${id}&length=${position}&take=${take}`)
    .then(res => res.data)
    .catch(err => console.error(err))
  typeof index === 'number' ? dispatch(articleSlice.actions.swapChat({answer, index})) : dispatch(articleSlice.actions.updateChat(answer));
};

export const articleAll = (number: number, nav: string, word= ''): AppThunk => async dispatch => {
  const all = await Axios.get(`/api/article/all?list=${number}&nav=${nav}&word=${word}`)
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
  const please = await Axios.put(`/api/article/please`, article)
    .then(res => res.data)
    .catch(err => console.error(err));
  dispatch(articleSlice.actions.updateArticleOne({article: please, index}));
}

export const articleLikes = (article: IArticle): AppThunk => async dispatch => {
  const update = await Axios.put(`/api/article/likes`, article)
    .then(res => res.data)
    .catch(err => console.error(err));
  dispatch(articleSlice.actions.updateDetailed(update));
}

export const appendSubscribe = (data: ISubscribe | undefined): AppThunk => async dispatch => {
  const append = await Axios.put(`/api/subscribe/append`,data)
    .then(res => res.data)
    .catch(err => console.error(err));
  dispatch(articleSlice.actions.updateSubscribe(append));
}

export const messageChat = (data: any): AppThunk => async dispatch => {
  const message = await Axios.put(`/api/chat/message`, data)
    .then(res => res.data)
    .catch(err => console.error(err));
  dispatch(articleSlice.actions.updateChat(message));
}

export const appendAnswer = (data: any, i: number | null): AppThunk => async dispatch => {
  const answer = await Axios.put(`/api/chat/append`, data)
    .then(res => res.data)
    .catch(err => console.error(err));
  dispatch(articleSlice.actions.updateAnswer({answer,i}))
}

export const getArticleLikes = (articleID: string): AppThunk => async dispatch => {
  const count = await Axios.get(`/api/article/likes/count/${articleID}`)
    .then(res => res.data)
    .catch(err => console.error(err));
  dispatch(articleSlice.actions.likesArticle(count));
}

export const answerLikes = (data: IAnswer, query: string, i: number): AppThunk => async dispatch => {
  const answer = await Axios.put(`/api/chat/likes?id=${query}`, data)
    .then(res => res.data)
    .catch(err => console.error(err))
  dispatch(articleSlice.actions.updateAnswer({answer, i}));
}

export const excludeArticleUser = (id:string, index: number): AppThunk => async dispatch => {
  const exclude = await Axios.put(`/api/article/exclude?id=${id}`)
    .then(res => res.data)
    .catch(err => console.error(err));
  dispatch(articleSlice.actions.excludeArticle({index}))
}


