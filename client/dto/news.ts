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
  user?: IUser,
  subscribe?: ISubscribe,
  chat?: IChat,
  articleLikes?: IUser[],
  exclude?: IUser[],
  myLikes: boolean,
  likes: number,
  title: string,
  text: string,
  type: string,
  shortDesc: string,
  image: string[],
  created_at?: Date,
  updated_at?: Date,
}

export type { IListNews, IArticle }