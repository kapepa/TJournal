import {IUser} from "./user";

interface NestedData {
  name: string;
  checked: boolean;
}

export interface IList {
  id?: string,
  user?: IUser;
  answer: NestedData;
  ratings: NestedData;
  reminders: NestedData;
  message: NestedData;
  best: NestedData;
  created_at?: Date;
  updated_at?: Date;
}