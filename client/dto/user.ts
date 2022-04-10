import {ISettings} from "./settings";

interface IUser {
  id: string,
  settings?: ISettings,
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
