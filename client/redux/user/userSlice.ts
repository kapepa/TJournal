import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../dto/user";
import {HYDRATE} from "next-redux-wrapper";
import {changeIconUser} from "./userAction";

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as IUser,
  reducers: {
    setProfile(state, action) {
      return  action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user
      };
    },
    // [changeIconUser]: (state, action) => {},
    // [changeIconUser.fulfilled]: (state, action) => {
    //   console.log(action)
    //   return state
    // }
  },
});

export const { setProfile } = userSlice.actions;








