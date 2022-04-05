import {AppThunk} from "../store";
import {IUser} from "../../dto/user";
import {userSlice} from "./userSlice";

export const fetchProfile = (user: IUser): AppThunk => async dispatch => {
  dispatch(userSlice.actions.setEnt({user}))
};