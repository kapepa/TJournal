import {ISettings} from "./settings";
import {IList} from "./list";
import {IMessage} from "./message";

interface IUser {
  id: string,
  settings?: ISettings,
  list?: IList,
  message: IMessage,
  name: string,
  email: string,
  password?: string,
  subs: number,
  listening: number,
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
