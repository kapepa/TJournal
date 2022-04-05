interface IUser {
  id: string,
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
