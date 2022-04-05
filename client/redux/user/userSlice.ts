import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../dto/user";

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as IUser,
  reducers: {
    setEnt(state, action) {
      return action.payload;
    },
  },
  extraReducers: {},
});








