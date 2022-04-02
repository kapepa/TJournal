
interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  subs: number,
  listening: number,
  donate: number,
  avatar: string,
  cover: string,
  comments: [],
  created_at: Date,
}

interface IRegistraition {
  name: string,
  email: string,
  password: string,
}

export type { IUser, IRegistraition }