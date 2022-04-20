import {ISubscribe} from "./subscribe";
import {IUser} from "./user";

interface IListNews {
  id: string,
  title: string,
  comments: number,
}

interface IArticle {
  id: string,
  user: IUser,
  subscribe: ISubscribe,
  title: string,
  comments: number,
  type: string,
  shortDesc: string,
  text: string,
  image: string[],
  likes: number,
  сhat: any[],
  created_at: Date,
}

export type { IListNews, IArticle }