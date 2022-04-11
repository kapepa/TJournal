import {IUser} from "./user";

interface NestedData {
  name: string;
  checked: boolean;
}

export interface IMessage {
  id?: string,
  user?: IUser;
  answer: NestedData;
  ratings: NestedData;
  reminders: NestedData;
  comments: NestedData;
  subscribers: NestedData;
  created_at?: Date;
  updated_at?: Date;
}