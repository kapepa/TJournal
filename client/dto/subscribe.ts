import {IUser} from "./user";
import {IArticle} from "./news";

interface ISubscribe {
  id: string,
  user?: IUser,
  subscribe?: IUser[],
  article?: IArticle[],
  sub: boolean,
  subscribers: number,
}

export type { ISubscribe }