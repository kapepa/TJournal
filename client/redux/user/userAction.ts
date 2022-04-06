import {AppThunk} from "../store";
import Axios from "../../helpers/axios";

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

// export const changeIconUser = ( form: any ): AppThunk => {
//   return async dispatch => {
//     const icon = Axios.put('/api/user/icon',form).then(res => console.log(res.data)).catch(err => console.log(err));
//   }
// }

export const changeIconUser = ( form: any ) => {
  Axios.defaults.headers.common = {
    ...Axios.defaults.headers.common,
    'Content-Type': 'multipart/form-data',
  }
  Axios.put('/api/user/icon',form)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}