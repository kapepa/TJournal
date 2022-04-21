import {ISubscribe} from "./subscribe";
import {IUser} from "./user";
import {IChat} from "./сhat";

interface IListNews {
  id: string,
  title: string,
  comments: number,
}

interface IArticle {
  id: string,
  user: IUser,
  subscribe: ISubscribe,
  chat: IChat,
  title: string,
  type: string,
  shortDesc: string,
  text: string,
  image: string[],
  likes: number,
  created_at: Date,
}

export type { IListNews, IArticle }