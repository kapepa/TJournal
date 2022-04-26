import {IArticle} from "./news";
import {IUser} from "./user";

interface IChat {
  id: string,
  article?: IArticle,
  answer?: IAnswer[],
  count: number;
}
interface IAnswer {
  id: string,
  chat?: IChat,
  user?: IUser,
  inner?: IAnswer,
  nested?: IAnswer[],
  answerLikes?: IUser[],
  myLikes: boolean;
  text: string,
  likes: number;
  created_at: Date;
}

export type { IChat, IAnswer };