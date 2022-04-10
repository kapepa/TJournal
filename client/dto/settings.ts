import {IUser} from "./user";

export interface ISettings {
  id: string;
  user?: IUser;
  description: string;
  online: boolean;
  ribbon: string;
  sorting: string;
  entry: string;
  adult: string;
  created_at: Date;
  updated_at: Date;
}