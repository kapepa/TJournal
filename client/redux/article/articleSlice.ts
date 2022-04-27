import {createSlice} from "@reduxjs/toolkit";
import {IArticle} from "../../dto/news";
import {HYDRATE} from "next-redux-wrapper";
import {IChat} from "../../dto/сhat";

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
    updateDetailed(state, action) {
      const { likes, myLikes } = action.payload;
      return { ...state, detailed: {...state.detailed, likes, myLikes} };
    },
    appendAnswer(state, action) {
      const answer = JSON.parse(JSON.stringify(state.detailed?.chat?.answer));
      answer.push(...action.payload);
      state.detailed.chat = { ...state.detailed.chat, answer } as IChat;
      return state;
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
      return { ...state, detailed: { ...state.detailed, subscribe: action.payload} };
    },
    updateChat(state, action) {
      const answer = JSON.parse(JSON.stringify(state.detailed.chat?.answer));
      answer.unshift(...action.payload.answer);
      state.detailed.chat = {...action.payload, answer} as IChat;
      return state;
    },
    updateAnswer(state, action) {
      const answer = JSON.parse(JSON.stringify(state.detailed.chat?.answer));
      answer.splice(action.payload.i,1,action.payload.answer);
      state.detailed.chat = { ...state.detailed.chat, answer: answer } as IChat;
      return state;
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

export const {
  setArticle,
  setShort,
  allArticle,
  appendAnswer,
  delArticleOne,
  updateArticleOne,
  cleanerArticle,
  updateChat,
  updateAnswer
} = articleSlice.actions;