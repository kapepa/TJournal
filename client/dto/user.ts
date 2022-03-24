interface IUser {
  id: string,
  name: string,
  subs: number,
  listening: number
  donate: number
  avatar: string,
  cover: string,
  comments: [],
  created_at: Date,
}

export type { IUser }