interface IListNews {
  _id: string,
  title: string,
  comments: number,
}

interface IArticle {
  _id: string,
  title: string,
  comments: number,
  type: string,
  shortDesc: string,
  text: string,
  image: string[],
  likes: number,
  сhat: any[],
  created_at: Date,
}

export type { IListNews, IArticle }