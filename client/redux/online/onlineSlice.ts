import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const onlineSlice = createSlice({
  name: 'online',
  initialState: [] as string[],
  reducers: {
    setOnline(state, action) {
      state = action.payload;
      return state;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return [
        ...state,
        ...action.payload.online
      ];
    },
  },
});

export const { setOnline } = onlineSlice.actions;