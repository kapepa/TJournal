import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../dto/user";
import {HYDRATE} from "next-redux-wrapper";

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as IUser,
  reducers: {
    setProfile(state, action) {
      return action.payload;
    },
    changeAvatar(state, action) {
      if(action.payload?.name === 'avatar') state.avatar = action.payload.img;
      if(action.payload?.name === 'cover') state.cover = action.payload.img;
      return state
    },
    changeData(state, action) {
      return {...state, ...action.payload};
    },
    changeSettings(state, action) {
      return {...state, settings: action.payload};
    },
    changeMessage(state, action) {
      return {...state, ...action.payload};
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user
      };
    },
  },
});

export const { setProfile, changeData, changeSettings, changeMessage } = userSlice.actions;








