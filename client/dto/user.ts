import {ISettings} from "./settings";
import {IList} from "./list";
import {IMessage} from "./message";
import {ISubscribe} from "./subscribe";
import {IAnswer} from "./сhat";

interface IUser {
  id: string,
  settings?: ISettings,
  list?: IList,
  message?: IMessage,
  subscribe?: ISubscribe,
  listening?: ISubscribe,
  answer?: IAnswer,
  name: string,
  email: string,
  password?: string,
  subs: number,
  donate: number,
  avatar: string,
  cover: string,
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
