import {createSlice} from "@reduxjs/toolkit";
import {IArticle} from "../../dto/news";
import {HYDRATE} from "next-redux-wrapper";

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    short: [] as IArticle[],
    all: [] as IArticle[],
  } as { detailed: IArticle, short: IArticle[], all: IArticle[] },
  reducers: {
    setArticle(state, action) {
      return { ...state, detailed: action.payload };
    },
    setShort(state, action) {
      return { ...state, short: [...state.short, ...action.payload] };
    },
    allArticle(state, action) {
      return { ...state, all: [...state.all, ...action.payload] };
    },
    cleanerArticle(state, action){
      return { ...state, all: action.payload };
    },
    delArticleOne(state, action) {
      const all = state.all.splice(action.payload.index,1);
      return { ...state, all };
    },
    updateArticleOne(state, action) {
      const all = state.all.splice(action.payload.index,1,action.payload.article);
      return { ...state, all };
    },
    updateSubscribe(state, action) {
      return { ...state, detailed: {...state.detailed, subscribe: action.payload} };
    },
    updateChat(state, action) {
      return { ...state, detailed:{ ...state.detailed, chat: action.payload } };
    },
    updateAnswer(state, action) {
      const answer = state.detailed.chat.answer?.splice(action.payload.i, 1, action.payload.answer)
      console.log(state.detailed.chat.answer)
      return { ...state, detailed: { ...state.detailed, chat: { ...state.detailed.chat, answer } } }
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.article,
      };
    },
  },
});

export const { setArticle, setShort, allArticle, delArticleOne, updateArticleOne, cleanerArticle, updateChat, updateAnswer } = articleSlice.actions;