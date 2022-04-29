import {ISettings} from "./settings";
import {IList} from "./list";
import {IMessage} from "./message";
import {ISubscribe} from "./subscribe";
import {IAnswer} from "./сhat";
import {IArticle} from "./news";

interface IUser {
  id: string,
  settings?: ISettings,
  list?: IList,
  message?: IMessage,
  subscribe?: ISubscribe,
  listening?: ISubscribe[],
  answer?: IAnswer[],
  article?: IArticle[],
  answerLikes?: IAnswer[],
  articleLikes?: IArticle[],
  exclude?: IAnswer[],
  name: string,
  email: string,
  password?: string,
  avatar: string,
  cover: string,
  donate: number,
  subs: number,
  created_at?: Date,
}

interface ILogin {
  email: string,
  password: string,
}

interface IRegistraition extends ILogin {
  name: string,
}

export type { IUser, IRegistraition, ILogin }
