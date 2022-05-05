import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import {Action} from 'redux';
import {createWrapper} from "next-redux-wrapper";
import {userSlice} from "./user/userSlice";
import {articleSlice} from "./article/articleSlice";
import {onlineSlice} from "./online/onlineSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [articleSlice.name]: articleSlice.reducer,
      [onlineSlice.name]: onlineSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);