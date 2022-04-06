import {AppThunk} from "../store";
import Axios from "../../helpers/axios";
import {ThunkDispatch} from "redux-thunk";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchSubject = (id: any): AppThunk =>
    async dispatch => {
      const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

      await timeoutPromise(200);

      // dispatch(
      //   subjectSlice.actions.setEnt({
      //     [id]: {
      //       id,
      //       name: `Subject ${id}`,
      //     },
      //   }),
      // );
    };

// export const changeIconUser = async ( form: any ) => {
//   Axios.defaults.headers.common = {
//     ...Axios.defaults.headers.common,
//     'Content-Type': 'multipart/form-data',
//   }
//   const image = await Axios.put('/api/user/icon',form)
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err));
//
//   return image
// }

export const changeIconUser = createAsyncThunk(
  'users/changeIconUser',
  async (form: any) => {
    Axios.defaults.headers.common = {...Axios.defaults.headers.common, 'Content-Type': 'multipart/form-data'}

    const image = await Axios.put('/api/user/icon',form)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    return image
  }
)



