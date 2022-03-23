interface IUser {
  id: string,
  name: string,
  subs: number,
  listening: number
  avatar: string,
  cover: string,
  created_at: Date,
}

export type { IUser }