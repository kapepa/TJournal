import {IUser} from "./user";

interface ISubscribe {
  id: string,
  user?: IUser,
  subscribe?: IUser[],
  subscribers: number,
}

export type { ISubscribe }