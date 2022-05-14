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
    likesArticle(state, action) {
      return { ...state, detailed: {...state.detailed, likes: action.payload} };
    },
    updateDetailed(state, action) {
      const { likes, myLikes } = action.payload;
      return { ...state, detailed: {...state.detailed, likes, myLikes} };
    },
    addAnswer(state, action) {
      const answer = JSON.parse(JSON.stringify(state.detailed?.chat?.answer));
      answer.push(...action.payload);
      state.detailed.chat = { ...state.detailed.chat, answer } as IChat;
      return state;
    },
    setShort(state, action) {
      return { ...state, short: [...state.short, ...action.payload] };
    },
    excludeArticle(state, action){
      state.short.splice(action.payload.index, 1);
      state.all.splice(action.payload.index, 1);
      return state;
    },
    allArticle(state, action) {
      return { ...state, all: [...state.all, ...action.payload] };
    },
    cleanerArticle(state, action){
      return { ...state, all: action.payload };
    },
    delArticleOne(state, action) {
      state.all.splice(action.payload.index,1);
      return state;
    },
    updateArticleOne(state, action) {
      state.all.splice(action.payload.index,1,action.payload.article);
      return state;
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
    swapChat(state, action) {
      const { answer, index } = action.payload;
      state.detailed.chat?.answer?.splice(index,1,answer.answer[0])
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
  excludeArticle,
  addAnswer,
  delArticleOne,
  updateArticleOne,
  cleanerArticle,
  updateChat,
  updateAnswer
} = articleSlice.actions;