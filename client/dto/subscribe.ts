import {IUser} from "./user";

interface ISubscribe {
  id: string,
  user?: IUser,
  subscribe?: IUser[],
  sub: boolean,
  subscribers: number,
}

export type { ISubscribe }