import {ISettings} from "./settings";
import {IList} from "./list";
import {IMessage} from "./message";
import {ISubscribe} from "./subscribe";

interface IUser {
  id: string,
  settings?: ISettings,
  list?: IList,
  message?: IMessage,
  subscribe?: ISubscribe,
  listening?: ISubscribe,
  name: string,
  email: string,
  password?: string,
  subs: number,
  donate: number,
  avatar: string,
  cover: string,
  comments: [],
  created_at: Date,
}

interface ILogin {
  email: string,
  password: string,
}

interface IRegistraition extends ILogin {
  name: string,
}

export type { IUser, IRegistraition, ILogin }
